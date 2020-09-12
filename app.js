//dom elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

//object for generator functions
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}


//generator functions 
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}


//event

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    // console.log(length, hasLower, hasUpper, hasNumber,hasSymbol)
    resultEl.innerHTML = generatePassword( hasLower, hasUpper, hasNumber,hasSymbol, length);

})


//generate password function
function generatePassword(lower, upper, number, symbol, length) {

    //1. init password var

    let generatedPassword = '';

    //2.filter out unchecked types

    const typeCount = lower + upper + number + symbol;
    console.log('typesCount:' , typeCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (
        item => Object.values(item)[0]
    );
    console.log('typesArr:' , typesArr);

    if(typeCount === 0) {
        return '';
    }

    //3. loop over length , call generator function for each type

    for(let i=0; i<length; i+=typeCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    //4. add final password to the password var and return

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}


//copy password to clipboard

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('password copied to clipboard!!')
});