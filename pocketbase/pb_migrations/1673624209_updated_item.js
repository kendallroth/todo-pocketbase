migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hud3lg3o2i2v6jn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mxwb4ket",
    "name": "complete",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hud3lg3o2i2v6jn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mxwb4ket",
    "name": "complete",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
