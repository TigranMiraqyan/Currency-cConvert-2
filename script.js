const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const convertedAmount = document.getElementById('convertedAmount');
fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option1 = new Option(currency, currency);
            const option2 = new Option(currency, currency);
            fromSelect.add(option1);
            toSelect.add(option2);
            const flag = document.createElement('img');
            flag.src = `https://flagsapi.com/:country_code${currency.slice(0, 2)}/:style/:size.png/`;
            flag.alt = currency;
            fromSelect.options[fromSelect.options.length - 1].appendChild(flag);
            toSelect.options[toSelect.options.length - 1].appendChild(flag.cloneNode());
        });
    });
amountInput.addEventListener('input', convertCurrency);
fromSelect.addEventListener('change', convertCurrency);
toSelect.addEventListener('change', convertCurrency);

function convertCurrency() {
    const amount = amountInput.value;
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const result = amount * exchangeRate;
            convertedAmount.textContent = result.toFixed(2);
        });
}
