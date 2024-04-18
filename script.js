const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');

fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    data.forEach(country => {
      const option = document.createElement('option');
      option.text = `${Object.keys(country.currencies)[0]} (${country.name.common})`;
      option.value = country.currencies[Object.keys(country.currencies)[0]].code;
      fromCurrency.appendChild(option);
      toCurrency.appendChild(option.cloneNode(true));
    });
  });

function convertCurrency() {
  fetch('https://v6.exchangerate-api.com/v6/823c766a31f3f4bf4eb252a3/latest/USD')
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.conversion_rates[toCurrency.value];
      result.textContent = (amount.value * exchangeRate).toFixed(2);
    });
};
