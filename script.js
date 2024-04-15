const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');

fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    data.forEach(country => {
      const option = document.createElement('option');
      option.text = `${country.name.common} (${country.currencies[Object.keys(country.currencies)[0]].name})`;
      option.value = country.currencies[Object.keys(country.currencies)[0]].code;
      fromCurrency.appendChild(option);
      toCurrency.appendChild(option.cloneNode(true));
    });
  });

function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  fetch(`https://restcountries.com/v3.1/currency/{currency}/${from}`)
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.rates[to];
      result.textContent = (amountValue * exchangeRate).toFixed(2);
    });
};
