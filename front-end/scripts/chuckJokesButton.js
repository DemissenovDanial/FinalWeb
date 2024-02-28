async function getNewChuckJoke() {
    try {
        const response = await fetch('/chuckJokes?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzA5MDgxODIxLCJleHAiOjE3MDkwODU0MjF9.WGgp8vQwfYCwcjQm-6dbRk5cPh3alTlJkiydMtnPSWA');
        if (!response.ok) {
            throw new Error('Failed to fetch joke: ' + response.statusText);
        }
        location.reload();
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
}

const chuckJokeButton = document.getElementById('getNewChuckJokeButton');
chuckJokeButton.addEventListener('click', getNewChuckJoke);

const logoutButton = document.querySelector('.logout-button button');

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
    var getNewChuckJokeButton = document.getElementById('getNewChuckJokeButton');
    if (lang === 'ru') {
        logoutButton.textContent = 'Выйти';
        jokesLink.textContent = 'Шутки';
        chuckJokesLink.textContent = 'Шутки о Чаке Норрисе';
        interestingNumbersLink.textContent = 'Интересные числа';
        enter.textContent = 'Шутки о Чаке Норрисе';
        getNewChuckJokeButton.textContent = 'Посмотреть шутку о Чаке Норрисе';

    } else {
        logoutButton.textContent = 'Log out';
        jokesLink.textContent = 'Jokes';
        chuckJokesLink.textContent = 'Jokes about Chuck Norris';
        interestingNumbersLink.textContent = 'Interesting numbers';
        enter.textContent = 'Chuck Norris Joke';
        getNewChuckJokeButton.textContent = 'Get joke about Chuck Norris';
    }
}