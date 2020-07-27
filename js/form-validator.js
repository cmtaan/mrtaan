const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show error message
function showError(input, message) {

    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success message
function showSuccess(input) {

    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required
function checkRequired(inputArr) {

    inputArr.forEach(function(input) {

        if (input.value.trim() === '') {

            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check length
function checkLength(input, min, max) {

    if (input.value.length < min) {

        showError(input, `${getFieldName(input)} must be least at ${min} characters`);
    } else if (input.value.length > max) {

        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {

        showSuccess(input);
    }
}


// Check email
function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(email).toLowerCase())) {

        showSuccess(email);
    } else {

        showError(email, `Email is not valid`);
    }

}

// Check password match
function checkPasswordMatch(password1, password2) {

    if (password1.value !== password2.value) {

        showError(password2, `Password do not match`);
    } else {
        showSuccess(password2);
    }
}

// Event listener submit
form.addEventListener('submit', function(e) {

    e.preventDefault(); //cancel event default

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 20);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});