const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rate = document.getElementById('rate');
const swap = document.getElementById('swap-btn');

// Fecth exchange rates and update the DOM
function calculate() {
    let cur_one = currency_one.value;
    let cur_two = currency_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/a6dd84da0a32707c9e3c5ae8/latest/${cur_one}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const r = data.conversion_rates[cur_two];
            rate.innerHTML = `1 ${cur_one} = ${r} ${cur_two}`;
            amount_two.value = (amount_one.value * r).toFixed(2);
        })
}

// Swap 
function swapFunc() {
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();
}

currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
amount_two.addEventListener('input', calculate);
swap.addEventListener('click', swapFunc);