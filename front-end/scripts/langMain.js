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
    } else {
        logoutButton.textContent = 'Log out';
        jokesLink.textContent = 'Jokes';
        chuckJokesLink.textContent = 'Jokes about Chuck Norris';
        interestingNumbersLink.textContent = 'Interesting numbers';
    }
}

function plusSlides(n, button) {
    var index = button.getAttribute('data-index');
    var carouselId = 'carousel_' + index;
    var carousel = document.getElementById(carouselId);
    if (!carousel) return;

    var slides = carousel.querySelectorAll('.carousel-item');
    var currentIndex = -1;
    for (var i = 0; i < slides.length; i++) {
        if (!slides[i].classList.contains('hide')) {
            currentIndex = i;
            break;
        }
    }

    var nextIndex = (currentIndex + n + slides.length) % slides.length;
    slides[currentIndex].classList.add('hide');
    slides[nextIndex].classList.remove('hide');
}