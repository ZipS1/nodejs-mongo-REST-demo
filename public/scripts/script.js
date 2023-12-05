import constants from "./constants.js"
import apiFunctions from "./usersApiHandler.js"

init()

async function init() {
    document.forms[constants.addUserForm].addEventListener("submit", onAddUserFormSumbit)
    document.forms[constants.findUserForm].addEventListener("submit", onFindUserFormSubmit)
    document.getElementById(constants.showAllButtonId).addEventListener("click", showAllUsers)
    document.getElementById(constants.printButtonId).addEventListener("click", printList)
    await showAllUsers()
}

async function showAllUsers() {
    const addButton = document.getElementById(constants.addButtonId)
    addButton.removeAttribute("disabled")

    const findButton = document.getElementById(constants.findButtonId)
    findButton.removeAttribute("disabled")

    const printButton = document.getElementById(constants.printButtonId)
    printButton.removeAttribute("disabled")

    const response = await apiFunctions.getAllUsers()
    fillListWith(await response.json())
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
    editButton.setAttribute("id", constants.editButtonId)
    editButton.addEventListener("click", e => {
        onEditButtonClick(e, userJson._id)})
    editButton.append("Edit")
    editTd.append(editButton)
    tr.append(editTd)

    const deleteTd = document.createElement("td")
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("id", constants.deleteButtonId)
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
    confirmButon.setAttribute("id", constants.confirmButtonId)
    confirmButon.addEventListener("click", e => {
        onConfirmButtonClick(e, id)})
    confirmButon.append("Confirm")
    firstButtonTd.innerHTML = ""
    firstButtonTd.append(confirmButon)

    const otherButtons = document.querySelectorAll
        (`#${constants.editButtonId}, #${constants.deleteButtonId},
            #${constants.addButtonId}, #${constants.findButtonId},
            #${constants.printButtonId}`)

    for (const btn of otherButtons)
        btn.setAttribute("disabled", "")
}

async function onDeleteButtonClick(event, id) {
    event.preventDefault()
    const response = await apiFunctions.deleteUser(id)
    response.ok ? await showAllUsers() : alert("Cannot delete user!")
}

async function onConfirmButtonClick(event, id) {
    event.preventDefault()
    const newName = document.getElementById("newName").value
    const newAge = document.getElementById("newAge").value

    const newUser = {
        name: newName,
        age: parseInt(newAge, 10)
    }

    const response = await apiFunctions.changeUser(id, newUser)
    response.ok ? await showAllUsers() : alert("Cannot edit user!")
}

async function onAddUserFormSumbit(event) {
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

    const newUser = {
        name: userName,
        age: parseInt(userAge, 10)
    }

    const response = await apiFunctions.addUser(newUser)
    response.ok ? await showAllUsers() : alert("Cannot add new user!")        
}

async function onFindUserFormSubmit(event) {
    event.preventDefault()
    const id = event.target.id.value
    const name = event.target.name.value
    const age = event.target.age.value

    const findJson = {
        id: id,
        name: name,
        age: parseInt(age, 10)
    }

    const response = await apiFunctions.findUsers(findJson)
    if (response.ok == false) {
        alert("Cannot get users with this parameters!")
        return
    }

    fillListWith(await response.json())
}

async function fillListWith(usersJson) {
    const usersList = document.getElementById(constants.usersListId)
    usersList.innerHTML = ""
    for (const user of usersJson)
        usersList.append(createUserRow(user))
}

async function printList() {
    let printWindow = window.open("", "", "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0")
    printWindow.document.write(await getPrintHtml())
    printWindow.document.close()
    printWindow.print()
    printWindow.close()
}

async function getPrintHtml() {
    const response = await apiFunctions.getAllUsers()

    if (response.ok == false) {
        alert("Cannot get users list!")
        return
    }

    const users = await response.json()

    const table = document.createElement("table")
    for (const user of users)
        table.append(await getUserHtmlTr(user))

    return table.outerHTML
}

async function getUserHtmlTr(userJson) {
    const tr = document.createElement("tr")

    const nameTd = document.createElement("td")
    nameTd.append(userJson.name)
    tr.append(nameTd)

    const ageTd = document.createElement("td")
    ageTd.append(userJson.age)
    tr.append(ageTd)
    
    return tr
}