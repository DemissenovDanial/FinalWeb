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
    var titleUsers = document.getElementById('titleUsers');
    var titleJokes = document.getElementById('titleJokes');
    if (lang === 'ru') {
        logoutButton.textContent = 'Выйти';
        jokesLink.textContent = 'Шутки';
        chuckJokesLink.textContent = 'Шутки о Чаке Норрисе';
        interestingNumbersLink.textContent = 'Интересные числа';
        titleUsers.textContent = 'Пользователи';
        titleJokes.textContent = 'Шутки';
    } else {
        logoutButton.textContent = 'Log out';
        jokesLink.textContent = 'Jokes';
        chuckJokesLink.textContent = 'Jokes about Chuck Norris';
        interestingNumbersLink.textContent = 'Interesting numbers';
        titleUsers.textContent = 'Users';
        titleJokes.textContent = 'Jokes';
    }
}
