# Bunsen API - Datasets

## Datasets list

###### URL

`/marketplace/v1/catalogs/:catalog-public-id/datasets?category-id=:category-id&from=:from&limit=:limit`

###### Method

`GET`

###### Path Params

Required:

`:catalog-public-id` (string, public-id of the catalog)

###### URL Params

Required:

`category-id=[string]` (public-id of category for which to fetch datasets)

Optional:

`from=[integer]` (for pagination, which number to start from)

`limit=[integer]` (number of datasets to return)

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
    catalogId: "5584554a-22f1-47ab-b21c-d75d88e8ba14",
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
