# Authentication API

## Login API

Endpoint: `/api/v1/login`
Request Method: `POST`

Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response Body Success

```json
{
  "data": {
    "token": "Session-token"
  }
}
```

Response Body Error

```json
{
  "error": {
    "message": "Email atau Password tidak valid"
  }
}
```

## Register API

Endpoint: `/api/v1/register`
Request Method: `POST`
Request Body:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "password": "string"
}
```

Response Body Success

```json
{
  "data": {
    "message": "Daftar berhasil"
  }
}
```

Response Body Error

```json
{
  "error": {
    "message": "Email atau Password tidak valid"
  }
}
```

## Verify Registered account API

Endpoint: `/api/v1/verify`
Request Method: `POST`
Request Body:

```json
{
  "email": "string",
  "code": "string"
}
```

Response Body Success

```json
{
  "data": {
    "message": "Akun berhasil diverifikasi"
  }
}
```

Response Body Error

```json
{
  "error": {
    "message": "Kode tidak valid"
  }
}
```

## Forgot Password API

Endpoint: `/api/v1/forgot-password`
Request Method: `POST`
Request Body:

```json
{
  "email": "string"
}
```

Response Body Success

```json
{
  "data": {
    "message": "Kode berhasil dikirim ke email"
  }
}
```

Response Body Error

```json
{
  "error": {
    "message": "Email tidak terdaftar"
  }
}
```

## Verify Credential API

Endpoint: `/api/v1/verify-credential`
Request Method: `POST`
Request Body:

```json
{
  "email": "string",
  "code": "string"
}
```

Response Body Success

```json
{
  "data": {
    "message": "Kode berhasil dikirim ke email"
  }
}
```

Response Body Error

```json
{
  "error": {
    "message": "Kode tidak valid"
  }
}
```

## Recover Password API

Endpoint: `/api/v1/recover-password`
Request Method: `POST`
Request Body:

```json
{
  "new_password": "string",
  "confirm_new_password": "string"
}
```

Response Body Success

```json
{
  "data": {
    "message": "Password berhasil diubah"
  }
}
```

Response Body Error not equals

```json
{
  "error": {
    "message": "Password tidak sama"
  }
}
```

Response Body Error min charachter

```json
{
  "error": {
    "message": "Minimal 8 karakter"
  }
}
```

## Get Product API

##

## Get Dashboard API

## Get Sales API

## Get Sales Detail API
