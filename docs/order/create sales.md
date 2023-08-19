# Sales Management API

## Create Order API

Endpoint : `/api/v1/orders`
Request Method : `POST`
Headers :

- Authorization: Bearer Token

Request body :

```json
{
  "customer_id": "1",
  "order_items": [
    {
      "product_id": "1",
      "quantity": 5,
      "price_per_unit": 10000,
    },
    {
      "product_id": "2",
      "quantity": 5,
      "price_per_unit": 5000,
    }
  ],
  "materials": [
    {
      "id": "1",
      "quantity": 5
    },
    {
      "id": "2",
      "quantity": 5
    }
  ],
  "purchase_orders": [
    {
      "id": "1",
      "purchase_item": [
        {
          "id": "1",
          "quantity": 5,
          "price_per_unit": 10000,
          "total_amount": 50000
        },
        {
          "id": "2",
          "quantity": 5,
          "price_per_unit": 5000,
          "total_amount": 25000
        }
      ]
      "purchase_total_amount": 75000
    }
  ],
  "manufacture_details" :  [
      {
        "title" : "manufacture 1",
        "quantity" : 5,
        "price_per_unit" : 10000,
        "total_amount" : 50000
      },
      {
        "title" : "manufacture 2",
        "quantity" : 5,
        "price_per_unit" : 5000,
        "total_amount" : 25000
      }
    ]
    ,
  "supplies" : [
      {
        "title" : "supplies 1",
        "quantity" : 5,
        "price_per_unit" : 10000,
        "total_amount" : 50000
      }
    ]
  "payment_method": "cash",
  "payment_status": "paid",
  "payment_details": {
    "cash": {
      "amount": 100000,
      "change": 50000
    },
    "bank_transfer": {
      "amount": 100000,
      "bank_name": "BCA",
      "account_number": "1234567890",
      "account_name": "John Doe"
    }
  },
}
```

Response Body Success

```json
  {
    "id": "1",
    "customer_id": "1",
    "order_items": [
      {
        "product_id": "1",
        "quantity": 5,
        "price_per_unit": 10000,
      },
      {
        "product_id": "2",
        "quantity": 5,
        "price_per_unit": 5000,
      }
    ],
    "materials": [
      {
        "id": "1",
        "quantity": 5
      },
      {
        "id": "2",
        "quantity": 5
      }
    ],
    "purchase_orders": [
      {
        "id": "1",
        "purchase_item": [
          {
            "id": "1",
            "quantity": 5,
            "price_per_unit": 10000,
            "total_amount": 50000
          },
          {
            "id": "2",
            "quantity": 5,
            "price_per_unit": 5000,
            "total_amount": 25000
          }
        ]
        "purchase_total_amount": 75000
      }
    ],
    "manufacture_details" :  [
        {
          "title" : "manufacture 1",
          "quantity" : 5,
          "price_per_unit" : 10000,
          "total_amount" : 50000
        },
        {
          "title" : "manufacture 2",
          "quantity" : 5,
          "price_per_unit" : 5000,
          "total_amount" : 25000
        }
      ]
      ,
    "supplies" : [
        {
          "title" : "supplies 1",
          "quantity" : 5,
          "price_per_unit" : 10000,
          "total_amount" : 50000
        }
      ],
    "payment_method": "cash",
    "payment_status": "paid",
    "payment_details": {
      "cash": {
        "amount": 100000,
        "change": 50000
      },
      "bank_transfer": {
        "amount": 100000,
        "bank_name": "BCA",
        "account_number": "1234567890",
        "account_name": "John Doe"
      }
    },

    "summary": {
      "total_amount": 100000,
      "total_discount": 0,
      "total_tax": 0,
      "total_payment": 100000,
      "total_change": 50000,
      "status": "sell price is safe",
      "profit": 50000,
      "items": [
        {
          "product_id": "1",
          "quantity": 5,
          "price_per_unit": 10000,
          "total_amount": 50000
        },
        {
          "product_id": "2",
          "quantity": 5,
          "price_per_unit": 5000,
          "total_amount": 25000
        }
      ],
    },
  }
```

Response Body Error

```json
{
  "message": "error message",
  "errors": [
    {
      "field": "field name",
      "message": "error message"
    }
  ]
}
```

## Get Order API

Endpoint : `/api/v1/orders/{id}`
Request Method : `GET`
Headers :

- Authorization: Bearer Token

Response Body Success

```json
  {
      "id": "1",
      "customer_id": "1",
      "order_items": [
        {
          "product_id": "1",
          "quantity": 5,
          "price_per_unit": 10000,
        },
        {
          "product_id": "2",
          "quantity": 5,
          "price_per_unit": 5000,
        }
      ],
      "materials": [
        {
          "id": "1",
          "quantity": 5
        },
        {
          "id": "2",
          "quantity": 5
        }
      ],
      "purchase_orders": [
        {
          "id": "1",
          "purchase_item": [
            {
              "id": "1",
              "quantity": 5,
              "price_per_unit": 10000,
              "total_amount": 50000
            },
            {
              "id": "2",
              "quantity": 5,
              "price_per_unit": 5000,
              "total_amount": 25000
            }
          ]
          "purchase_total_amount": 75000
        }
      ],
      "manufacture_details" :  [
          {
            "title" : "manufacture 1",
            "quantity" : 5,
            "price_per_unit" : 10000,
            "total_amount" : 50000
          },
          {
            "title" : "manufacture 2",
            "quantity" : 5,
            "price_per_unit" : 5000,
            "total_amount" : 25000
          }
        ]
        ,
      "supplies" : [
          {
            "title" : "supplies 1",
            "quantity" : 5,
            "price_per_unit" : 10000,
            "total_amount" : 50000
          }
        ],
      "payment_method": "cash",
      "payment_status": "paid",
      "payment_details": {
        "cash": {
          "amount": 100000,
          "change": 50000
        },
        "bank_transfer": {
          "amount": 100000,
          "bank_name": "BCA",
          "account_number": "1234567890",
          "account_name": "John Doe"
        }
      },

      "summary": {
        "total_amount": 100000,
        "total_discount": 0,
        "total_tax": 0,
        "total_payment": 100000,
        "total_change": 50000,
        "status": "sell price is safe",
        "profit": 50000,
        "items": [
          {
            "product_id": "1",
            "quantity": 5,
            "price_per_unit": 10000,
            "total_amount": 50000
          },
          {
            "product_id": "2",
            "quantity": 5,
            "price_per_unit": 5000,
            "total_amount": 25000
          }
        ],
      },
    }
```

