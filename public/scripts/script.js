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

async function onFormSumbit(event) {
    event.preventDefault()
    const userName = event.target.userName.value
    const userAge = event.target.userAge.value

    if (userAge <= 0) {
        alert("User age should be > 0")
        return
    }

    const response = await fetch("/api/users/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: userName,
            age: parseInt(userAge, 10)
        })
    });
}