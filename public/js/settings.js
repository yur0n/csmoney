const maxPrice = document.getElementById('max-price');
const minPrice = document.getElementById('min-price');
const maxProfit = document.getElementById('max-profit');
const minProfit = document.getElementById('min-profit');

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
	input.value = localStorage.getItem(input.id) || '';
});

inputs.forEach(input => {
	input.addEventListener('change', () => {
		localStorage.setItem(input.id, input.value);
	});
});
