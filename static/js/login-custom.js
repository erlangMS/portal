var login = getUrlParameter('login');
var fail = getUrlParameter('fail');
var reason = getUrlParameter('reason');
if (login == 1) {
    $('#signupbox').hide(); $('#loginbox').show();
    if (fail == 1) {
        $('#login-alert').show()
    }
} 

if (fail == 1) {
    $('#signupalert').show()
}

if (reason == "password") {
    $('#signupalert').show()
    $('#signupalert p').text("Passwords must match")
}

if (reason == "password_length") {
    $('#signupalert').show()
    $('#signupalert p').text("Password musrt be at least 6 characters long")
}

if (reason == "code_invalid") {
    $('#signupalert').show()
    $('#signupalert p').text("We're sorry but signups are by invite only")
}

if (reason == "org_exists") {
    $('#signupalert').show()
    $('#signupalert p').text("That organisation name has already been taken")
}


