/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4044198014")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number2727588601",
    "max": null,
    "min": null,
    "name": "collection",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4044198014")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number2727588601",
    "max": null,
    "min": null,
    "name": "gross",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
