# Product

## Product
Field|Type|Description
---|---|---
id| INTEGER| PK
name| TEXT| name
price| NUMBER | price
img_name| TEXT| 
description|TEXT |description

## Getting List of WAs
### POST

POST api/products 
Create product 

body:
```json
{
    "name":"asd", 
    "price":111, 
    "img_name":"img", 
    "description":"desc"
}
```
response:
```json
{"data":
    [
        {
            "id":1,
            "name":"asd", 
            "price":111, 
            "img_name":"img", 
            "description":"desc"
        }
    ]
}
```

GET api/products 

```json
{"data":
    [
        {
            "id":1,
            "name":"asd", 
            "price":111, 
            "img_name":"img", 
            "description":"desc"
        },
        {
            "id":2,
            "name":"asd", 
            "price":111, 
            "img_name":"img", 
            "description":"desc"
        }
    ]
}
```

GET api/products/1

```json
{"data":
    [
        {
            "id":1,
            "name":"asd", 
            "price":111, 
            "img_name":"img", 
            "description":"desc"
        }
    ]
}
```

UPDATE api/products/1

body:
```json
{
    "name":"asd", 
    "price":111, 
    "img_name":"img", 
    "description":"desc"
}
```

response:
```json
{"data":
    [
        {
            "id":1,
            "name":"asd", 
            "price":111, 
            "img_name":"img", 
            "description":"desc"
        }
    ]
}
```


DELETE api/products/1
Remove product by id
returns 200 on successful remove










