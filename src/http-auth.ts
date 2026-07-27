export interface HttpAuthenticationContext {
  requestId: string;
  operatorInstanceId: string;
  authorization: string;
}

export interface HttpAuthorizer<Principal = unknown> {
  authorize(context: HttpAuthenticationContext): Principal;
}
