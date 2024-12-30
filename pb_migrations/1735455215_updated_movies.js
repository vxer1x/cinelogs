/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4044198014")

  // remove field
  collection.fields.removeById("number3006801325")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "date2720293344",
    "max": "",
    "min": "",
    "name": "releasedate",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4044198014")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3006801325",
    "max": null,
    "min": null,
    "name": "releaseyear",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("date2720293344")

  return app.save(collection)
})
