const newSignupButton = document.querySelector('#sign-up-form');
const existingLoginButton = document.querySelector('#login-form');

const newestUserSignup = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (password.split("").length < 8) {
        alert('Your password must be at least 8 characters. Please try again.');
        return;
    }

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Your signup was unsuccessful. Please try again.');
        }
    }
    else {
        alert('Enter a valid username and password. Password must be at least 8 characters.');
    }
};

const existingUserLogin = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Your login was unsuccessful. Please try again.');
        }
    }
};

if (newSignupButton) {
    newSignupButton.addEventListener('submit', newestUserSignup);
};

if (existingLoginButton) {
    existingLoginButton.addEventListener('submit', existingUserLogin);
};