## Update Order API

Endpoint : `/api/v1/orders/{id}`
Request Method : `PUT`
Headers :

- Authorization: Bearer Token

Request Body

```json
  {
    "customer_id": "1",
    "order_items": [
      {
        "product_id": "1",
        "quantity": 5,
        "price_per_unit": 10000,
      },
      {
        "product_id": "2",
        "quantity": 5,
        "price_per_unit": 5000,
      }
    ],
    "materials": [
      {
        "id": "1",
        "quantity": 5
      },
      {
        "id": "2",
        "quantity": 5
      }
    ],
    "purchase_orders": [
      {
        "id": "1",
        "purchase_item": [
          {
            "id": "1",
            "quantity": 5,
            "price_per_unit": 10000,
            "total_amount": 50000
          },
          {
            "id": "2",
            "quantity": 5,
            "price_per_unit": 5000,
            "total_amount": 25000
          }
        ]
        "purchase_total_amount": 75000
      }
    ],
    "manufacture_details" :  [
        {
          "title" : "manufacture 1",
          "quantity" : 5,
          "price_per_unit" : 10000,
          "total_amount" : 50000
        },
        {
          "title" : "manufacture 2",
          "quantity" : 5,
          "price_per_unit" : 5000,
          "total_amount" : 25000
        }
      ]
      ,
    "supplies" : [
        {
          "title" : "supplies 1",
          "quantity" : 5,
          "price_per_unit" : 10000,
          "total_amount" : 50000
        }
      ],
    "payment_method": "cash",
    "payment_status": "paid",
    "payment_details": {
      "cash": {
        "amount": 100000,
        "change": 50000
      },
      "bank_transfer": {
        "amount": 100000,
        "bank_name": "BCA",
        "account_number": "1234567890",
        "account_name": "John Doe"
      }
    },

    "summary" : {
      "total_amount": 100000,
      "total_discount": 0,
      "total_tax": 0,
      "total_payment": 100000,
      "total_change": 50000,
      "status": "sell price is safe",
      "profit": 50000,
      "items": [
        {
          "product_id": "1",
          "quantity": 5,
          "price_per_unit": 10000,
          "total_amount": 50000
        },
        {
          "product_id": "2",
          "quantity": 5,
          "price_per_unit": 5000,
          "total_amount": 25000
        }
      ],
    },
  }

```

## Delete Order API

Endpoint : `/api/v1/orders/{id}`
Request Method : `DELETE`
Headers :

- Authorization: Bearer Token

Response Body Success

```json
{
  "message": "Order deleted successfully"
}
```

## Get All Order API

Endpoint : `/api/v1/orders`
Request Method : `GET`
Headers :

- Authorization: Bearer Token

<!-- Pagination data -->

Response Body Success

```json
  {
    "data": [
      {
        "id": "1",
        "customer_id": "1",
        "order_items": [
          {
            "product_id": "1",
            "quantity": 5,
            "price_per_unit": 10000,
          },
          {
            "product_id": "2",
            "quantity": 5,
            "price_per_unit": 5000,
          }
        ],
        "materials": [
          {
            "id": "1",
            "quantity": 5
          },
          {
            "id": "2",
            "quantity": 5
          }
        ],
        "purchase_orders": [
          {
            "id": "1",
            "purchase_item": [
              {
                "id": "1",
                "quantity": 5,
                "price_per_unit": 10000,
                "total_amount": 50000
              },
              {
                "id": "2",
                "quantity": 5,
                "price_per_unit": 5000,
                "total_amount": 25000
              }
            ]
            "purchase_total_amount": 75000
          }
        ],
        "manufacture_details" :  [
            {
              "title" : "manufacture 1",
              "quantity" : 5,
              "price_per_unit" : 10000,
              "total_amount" : 50000
            },
            {
              "title" : "manufacture 2",
              "quantity" : 5,
              "price_per_unit" : 5000,
              "total_amount" : 25000
            }
          ]
          ,
        "supplies" : [
            {
              "title" : "supplies 1",
              "quantity" : 5,
              "price_per_unit" : 10000,
              "total_amount" : 50000
            }
          ],
        "payment_method": "cash",
        "payment_status": "paid",
        "payment_details": {
          "cash": {
            "amount": 100000,
            "change": 50000
          },
          "bank_transfer": {
            "amount": 100000,
            "bank_name": "BCA",
            "account_number": "1234567890",
            "account_name": "John Doe"
          }
        },

        "summary": {
          "total_amount": 100000,
          "total_discount": 0,
          "total_tax": 0,
          "total_payment": 100000,
          "total_change": 50000,
          "status": "sell price is safe",
          "profit": 50000,
          "items": [
            {
              "product_id": "1",
              "quantity": 5,
              "price_per_unit": 10000,
              "total_amount": 50000
            },
            {
              "product_id": "2",
              "quantity": 5,
              "price_per_unit": 5000,
              "total_amount": 25000
            }
          ],
        },
      }
    ]


  }

```
