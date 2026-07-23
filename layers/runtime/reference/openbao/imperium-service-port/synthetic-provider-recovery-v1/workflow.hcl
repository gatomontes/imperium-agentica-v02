input {
  field "string" "wrapping_token" {
    required = true
  }

  field "string" "correlation_id" {
    required = true
  }
}

flow "credential_acquire" {
  request "lookup" {
    operation = "update"
    path      = "sys/wrapping/lookup"
    token = {
      eval_source = "input"
      eval_type   = "string"
      field_name  = "wrapping_token"
    }
    data = {}
  }

  request "unwrap" {
    operation = "update"
    path      = "sys/wrapping/unwrap"
    token = {
      eval_source = "input"
      eval_type   = "string"
      field_name  = "wrapping_token"
    }
    when = {
      eval_source = "cel"
      eval_type   = "bool"
      expression  = "responses.credential_acquire.lookup.data.creation_path == 'auth/approle/role/imperium-service-port-synthetic/secret-id'"
    }
    data = {}
  }

  request "login" {
    operation = "update"
    path      = "auth/approle/login"
    token     = ""
    data = {
      role_id = "IMPERIUM_SYNTHETIC_ROLE_ID"
      secret_id = {
        eval_source    = "response"
        eval_type      = "string"
        flow_name      = "credential_acquire"
        response_name  = "unwrap"
        field_selector = ["data", "secret_id"]
      }
    }
  }

  request "read" {
    operation = "read"
    path      = "imperium-synthetic/data/runtime/provider/recovery"
    data = {
      version = 7
    }
    token = {
      eval_source    = "response"
      eval_type      = "string"
      flow_name      = "credential_acquire"
      response_name  = "login"
      field_selector = ["auth", "client_token"]
    }
  }

  request "revoke" {
    operation = "update"
    path      = "auth/token/revoke-self"
    token = {
      eval_source    = "response"
      eval_type      = "string"
      flow_name      = "credential_acquire"
      response_name  = "login"
      field_selector = ["auth", "client_token"]
    }
    data = {}
  }
}

output {
  data = {
    operation_id = "synthetic-provider-recovery-v1"
    correlation_id = {
      eval_source = "input"
      eval_type   = "string"
      field_name  = "correlation_id"
    }
    version = {
      eval_source    = "response"
      eval_type      = "int"
      flow_name      = "credential_acquire"
      response_name  = "read"
      field_selector = ["data", "metadata", "version"]
    }
    material = {
      eval_source    = "response"
      eval_type      = "string"
      flow_name      = "credential_acquire"
      response_name  = "read"
      field_selector = ["data", "data", "credential"]
    }
  }
}
