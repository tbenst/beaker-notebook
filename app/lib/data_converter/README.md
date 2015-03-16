# Elasticsearch Legacy Data Converter

The purpose of this library is to convert our old `js` & `json` files from the format wich was used when seeding with postgres _and_ elasticsearch.

## Usage

`$ npm start` -  runs with default configuration

`$ npm run clean` - deletes converted files


Utilizing the configuration hash, we populate an array for each file we want to convert. The array is then passed to the converter.

```javascript
{
  name: "Categories", // Name of conversion
  type: "categories", // Conversion type - lib/convert.js
  in: require('./data/datasets'), // Source file
}
```

## Conversion Types

`categories`

This conversion type is only for converting categories. It sets an id for the record and moves the data object up to the root level. Also removes all postgres related data. Finally injects the correct mapping metadata.

`datasets`

Everything `categories` does (sans category meta injection), plus copies the associations from `dataPreviews`, `category`, and `metadata` to the objects root level.

`citibike`

Similar to `default` except it _only_ copies the `category` association. It also deletes unnecessary array items that contained postgres model metadata.
