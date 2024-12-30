/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3104325731")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4044198014",
    "hidden": false,
    "id": "relation492761711",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "movie",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3104325731")

  // remove field
  collection.fields.removeById("relation492761711")

  return app.save(collection)
})
