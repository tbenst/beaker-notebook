# Beaker Publications API

This API requires that a user is first authenticated for http://beaker-staging.withmojo.com

## Publish a notebook

###### URL

`/notebook/v1/publications`

###### Method

`POST`

###### Data Params

```
{
    "name": [string (required, name of the publication)],
    "categoryID": [UUID (required, public-id of the category to which this belongs)],
    "description": [string (optional, publication description)],
    "contents": [JSON (required, notebook *.bkr file contents)]
}
```

###### Success Response

Code: 201

Content:
```
{
    "author-id": "5575ee0b-b18c-474d-a86f-fd068eae508b",
    "name": "Notebook 1",
    "public-id": "55832555-00f6-49e5-b481-00cbc16e203a",
    "updated-at": "2015-06-18T20:08:53.810Z",
    "description": "test",
    "created-at": "2015-06-18T20:08:53.810Z",
    "contents": "{\n    \"beaker\": \"2\",\n ... \n}\n",
    "languages": ["IPython","Node","JavaScript"]
}
```

###### Error Response

Code: 422

Content:
```
{
    "contents": [
        "contents must be present"
    ],
    "name": [
        "name must be present"
    ],
    "categoryID": [
        "categoryID must be present"
    ]
}
```

## Update a notebook

###### URL

`/notebook/v1/publications/:public-id`

###### Path Params

`public-id` (string, public-id of the publication to update)

###### Method

`PUT`

###### Data Params (JSON)

```
{
    "name": [string (required, name of the publication)],
    "categoryID": [UUID (required, public-id of the category to which this belongs)],
    "description": [string (optional, publication description)],
    "contents": [JSON (required, notebook *.bkr file contents)]
}
```

###### Success Response

Code: 201

Content:

```
{
    "name": "Notebook 1",
    "updated-at": "2015-06-18T20:08:53.810Z",
    "description": "test",
    "contents": "{\n    \"beaker\": \"2\",\n ... \n}\n",
    "languages": ["IPython","Node","JavaScript"]
}
```

###### Error Response

Code: 422

Content:
```
{
    "contents": [
        "contents must be present"
    ],
    "name": [
        "name must be present"
    ],
    "categoryID": [
        "categoryID must be present"
    ]
}
```
