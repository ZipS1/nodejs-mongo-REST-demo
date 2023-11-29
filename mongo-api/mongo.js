const url = "mongodb://localhost:27017"
const dbName = "nodejs"
const collectionName = "users"

const MongoClient = require("mongodb").MongoClient
const client = new MongoClient(url)

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

exports.findUser = async function findUser(findJson) {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

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

exports.updateUser = async function updateUser(oldJson, newJson) {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)

        const setJson = {$set: {newJson}}
        result = await collection.updateOne(oldJson, setJson)
    } catch (err) {
        console.log("Error occured!")
        console.log(err)
        result = {error: true}
    } finally {
        await client.close()
        return result
    }
}

exports.deleteUser = async function deleteUser(deleteJson) {
    let result
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        
        result = await collection.deleteOne(deleteJson)
    } catch (err) {
        console.log("Error occured!")
        console.log(err)
        result = {error: true}
    } finally {
        await client.close()
        return result
    }
}

exports.deleteAll = async function dropUsers() {
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
