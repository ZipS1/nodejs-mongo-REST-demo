async function getAllUsers() {
    const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    return response
}

async function findUsers(findJson) {
    let query = "?"
    if (findJson.id !== "")
        query += `id=${findJson.id}&`
    if (findJson.name !== "")
        query += `name=${findJson.name}&`
    if (findJson.age !== "")
        query += `age=${findJson.age}&`

    const response = await fetch("/api/users/user" + query, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    return response
}

async function addUser(user) {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    return response
}

async function changeUser(id, newUser) {
    const response = await fetch(`api/users/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })

    return response
}

async function deleteUser(id) {
    const response = await fetch(`api/users/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    })

    return response
}

const functions = {
    getAllUsers: getAllUsers,
    findUsers: findUsers,
    addUser: addUser,
    changeUser: changeUser,
    deleteUser: deleteUser,
}

export default functions