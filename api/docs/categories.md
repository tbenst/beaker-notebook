# Bunsen API - Categories

## Categories list

###### URL

`/marketplace/v1/categories`

`/marketplace/v1/categories?size=:size&limit=:limit&root=:root`

###### Method

`GET`

###### URL Params

Required:

`size=[integer]` (Depth of nesting, ex: `3` would return 3 levels, including the root node)

Optional:

`limit=[integer]` (Maximum number of results to return)

`root=[string]` (root node public-id to start fetching categories)

###### Success Response

Code: 200

Content:
```
[{
  count: 13,
  public-id: 5580599a-b668-4d52-953b-8016c00c946a,
  catalog-id: 558059f5-3ec9-4f4f-a8d6-a4ad0e3934c5,
  name: "Misc"
}, {
  count: 4,
  public-id: 558306f9-2c96-4a97-9bea-46a598be37ff,
  catalog-id: 558059f5-3ec9-4f4f-a8d6-a4ad0e3934c5,
  name: "Energy",
  description: "foo",
  contact-email: "quentin@twosigma.com",
  contact-name: "Quentin",
  parent-id: 5580599a-b668-4d52-953b-8016c00c946a
}]
```

## Add a Category

###### URL

`/marketplace/v1/categories`

###### Method

`POST`

###### Data Params

```
{
  name: [string (required, name of the category)],
  parent-id: [string (required, public-id of the category to which this belongs)],
  description: [string (optional, description on datasets page belonging to category)],
  contact-name: [string (optional, category maintainer's name)],
  contact-email: [string (optional, category maintainer's contact email)]
}
```

###### Success Response

Code: 201

Content:
```
{ public-id: '5580599a-b668-4d52-953b-8016c00c946a' }
```

###### Error Response

Code: 400

Content:
```
{ error: "name and parent-id are required" }
```

## Edit a Category

###### URL

`marketplace/v1/categories/:public-id`

###### Path Params

`public-id` (string, public-id of the category to edit)

###### Method

`PUT`

###### Data Params (JSON)

```
{
  name: [string (optional, name of the category)],
  parent-id: [string (optional, public-id of the category to which this belongs)],
  description: [string (optional, description on datasets page belonging to category)],
  contact-name: [string (optional, category maintainer's name)],
  contact-email: [string (optional, category maintainer's contact email)]
}
```

###### Success Response

Code: 201

Content: none

###### Error Response

Code: 404

Content:
```
{ error: "Category not found by that public-id" }
```

## Delete a Category

###### URL

`marketplace/v1/categories/:public-id`

###### Route Params

`public-id` (string, public-id of the category to delete)

###### Method

`DELETE`

###### Success Response

Code: 204

Content: none

###### Error Response

Code: 404

Content:
```
{ error: "Category not found by that public-id" }
```
