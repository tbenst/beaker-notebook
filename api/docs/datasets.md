# Bunsen API - Datasets

## Datasets list

###### URL

`/marketplace/v1/catalogs/:catalog/datasets?category-id=:category-public-id&from=:start-from&limit=:limit`

###### Method

`GET`

###### Success Response

Code: 200

Content:
```
{
  total-items: 4798,
  filters: {
    format: ["csv"],
    vendor: [{
      id: "556f3d84-5603-4d69-bfb6-47a44a2de218",
      name: "World Bank"
    }],
    tags: [
      "Demography",
      "Biths and Deaths",
      ...
    ]
  },
  data: [{
    average: null,
    categories: [{
      public-id: "55842d56-f473-48e7-b324-519a19bdc7e6",
      name: "Adults Living with HIV",
      parent-id: "55842d80-e861-40f4-be6a-ea4a39741924"
    }],
    categoryIds: ["55842d56-f473-48e7-b324-519a19bdc7e6"],
    csvPreview: "foo",
    description: "Bar",
    format: "CSV",
    id: 3552,
    catalog: "catalog_0.2",
    numColumns: 2,
    path: "0.2.4.4.1",
    remoteFile: "afghanistan_adults_ages_15_living_with_hiv.csv",
    rows: 23,
    tags: ["Health and Disease", "Demography"],
    title: "Afghanistan: Adults (ages 15+) living with HIV",
    updateFrequency: "annual",
    vendor: {
      id: "556f3d84-5603-4d69-bfb6-47a44a2de218",
      name: "World Bank"
    }
  }]
}
```

