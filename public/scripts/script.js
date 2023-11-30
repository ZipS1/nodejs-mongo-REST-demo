init()

async function init() {
    document.forms["userForm"].addEventListener("submit", onFormSumbit)
    await updateList()
}

async function updateList() {
    const addButton = document.getElementById("addButton")
    addButton.removeAttribute("disabled")

    const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok == false) {
        alert("Cannot get users list!")
        return
    }

    const usersList = document.getElementById("usersList")
    usersList.innerHTML = ""
    const users = await response.json();
    for (const user of users)
        usersList.append(createUserRow(user))
}

function createUserRow(userJson) {
    const tr = document.createElement("tr")
    tr.setAttribute("id", userJson._id)

    const idTd = document.createElement("td")
    idTd.append(userJson._id)
    tr.append(idTd)

    const nameTd = document.createElement("td")
    nameTd.append(userJson.name)
    tr.append(nameTd)

    const ageTd = document.createElement("td")
    ageTd.append(userJson.age)
    tr.append(ageTd)

    const editTd = document.createElement("td")
    const editButton = document.createElement("button")
    editButton.setAttribute("id", "editButton")
    editButton.addEventListener("click", e => {
        onEditButtonClick(e, userJson._id)})
    editButton.append("Edit")
    editTd.append(editButton)
    tr.append(editTd)

    const deleteTd = document.createElement("td")
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("id", "deleteButton")
    deleteButton.addEventListener("click", e => {
        onDeleteButtonClick(e, userJson._id)})
    deleteButton.append("Delete")
    deleteTd.append(deleteButton)
    tr.append(deleteTd)

    return tr
}

async function onEditButtonClick(event, id) {
    event.preventDefault()
    const rowTds = document.querySelector(`[id="${id}"]`).getElementsByTagName("td")

    const nameTd = rowTds[1]
    const nameInput = document.createElement("input")
    nameInput.setAttribute("type", "text")
    nameInput.setAttribute("name", "newName")
    nameInput.setAttribute("id", "newName")
    nameInput.setAttribute("autocomplete", "off")
    nameInput.setAttribute("value", nameTd.innerHTML)
    nameTd.innerHTML = ""
    nameTd.append(nameInput)

    const ageTd = rowTds[2]
    const ageInput = document.createElement("input")
    ageInput.setAttribute("type", "number")
    ageInput.setAttribute("name", "newAge")
    ageInput.setAttribute("id", "newAge")
    ageInput.setAttribute("value", ageTd.innerHTML)
    ageTd.innerHTML = ""
    ageTd.append(ageInput)

    const firstButtonTd = rowTds[3]
    const confirmButon = document.createElement("button")
    confirmButon.setAttribute("id", "confirmButton")
    confirmButon.addEventListener("click", e => {
        onConfirmButtonClick(e, id)})
    confirmButon.append("Confirm")
    firstButtonTd.innerHTML = ""
    firstButtonTd.append(confirmButon)

    const otherButtons = document.querySelectorAll(`#editButton, #deleteButton, #addButton`)
    for (const btn of otherButtons)
        btn.setAttribute("disabled", "")
}

async function onDeleteButtonClick(event, id) {
    event.preventDefault()

    const response = await fetch(`api/users/${id}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    })

    if (response.ok == false)
        alert("Cannot delete user!")
    else
        await updateList()
}

async function onConfirmButtonClick() {
    console.log(this.innerHTML)
}

async function onFormSumbit(event) {
    event.preventDefault()
    const userName = event.target.userName.value
    const userAge = event.target.userAge.value
    event.target.userName.value = ""
    event.target.userAge.value = ""

    if (userName === "") {
        alert("User name should not be empty")
        return
    }

    if (userAge <= 0) {
        alert("User age should be > 0")
        return
    }

    const response = await fetch("/api/users", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: userName,
            age: parseInt(userAge, 10)
        })
    })

    if (response.ok == false)
        alert("Cannot add new user!")
    else
        await updateList()
}