const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const toggleActiveEl = document.querySelectorAll('.toggle-active');
const clearButton = document.querySelector('.table-top__clear');
const modals = document.querySelectorAll('.modal');

openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modals.forEach(modal => {
            if(modal.classList.contains(btn.getAttribute('data-modal-open'))) {
                modal.classList.toggle('active');
            }
        })
    })
})

closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modals.forEach(modal => {
            if(modal.classList.contains(btn.getAttribute('data-modal-close'))) {
                modal.classList.remove('active');
            }
        })
    })
})

toggleActiveEl.forEach(el => {
    el.addEventListener('click', () => {
        el.classList.toggle('active');
    })
})

clearButton.addEventListener('click', () => {
    if(clearButton.classList.contains('active')) {
        setTimeout(() => {
            clearButton.classList.remove('active');
        }, 300)
    }
})
