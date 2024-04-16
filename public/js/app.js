const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const toggleActiveEl = document.querySelectorAll('.toggle-active');
const startButton = document.querySelector('.table-top__start');
const clearButton = document.querySelector('.table-top__clear');
const modals = document.querySelectorAll('.modal');
const table = document.querySelector('.table-content__info');
const logsTable = document.querySelector('.logs-content');

let interval;
const histrory = [];

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
    const minProfitCoef = 1 - parseInt(localStorage.getItem('min-profit')) / 100;
    const maxProfitCoef = 1 + parseInt(localStorage.getItem('max-profit')) / 100;
    const data = {
        maxPrice: localStorage.getItem('max-price') || 1000,
        minPrice: localStorage.getItem('min-price') || 100,
        minProfit: minProfitCoef || 0.8,
        maxProfit: maxProfitCoef || 1.5
    }
    const row = document.createElement('div');
    row.classList.add('table-content__info-row');
    row.innerHTML = `<h4>${formatDate()} - Send request</h4>`;
    logsTable.appendChild(row);

    window.postMessage({ parse: true, data }, "*");
    interval = setTimeout(() => {
        start();
    }, 15_000);
}

window.addEventListener("message", (e) => {
    if (e.data.parsedSkins) {
        const skins = e.data.parsedSkins
        if (skins.error) {
            const row = document.createElement('div');
            row.classList.add('table-content__info-row');
            row.innerHTML = `<h4>${formatDate()} - ${skins.error}</h4><p>Status: ${skins?.status}</p>`;
            logsTable.appendChild(row);
            return;
        }
        console.log(skins);
        skins.forEach(skin => {
            if (histrory.includes(skin.id)) return;
            histrory.push(skin.id);
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

function formatDate() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
}

async function isAllowed() {
    try {

    } catch (error) {
        console.log(error);
    }
}