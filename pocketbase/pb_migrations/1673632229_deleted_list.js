migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("esv5ck9klo0j38l");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "esv5ck9klo0j38l",
    "created": "2023-01-13 15:28:24.606Z",
    "updated": "2023-01-13 15:29:58.637Z",
    "name": "list",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sobenqdn",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 100,
          "pattern": ""
        }
      },
      {
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
})
