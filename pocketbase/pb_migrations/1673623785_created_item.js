migrate((db) => {
  const collection = new Collection({
    "id": "hud3lg3o2i2v6jn",
    "created": "2023-01-13 15:29:45.697Z",
    "updated": "2023-01-13 15:29:45.697Z",
    "name": "item",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ctkylwor",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "futj0cts",
        "name": "list",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "esv5ck9klo0j38l",
          "cascadeDelete": true
        }
      },
      {
        "system": false,
        "id": "mxwb4ket",
        "name": "complete",
        "type": "bool",
        "required": true,
        "unique": false,
        "options": {}
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hud3lg3o2i2v6jn");

  return dao.deleteCollection(collection);
})
