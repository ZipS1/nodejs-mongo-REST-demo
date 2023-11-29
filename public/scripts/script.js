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
}

function onEditButtonClick() {
    console.log(this.parentElement.parentElement.outerHTML)
}

function onDeleteButtonClick() {
    console.log(this.innerHTML)
}

function onConfirmButtonClick() {
    console.log(this.innerHTML)
}
