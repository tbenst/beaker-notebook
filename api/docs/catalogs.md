# Bunsen API - Catalogs

## Catalogs list

###### URL

`/marketplace/v1/catalogs`

###### Method

`GET`

###### Success Response

Code: 200

Content:
```
[{
  public-id: 558059f5-3ec9-4f4f-a8d6-a4ad0e3934c5,
  mappings: {
    description: {
      type: "string",
      indexes: ["text"]
    },
    ...
  },
  name: "Misc"
}, {
  public-id: 5580599a-b668-4d52-953b-8016c00c946a,
  mappings: {
    description: {
      type: "string",
      indexes: ["text"]
    },
    ...
  },
  name: "Quandl",
}]
```
