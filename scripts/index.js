function check_login_status() {
    $.ajax({
        type: "GET",
        url: "php/login_status.php",
        success: function (response) {
            let resJson = JSON.parse(response);
            if (resJson.logged_in) {
                $('#auth-section').prop('hidden', true);
                $('#profile-button').prop('hidden', false);
                $('#game-section').removeClass('col-8');
            } else {
                $('#auth-section').prop('hidden', false);
                $('#profile-button').prop('hidden', true);
                $('#game-section').addClass('col-8');
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

// show login error message corresponding to reason
function showLoginError(reason) {
    switch (reason) {
        case 'email':
            $('#email-message').text('Account not found');
            $('#email-message').prop('hidden', false);
            break;
        case 'password':
            $('#password-message').text('Wrong password');
            $('#password-message').prop('hidden', false);
            break;
    }
}

// show signup error message corresponding to reason
function showSignupError(reason) {
    switch (reason) {
        case 'email':
            $('#email-message').text('Email already used');
            $('#email-message').prop('hidden', false);
            break;
        case 'invalid_email':
            $('#email-message').text('Invalid email');
            $('#email-message').prop('hidden', false);
        case 'username':
            $('#username-message').text('Username taken');
            $('#username-message').prop('hidden', false);
            break;
    }
}
// hide all input errors
function resetInputErrors() {
    $('.input-message').each(function () {
        $(this).prop('hidden', true);
    });
}

function swtichAuthMode(element) {
    if (login) {
        login = false;
        $('#username').prop('required', true);
        $('#username').prop('hidden', false);
        $('#login-button').text('SIGN UP');
        $('.auth-bottom-text span').text("Already have an account?");
        $('#sign-up-link').text('Login');
    } else {
        login = true;
        $('#username').prop('required', false);
        $('#username').prop('hidden', true);
        $('#login-button').text('LOGIN');
        $('.auth-bottom-text span').text("Don't have an account?");
        $('#sign-up-link').text('Sign Up');
    }
    $('#auth-form').trigger('reset');
    resetInputErrors();
}

function attempt_login() {
    let data = {
        email: $('#email').val(),
        password: $('#password').val()
    };

    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: data,
        success: function (response) {
            let resJson = JSON.parse(response);
            if (resJson.success) {
                check_login_status();
            } else {
                // display error message corresponding to reason
                showLoginError(resJson.reason);
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function attempt_signup() {
    let data = {
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val()
    };

    $.ajax({
        type: "POST",
        url: "php/signup.php",
        data: data,
        success: function (response) {
            let resJson = JSON.parse(response);
            if (resJson.success) {
                swtichAuthMode();
                $('#main-message').text('Account created!')
                $('#main-message').prop('hidden', false);
            } else {
                showSignupError(resJson.reason);
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

let login = true;

$(document).ready(function () {
    check_login_status();
});

$('#auth-form').submit(function (event) {
    event.preventDefault();

    resetInputErrors();

    if (login) {
        console.log('Logging in');
        attempt_login();
    } else {
        console.log('Signing up');
        attempt_signup();
    }
});

$('#sign-up-link').click(function () {
    swtichAuthMode();
});