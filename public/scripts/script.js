linkEventListeners()

function linkEventListeners() {
    const editButtons = document.querySelectorAll('[id=editButton]')
    editButtons.forEach(btn => {
        btn.addEventListener("click", onEditButtonClick)
    })

    const deleteButtons = document.querySelectorAll('[id=deleteButton]')
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", onDeleteButtonClick)
    })

    const confirmButtons = document.querySelectorAll('[id=confirmButton]')
    confirmButtons.forEach(btn => {
        btn.addEventListener("click", onConfirmButtonClick)
    })

    document.forms["userForm"].addEventListener("submit", onFormSumbit)
}

async function onEditButtonClick() {
    console.log(this.parentElement.parentElement.outerHTML)
}

async function onDeleteButtonClick() {
    console.log(this.innerHTML)
}

async function onConfirmButtonClick() {
    console.log(this.innerHTML)
}

async function onFormSumbit(e) {
    e.preventDefault()
    const response = await fetch("/api/users/", {
        method: "GET",
        headers: { "Accept": "application/json" },
    });
    console.log(await response.json())
}