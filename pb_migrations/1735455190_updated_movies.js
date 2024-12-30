/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4044198014")

  // add field
  collection.fields.addAt(5, new Field({
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

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3355102248",
    "max": 0,
    "min": 0,
    "name": "agerating",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2203071480",
    "max": 0,
    "min": 0,
    "name": "genre",
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

  // remove field
  collection.fields.removeById("number3584429179")

  // remove field
  collection.fields.removeById("text3355102248")

  // remove field
  collection.fields.removeById("text2203071480")

  return app.save(collection)
})
