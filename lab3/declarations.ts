const { MongoClient } = require('mongodb')
const uri = "mongodb://localhost:40000,localhost:40001,localhost:40002/?replicaSet=myapp&readPreference=primaryPreferred"
export const client = new MongoClient(uri)