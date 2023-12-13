import constants from "./constants.js"
import apiFunctions from "./usersApiHandler.js"

init()

async function init() {
    document.forms[constants.addUserForm].addEventListener("submit", onAddUserFormSumbit)
    document.forms[constants.findUserForm].addEventListener("submit", onFindUserFormSubmit)
    document.getElementById(constants.showAllButtonId).addEventListener("click", showAllUsers)
    document.getElementById(constants.printListButtonId).addEventListener("click", onPrintUsersButtonClicked)
    await showAllUsers()
}

async function showAllUsers() {
    await enableButtons()
    const response = await apiFunctions.getAllUsers()
    response.ok ? fillListWith(await response.json()) : alert("Cannot get all users!")
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

    const printTd = document.createElement("td")
    const printButton = document.createElement("button")
    printButton.setAttribute("id", constants.printUserButtonId)
    printButton.addEventListener("click", (e) => {
        onPrintSingleUserButtonClicked(e)})
    printButton.append("Print")
    printTd.append(printButton)
    tr.append(printTd)

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

    await disableButtonsExceptConfirm();
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
        age: age,
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

async function onPrintUsersButtonClicked() {
    let printWindow = window.open("", "", "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0")
    printWindow.document.write(await getUsersListPrintHtml())
    printWindow.document.close()
    printWindow.print()
    printWindow.close()
}

async function onPrintSingleUserButtonClicked(event) {
    const row = event.target.parentElement.parentElement
    const name = row.getElementsByTagName("td")[1].innerHTML
    const age = row.getElementsByTagName("td")[2].innerHTML

    let printWindow = window.open("", "", "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0")
    printWindow.document.write(await getSingleUserPrintHtml(name, age))
    printWindow.document.close()
    printWindow.print()
    printWindow.close()
}

async function getUsersListPrintHtml() {
    const table = document.createElement("table")
    table.setAttribute("border", "1")
    table.setAttribute("style", "width: 50%; margin: 0 auto;")

    const caption = document.createElement("caption")
    caption.innerHTML = "USERS LIST"
    caption.setAttribute("style", "font-weight: bold; margin-bottom: 10px;")
    table.append(caption)

    const thead = document.createElement("thead")
    const headRow = document.createElement("tr")

    const nameTd = document.createElement("td")
    nameTd.innerHTML = "Name"
    headRow.append(nameTd)

    const ageTd = document.createElement("td")
    ageTd.append("Age")
    headRow.append(ageTd)

    thead.append(headRow)
    table.append(thead)

    let tbody = document.getElementById(constants.usersListId).cloneNode(true)
    tbody = await removeIdAndButtonCols(tbody)

    table.append(tbody)
    return table.outerHTML
}

async function getSingleUserPrintHtml(name, age) {
    const table = document.createElement("table")
    table.setAttribute("style", "width: 30%;")

    const nameRow = document.createElement("tr")
    const nameLabelTd = document.createElement("td")
    nameLabelTd.setAttribute("style", "font-weight: bold;")
    nameLabelTd.append("Name:")
    nameRow.append(nameLabelTd)

    const nameTd = document.createElement("td")
    nameTd.append(name)
    nameRow.append(nameTd)
    table.append(nameRow)

    const ageRow = document.createElement("tr")
    const ageLabelTd = document.createElement("td")
    ageLabelTd.setAttribute("style", "font-weight: bold;")
    ageLabelTd.append("Age:")
    ageRow.append(ageLabelTd)

    const ageTd = document.createElement("td")
    ageTd.append(age)
    ageRow.append(ageTd)
    table.append(ageRow)

    return table.outerHTML
}

async function removeIdAndButtonCols(tbody) {
    const rows = tbody.querySelectorAll("tr")
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        row.removeChild(row.firstChild)
        row.removeChild(row.lastElementChild)
        row.removeChild(row.lastElementChild)
        row.removeChild(row.lastElementChild)
    }

    return tbody
}

async function disableButtonsExceptConfirm() {
    const otherButtons = document.querySelectorAll
        (`#${constants.editButtonId}, #${constants.deleteButtonId},
            #${constants.addButtonId}, #${constants.findButtonId},
            #${constants.printListButtonId}, #${constants.printUserButtonId},
            input[type="reset"]`)

    for (const btn of otherButtons)
        btn.setAttribute("disabled", "")
}

async function enableButtons() {
    const addButton = document.getElementById(constants.addButtonId)
    addButton.removeAttribute("disabled")

    const findButton = document.getElementById(constants.findButtonId)
    findButton.removeAttribute("disabled")

    const printAllButton = document.getElementById(constants.printListButtonId)
    printAllButton.removeAttribute("disabled")

    const clearButtons = document.querySelectorAll(`input[type="reset"]`)
    for (const btn of clearButtons)
        btn.removeAttribute("disabled")
}
