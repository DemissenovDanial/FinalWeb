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
    var register = document.querySelector('h1');
    var username = document.getElementById('1');
    var password = document.getElementById('2');
    var button = document.getElementById('register');
    var login = document.getElementById('login');
    if (lang === 'ru') {
        register.textContent = "Регистрация";
        username.textContent = "Логин";
        password.textContent = "Пароль";
        button.textContent = "Зарегистрироватся";
        login.textContent = "Войти";
    } else {
        register.textContent = "Register";
        username.textContent = "Username";
        password.textContent = "Password";
        button.textContent = "Register";
        login.textContent = "Login";
    }
}