const fromCurrency = document.getElementById('fromCurrency');
const fromAmount = document.getElementById('fromAmount');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');
const API_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        data.forEach(country => {
            const option1 = document.createElement('option');
            option1.text = `${Object.keys(country.currencies)[0]} (${country.name.common})`;
            option1.value = country.currencies[Object.keys(country.currencies)[0]].code;
            fromCurrency.add(option1);

            const option2 = document.createElement('option');
            option2.text = `${Object.keys(country.currencies)[0]} (${country.name.common})`;
            option2.value = country.currencies[Object.keys(country.currencies)[0]].code;
            toCurrency.add(option2);
        });
    });

function convertCurrency(){
    let amt = document.querySelector(result);
    let amount = amt.value;
    const URL = `${API_URL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = fetch(URL);
    let data = response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalResult = amount * rate;
    result.textContent = `${amount} ${fromCurrency.value} = ${finalResult.toFixed(2)} ${toCurrency.value}`;
};
