const fromCurrency = document.getElementById('fromCurrency');
const fromAmount = document.getElementById('fromAmount');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');

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
    function convertCurrency() {
        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('fromCurrency').value;
        
        fetch('https://v6.exchangerate-api.com/v6/823c766a31f3f4bf4eb252a3/latest/USD')
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.conversion_rates[toCurrency.value];
            document.getElementById('result').textContent = (amount * exchangeRate).toFixed(2);
        });
    };
