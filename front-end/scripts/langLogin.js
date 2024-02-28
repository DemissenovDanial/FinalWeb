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
    var login = document.querySelector('h1');
    var username = document.getElementById('1');
    var password = document.getElementById('2');
    var button = document.getElementById('login');
    var register = document.getElementById('register');
    if (lang === 'ru') {
        login.textContent = "Логин";
        username.textContent = "Логин";
        password.textContent = "Пароль";
        button.textContent = "Войти";
        register.textContent = "Зарегистрироватся";
    } else {
        login.textContent = "Login";
        username.textContent = "Username";
        password.textContent = "Password";
        button.textContent = "Login";
        register.textContent = "Register";
    }
}