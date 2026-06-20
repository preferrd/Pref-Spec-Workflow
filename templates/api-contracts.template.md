# API Contracts — {{Feature name}}

## Conventions
- **Base URL / auth:** {{e.g. session cookie, Bearer token}}
- **Error format:** `{ "error": { "code": string, "message": string } }`
- **Content type:** `application/json`

## Endpoints
<!-- Repeat this block per endpoint or server action. -->

### {{METHOD}} {{/path}}
- **Purpose:** …
- **Auth:** public | authenticated | admin
- **Request**
  ```json
  { }
  ```
- **Response 200**
  ```json
  { }
  ```
- **Status codes:** 200 … · 400 invalid input · 401 unauth · 403 forbidden · 404 not found · 429 rate-limited · 500 server error
- **Errors:** {{specific error codes and when they occur}}
- **Notes:** {{validation rules, rate limits, idempotency}}
