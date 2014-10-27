Two Sigma will provide an API for pulling in all meta data for the data sets that will be available within Bunsen.

TS will handle all permissions on their side, it is assumed that whatever is returned should be displayed to all users within Bunsen.

The API spec is the following:

/api/v1/metadata?since=DATE&page=1

=>

{“date”: NOW
 “page”: 1
 “more”: true
 “payload”: [
{“actual”:”metadata"}
]}

The “since” query param could be a date, or some transaction ID, it’s just a way to make sure we can efficiently pull down updates. If it were an opaque transaction ID, the server would need to include it in the response as well. Depending on the variance of the actual metadata fields, we might also need a ‘schema’ endpoint (or to embed the schema in the metadata response). 

The meta-data returned will be the following:


String storage; // where the file is at two sigma using our internal URI naming scheme
String locator; // not sure
String vendor; // name of the vendor [denormalized]
String product; // name of the product from the vendor
boolean active; // largely unused in code today because it’s not handled correctly in
Long activeAgo; // time when most recent data arrived for this dataset
Long lastUpdateTime; // with respect to metadata
Long firstUpdateTime; // aka creation time – probably better to just change the name in JSON to “createTime”
Integer id; // internal (surrogate) ID
String description; // unlimited-length text description…in practice we will probably try to keep this under 1k
String businessOwner; // userid of two sigma employee who is the “business owner”
Integer categoryId; // internal category ID, so we need to expose the categoryTree as well (which I have done)
boolean public; // true if this dataset is “public” inside of Two Sigma
