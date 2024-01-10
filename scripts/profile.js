$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "php/user_info.php",
        success: function (response) {
            let resJson = JSON.parse(response);
            if (resJson.success) {
                $('.banner-title').text('Hi, ' + resJson.username);
                $('#username').text(resJson.username);
                $('#email').text(resJson.email);
            } else {
                console.error('Error: ' + resJson.message);
            }
        },
        error: function (xhr, status, error) {
            console.log('Error');
        }
    });
});

$('#logout-button').click(function () {
    $.ajax({
        type: "GET",
        url: "php/logout.php",
        success: function (response) {
            console.log('Logged out.');
            window.location.replace("./index.html");
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});