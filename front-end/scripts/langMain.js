const logoutButton = document.querySelector('.logout-button button');
const carouselImages = document.querySelectorAll('.carousel-image');
let counter = 0;

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
    var jokesLink = document.querySelector('.jokes-link a');
    var chuckJokesLink = document.querySelector('.chuck-jokes-link a');
    var interestingNumbersLink = document.querySelector('.interesting-numbers-link a');
    var jokes = document.querySelector('h2')
    if (lang === 'ru') {
        logoutButton.textContent = 'Выйти';
        jokesLink.textContent = 'Шутки';
        chuckJokesLink.textContent = 'Шутки о Чаке Норрисе';
        interestingNumbersLink.textContent = 'Интересные числа';
        jokes.textContent = 'Шутки';
    } else {
        logoutButton.textContent = 'Log out';
        jokesLink.textContent = 'Jokes';
        chuckJokesLink.textContent = 'Jokes about Chuck Norris';
        interestingNumbersLink.textContent = 'Interesting numbers';
        jokes.textContent = 'Jokes';
    }
}

function nextSlide() {
    counter++;
    console.log(carouselImages);
    if (counter >= carouselImages.length) {
        counter = 0;
    }
    updateCarousel();
}

function updateCarousel() {
    const offset = -50 * counter;
    document.querySelector('.carousel').style.transform = `translateX(${offset}vw)`;
}

setInterval(nextSlide, 5000);