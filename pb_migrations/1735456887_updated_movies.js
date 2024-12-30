/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4044198014")

  // remove field
  collection.fields.removeById("number3584429179")

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3584429179",
    "max": 0,
    "min": 0,
    "name": "runtime",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4044198014")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3584429179",
    "max": null,
    "min": null,
    "name": "runtime",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text3584429179")

  return app.save(collection)
})
