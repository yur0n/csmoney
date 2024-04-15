function generateUniqueCode(productCode, buyerIndex) {
	function char() {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZa%$#@!*()^bcdefghijklmnopqrstuvwxyz';
		return chars[Math.floor(Math.random() * chars.length)];
	}

  const date = new Date();
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed in JavaScript
  const day = String(date.getDate()).padStart(2, '0');

  const rawCode = `${productCode}${char()}${year}${char()}${month}${char()}${day}${char()}${buyerIndex}`;
  const hash = Math.floor(Math.random() * 104729);
  return `${rawCode}${char()}${hash}`;
}

const uniqueCode = generateUniqueCode('10', '2032');
console.log(uniqueCode);  // Outputs: 10-YYYY-MM-DD-2031-12345