# Cart

## Cart
Field|Description
---|---
id| DB internal PK
name|  Text name

## Getting List of WAs
### POST

POST api/carts 
Create cart 
body: 
```json
{
    "name":"qw",
    "product_list":[1, 2, 3]
}
```

response:
```json
{
    "id": 1,
    "name": "description",
    "product_list": [{
        "id":1,
        "name":"asd", 
        "price":111, 
        "img_name":"img", 
        "description":"descA"
    }, {
        "id":2,
        "name":"asdasd", 
        "price":222, 
        "img_name":"img", 
        "description":"descB"
    }]
}
```

GET api/carts 

```json
{
    "data":[
       {
          "name": "description",
          "product_list": [{
              "id":1,
              "name":"asd", 
              "price":111, 
              "img_name":"img", 
              "description":"desc"
          },{
              "id":1,
              "name":"asd", 
              "price":222, 
              "img_name":"img", 
              "description":"desc"
          }]
       }
    ]
}
```



