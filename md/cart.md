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
    "product_list":[{id:1, number: 3}, {id:2, number: 4}, {id:3, number: 2}],
}
```

response:
```json
{
    "id": 1,
    "name": "description",
    "product_list":[{id:1, number: 3}, {id:2, number: 4}, {id:3, number: 2}],
}
```

GET api/carts 

```json
{
    "data":[
       {
          "id": 1,
          "name": "description",
          "product_list":[{id:1, number: 3}, {id:2, number: 4}, {id:3, number: 2}],
       },
              {
          "id": 2,
          "name": "description1",
          "product_list":[{id:1, number: 3}, {id:2, number: 4}, {id:3, number: 2}],
       },
    ]
}
```



