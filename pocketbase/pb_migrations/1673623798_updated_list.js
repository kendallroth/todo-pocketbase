migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("esv5ck9klo0j38l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ot7sjhat",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("esv5ck9klo0j38l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ot7sjhat",
    "name": "userId",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
})
