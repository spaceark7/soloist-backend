# Product Management API

## Create Product API

Endpoint : `/api/v1/products`
Request Method : `POST`
Headers :

- Authorization: Bearer Token

Request Body:

```json
{
  "name": "Ayam Geprek",
  "description": "Ayam geprek spesial", // optional
  "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  "product_cost_detail": {
    "cost_threshold": 10, // in percent
    "materials": [
      {
        "id": "1",
        "quantity": 5,
        "cost": 5000
      },
      {
        "id": "2",
        "quantity": 5,
        "cost": 2000
      }
    ],
    "average_cost": 3500,
    "profit": 9000,
    "sell_price": 12500,
    "status": "safe" // safe, warning, danger
  }
}
```

Response Body Success

```json
{
  "data": {
    "id": "1",
    "name": "Ayam Geprek",
    "description": "Ayam Geprek Spesial", // optional
    "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "product_cost_detail": {
      "id": "1",
      "cost_threshold": 10, // in percent
      "materials": [
        {
          "id": "1",
          "id": "Ayam Potong",
          "quantity": 5,
          "cost": 5000
        },
        {
          "id": "2",
          "id": "Bawang Merah",
          "quantity": 5,
          "cost": 2000
        }
      ],
      "average_cost": 3500,
      "profit": 9000,
      "sell_price": 12500,
      "status": "safe"
    }
    "created_at": "string",
    "updated_at": "string"
  }
}
```

Response Body Error

```json
{
  "error": {
    "status": false,
    "code": 422,
    "message": "Nama produk tidak boleh sama"
  }
}
```

## Get All Product API

Endpoint : `/api/v1/products`
Request Method : `GET`
Headers :

- Authorization : Bearer Token

Response Body Success

```json
{
  "data": [
    {
      "id": "1",
      "name": "Ayam Geprek",
      "description": "Ayam Geprek Spesial", // optional
      "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      "product_cost_detail": {
        "sell_price": 12500
      },
      {
        "id": "2",
        "name": "Ayam Penyet",
        "description": "Ayam Geprek Spesial", // optional
        "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "product_cost_detail": {
          "sell_price": 12500
        }
      }
    }
  ]
}
```

## Get Product Detail API

Endpoint : `/api/v1/products/{id}`
Request Method : `GET`
Headers :

- Authorization : Bearer Token

Response Body Success

```json
{
  "data": {
    "id": "1",
    "name": "Ayam Geprek",
    "description": "Ayam Geprek Spesial", // optional
    "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "product_cost_detail": {
      "id": "1",
      "cost_threshold": 10, // in percent
      "materials": [
        {
          "id": "1",
          "id": "Ayam Potong",
          "quantity": 5,
          "cost": 5000
        },
        {
          "id": "2",
          "id": "Bawang Merah",
          "quantity": 5,
          "cost": 2000
        }
      ],
      "average_cost": 3500,
      "profit": 9000,
      "sell_price": 12500,
      "status": "safe"
    }
    "created_at": "string",
    "updated_at": "string"
  }
}
```

Response Body Error

```json
{
  "error": {
    "status": false,
    "code": 404,
    "message": "Product tidak ditemukan"
  }
}
```

## Update Product API

Endpoint : `/api/v1/products/{id}`
Request Method : `PUT`
Headers :

- Authorization : Bearer Token

Request Body:

```json
{
  "name": "Ayam Geprek",
  "description": "Ayam geprek spesial", // optional
  "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  "product_cost_detail": {
    "cost_threshold": 10, // in percent
    "materials": [
      {
        "id": "1",
        "quantity": 5,
        "cost": 5000
      },
      {
        "id": "2",
        "quantity": 5,
        "cost": 2000
      }
    ],
    "average_cost": 3500,
    "profit": 9000,
    "sell_price": 12500,
    "status": "safe" // safe, warning, danger
  }
}
```

Response Body Success

```json
{
  "data": {
    "id": "1",
    "name": "Ayam Geprek",
    "description": "Ayam Geprek Spesial", // optional
    "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "product_cost_detail": {
      "id": "1",
      "cost_threshold": 10, // in percent
      "materials": [
        {
          "id": "1",
          "id": "Ayam Potong",
          "quantity": 5,
          "cost": 5000
        },
        {
          "id": "2",
          "id": "Bawang Merah",
          "quantity": 5,
          "cost": 2000
        }
      ],
      "average_cost": 3500,
      "profit": 9000,
      "sell_price": 12500,
      "status": "safe"
    }
    "created_at": "string",
    "updated_at": "string"
  }
}
```

Response Body Error Not found

```json
{
  "error": {
    "status": false,
    "code": 404,
    "message": "Product not found"
  }
}
```

Response Body Error Information

<!-- Error Min length name -->

```json
{
  "error": {
    "status": false,
    "code": 422,
    "message": "The name must be at least 3 characters."
  }
}
```

Response Body Error Cost Detail

<!-- Error Product Cost detail must not empty -->

```json
{
  "error": {
    "status": false,
    "code": 422,
    "message": "The product cost detail must not empty."
  }
}
```

## Delete Product API

Endpoint : `/api/v1/products/{id}`
Request Method : `DELETE`
Headers :

- Authorization : Bearer Token

> Note : This is soft delete. If product has been deleted, product cost detail will be deleted too

Response Body Success

```json
{
  "data": {
    "message": "Product Ayam Geprek has been deleted"
  }
}
```

Response Body Error Not found

```json
{
  "error": {
    "status": false,
    "code": 404,
    "message": "Product not found"
  }
}
```
