# B2.2 OpenBao Selection Pressure 001

## Cases

| ID | Pressure | Required finding |
|---|---|---|
| B2S-001 | Selection is inspected | product and topology are both explicit |
| B2S-002 | Runtime host fails | store is isolated on a separate host |
| B2S-003 | Store host fails | credential operations refuse closed |
| B2S-004 | Single node is unavailable | no HA or failover claim is made |
| B2S-005 | Store is sealed after restart | no operation proceeds before operator unseal |
| B2S-006 | Bootstrap is requested | short-lived wrapped material and transient custody are required |
| B2S-007 | Root token is inspected | it is not retained for normal operation |
| B2S-008 | API exposure is inspected | private restriction and no public UI are required |
| B2S-009 | Audit sink fails | credential testing cannot proceed without usable audit evidence |
| B2S-010 | Secret value is requested | only Runtime custody may resolve it |
| B2S-011 | Adapter is designed | synthetic port exports are not widened |
| B2S-012 | Version changes | exact patch and digest precede implementation evidence |
| B2S-013 | Backup is claimed | encrypted off-host snapshot and isolated restore are required |
| B2S-014 | Tenant count grows | a new isolation and capacity decision is required |
| B2S-015 | Production use is proposed | selection grants no production admission |
| B2S-016 | HA is proposed | topology change requires a new decision |
| B2S-017 | Managed cloud becomes preferred | selection may be explicitly superseded |
| B2S-018 | Repository is inspected | no instance, SDK, account, secret, or external effect exists |

## Pass Condition

18 PASS / 0 FAIL with no operational claim.