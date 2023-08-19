# User & Business Profile API

## Get User API

Endpoint: `/api/v1/users/current`
Request Method: `GET`
Headers :

- Authorization: Bearer Token

Response Body Success

```json
{
  "data": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "avatar": "string",
    "address": {
      "country": "string",
      "province": "string",
      "city": "string",
      "street": "string",
      "postalCode": "string"
    }
  }
}
```

## Update User Profile API

Endpoint: `/api/v1/users/current`
Request Method: `PATCH`
Headers :

- Authorization: Bearer Token

Request Body:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "avatar": "string"
}
```

Response Body Success

```json
{
  "data": {
    "name": "string",
    "phone": "string",
    "address": "string",
    "avatar": "string"
  }
}
```

Response Body Error

```json
{
  "error": {
    "message": "Field tidak boleh kosong"
  }
}
```

## Get User Business Profile API

Endpoint: `/api/v1/businesses/current`
Request Method: `GET`
Headers :

- Authorization: Bearer Token

Response Body Success

```json
{
  "data": {
    "business_name": "string",
    "business_phone": "string",
    "business_description": "string", // optional
    "business_logo": "string", // optional
    "business_address": {
      "address": "string",
      "country": "string",
      "province": "string",
      "city": "string",
      "district": "string", // optional
      "village": "string", // optional
      "postal_code": "string", // optional
      "latitude": "string", // optional
      "longitude": "string" // optional
    }
  }
}
```

## Update User Business Profile API

Endpoint: `/api/v1/businesses/current`
Request Method: `PATCH`
Headers :

- Authorization: Bearer Token

Request Body:

```json
{
  "business_name": "string",
  "business_phone": "string",
  "business_description": "string", // optional
  "business_logo": "string", // optional
  "business_address": {
    "address": "string",
    "province": "string",
    "city": "string",
    "district": "string", // optional
    "village": "string", // optional
    "postal_code": "string", // optional
    "latitude": "string", // optional
    "longitude": "string" // optional
  }
}
```

Response Body Success

```json
{
  "data": {
    "business_name": "string",
    "business_phone": "string",
    "business_description": "string", // optional
    "business_logo": "string", // optional
    "business_address": {
      "address": "string",
      "province": "string",
      "city": "string",
      "district": "string", // optional
      "village": "string", // optional
      "postal_code": "string", // optional
      "latitude": "string", // optional
      "longitude": "string" // optional
    }
  }
}
```

Response Body Error

```json
{
  "error": {
    "message": "Field tidak boleh kosong"
  }
}
```
