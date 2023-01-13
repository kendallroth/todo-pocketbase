migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12hqsm1gcy26uwg")

  collection.listRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12hqsm1gcy26uwg")

  collection.listRule = null

  return dao.saveCollection(collection)
})
