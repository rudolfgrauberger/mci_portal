$(document).ready( function() {

    $('#logoutButton').click(function() {
        SessionService.setCurrentSession(null);
        window.location.assign('login.html');
    });
});