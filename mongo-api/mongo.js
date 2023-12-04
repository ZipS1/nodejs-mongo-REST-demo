const url = "mongodb://localhost:27017"
const dbName = "nodejs"
const collectionName = "users"

const MongoClient = require("mongodb").MongoClient
const objectId = require("mongodb").ObjectId
const client = new MongoClient(url)

exports.isValidObjectId = objectId.isValid

exports.insertUser = async function insertUser(user) {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        result = await collection.insertOne(user)
    } catch (err) {
        console.log("Error occured!")
        console.log(err)
        result = {error: true}
    } finally {
        await client.close()
        return result
    }
}

exports.findAll = async function findAll() {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        result = await collection.find().toArray()
    } catch (err) {
        console.log("Error occured!")
        console.log(err)
        result = {error: true}
    } finally {
        await client.close()
        return result
    }
}

exports.findUser = async function findUser(queryJson) {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        let findJson = new Object()
        if (queryJson.id !== undefined)
            findJson._id = new objectId(queryJson.id)

        if (queryJson.name !== undefined)
            findJson.name = queryJson.name 
        
        if (queryJson.age !== undefined)
            findJson.age = parseInt(queryJson.age, 10)

        result = await collection.find(findJson).toArray()
    } catch (err) {
        console.log("Error occured!")
        console.log(err)
        result = {error: true}
    } finally {
        await client.close()
        return result
    }
}

exports.updateUser = async function updateUser(id, user) {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        const objId = new objectId(id)
        const findJson = {_id: objId}
        const setJson = {$set: {name: user.name, age: user.age}}
        result = await collection.findOneAndUpdate(findJson, setJson)
    } catch (err) {
        console.log("Error occured!")
        console.log(err)
        result = {error: true}
    } finally {
        await client.close()
        return result
    }
}

exports.deleteUser = async function deleteUser(id) {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        
        const objId = new objectId(id)
        const deleteJson = {_id: objId}
        result = await collection.findOneAndDelete(deleteJson)
    } catch (err) {
        console.log("Error occured!")
        console.log(err)
        result = {error: true}
    } finally {
        await client.close()
        return result
    }
}

exports.deleteAll = async function deleteAll() {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        result = await collection.drop()
    } catch (err) {
        console.log("Error occured!")
        console.log(err)
        result = {error: true}
    } finally {
        await client.close()
        return result
    }
}
