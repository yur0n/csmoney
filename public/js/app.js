const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const toggleActiveEl = document.querySelectorAll('.toggle-active');
const startButton = document.querySelector('.table-top__start');
const clearButton = document.querySelector('.table-top__clear');
const modals = document.querySelectorAll('.modal');
const table = document.querySelector('.table-content__info');

let interval;

openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modals.forEach(modal => {
            if (modal.classList.contains(btn.getAttribute('data-modal-open'))) {
                modal.classList.toggle('active');
            }
        })
    })
});

closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modals.forEach(modal => {
            if (modal.classList.contains(btn.getAttribute('data-modal-close'))) {
                modal.classList.remove('active');
            }
        })
    })
});

toggleActiveEl.forEach(el => {
    el.addEventListener('click', () => {
        el.classList.toggle('active');
    })
});

startButton.addEventListener('click', () => {
    if (startButton.classList.contains('active')) {
        start();
    } else {
        clearInterval(interval);
    }
});

clearButton.addEventListener('click', () => {
    if (clearButton.classList.contains('active')) {
        setTimeout(() => {
            clearButton.classList.remove('active');
        }, 300)
    }
});


async function start() {
    const maxPrice = localStorage.getItem('maxPrice') || 1000,
        minPrice = localStorage.getItem('minPrice') || 100,
        minProfit = localStorage.getItem('minProfit') || 1.05,
        maxProfit = localStorage.getItem('maxProfit') || 1.5;
    const data = { maxPrice, minPrice, minProfit, maxProfit };
    window.postMessage({ parse: true, data }, "*");
    interval = setTimeout(() => {
        start();
    }, 10_000);
}

window.addEventListener("message", (e) => {
    if (e.data.parsedSkins) {
        const skins = e.data.parsedSkins
        if (skins.error) {
            const row = document.createElement('div');
            row.classList.add('table-content__info-row');
            row.innerHTML = `<h3>${skins.error}</h3><p>Status: ${skins?.status}</p>`;
            table.appendChild(row);
            return;
        }
        console.log(skins);
        skins.forEach(skin => {
            const row = document.createElement('div');
            row.classList.add('table-content__info-row');
            row.innerHTML = `
            <h3>Found profitable skin: ${skin.name}</h3>
            <p>CS.Money Price: ${skin.csPrice}</p>
            <p>BUFF163 Price: ${skin.buffPrice}</p>
            <p>Profit: ${skin.profit}%</p>
            `;
            table.appendChild(row);
        })
    }
});