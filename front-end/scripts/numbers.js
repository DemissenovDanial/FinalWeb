const numberForm = document.getElementById('numberForm');
numberForm.addEventListener('submit', submitNumberForm);
const numberType = document.getElementById('numberType');

async function submitNumberForm(event) {
    event.preventDefault();
    const numberInput = document.getElementById('numberInput').value;
    try {
        let response;
        if(numberType.value == "math" || numberType.value == "Математический"){
            response = await fetch(`/numberFunc/${numberInput}/math`);
        }
        else if(numberType.value == "date" || numberType.value == "Дата"){
            response = await fetch(`/numberFunc/${numberInput}/date`);
        }
        else{
            response = await fetch(`/numberFunc/${numberInput}`);
        }
        if (!response.ok) {
            throw new Error('Failed to fetch fact: ' + response.statusText);
        }
        const data = await response.json();
        document.getElementById('factDisplay').innerText = data.fact;
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            var lang = this.value;
            changeLanguage(lang);
        });
    }
});

function changeLanguage(lang) {
    var logoutButton = document.querySelector('.logout-button button');
    var jokesLink = document.querySelector('.jokes-link a');
    var chuckJokesLink = document.querySelector('.chuck-jokes-link a');
    var interestingNumbersLink = document.querySelector('.interesting-numbers-link a');
    var enter = document.querySelector('h1');
    var select = document.getElementById('select');
    var date = document.getElementById('date');
    var math = document.getElementById('math');
    var regular = document.getElementById('regular');
    var n = document.getElementById('1');
    var fact = document.getElementById('fact');
    if (lang === 'ru') {
        logoutButton.textContent = 'Выйти';
        jokesLink.textContent = 'Шутки';
        chuckJokesLink.textContent = 'Шутки о Чаке Норрисе';
        interestingNumbersLink.textContent = 'Интересные числа';
        enter.textContent = 'Введите число';
        select.textContent = 'Выберите тип:';
        date.textContent =  'Дата';
        math.textContent = 'Математический';
        regular.textContent = 'Обычный';
        n.textContent = 'Число (если это дата, то напишите в формате месяц/день):';
        fact.textContent = 'Посмотреть факт о числе';

    } else {
        logoutButton.textContent = 'Log out';
        jokesLink.textContent = 'Jokes';
        chuckJokesLink.textContent = 'Jokes about Chuck Norris';
        interestingNumbersLink.textContent = 'Interesting numbers';
        enter.textContent = 'Enter a Number';
        select.textContent = 'Select';
        date.textContent =  'Date';
        math.textContent = 'Mathematical Number';
        regular.textContent = 'Regular Number';
        n.textContent = 'Number(if this is a date, then write in the format month/day):';
        fact.textContent = 'Get Fact';
    }
}