# User Account Security API

## Change Password API

Endpoint: `/api/v1/users/current/password`
Request Method: `PATCH`
Headers :

- Authorization: Bearer Token

Request Body:

```json
{
  "old_password": "string",
  "new_password": "string",
  "new_password_confirmation": "string"
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

Response Body Error

```json
{
  "error": {
    "message": "Password lama tidak sesuai"
  }
}
```

## Change Email API

Endpoint: `/api/v1/users/current/email`
Request Method: `PATCH`
Headers :

- Authorization: Bearer Token

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
    "message": "Email berhasil diubah"
  }
}
```

Response Body Error Password incorrect

```json
{
  "error": {
    "message": "Password lama tidak sesuai"
  }
}
```

Response Body Error Email already taken

```json
{
  "error": {
    "message": "Email sudah digunakan"
  }
}
```

## Delete Account API

Endpoint: `/api/v1/users/current`
Request Method: `DELETE`
Headers :

- Authorization: Bearer Token

> Note : This is soft delete. If user has been deleted, user account security will be deleted too

Response Body Success

```json
{
  "data": {
    "message": "Akun berhasil dihapus"
  }
}
```
