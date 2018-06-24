$(document).ready( function() {

    $('#logoutButton').click(function() {
        SessionService.setCurrentSession(null);
        window.location.href = "login.html";
    });
});