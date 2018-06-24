$(document).ready( function() {

    if (SessionService.getCurrentSession() != null) {
        var session = SessionService.getCurrentSession();
        var userService = new UserService();
        window.location.href = userService.getSuccessLoginRedirectPage(session.user);
        return;
    }

    $("form").submit(function(e) {
        e.preventDefault();
        var userService = new UserService();
        var currentUser = userService.loginUser(document.getElementById("inputName").value, document.getElementById("inputPassword").value);

        if (currentUser == null) {
            window.location.reload(false);
            return;
        }

        var session = SessionFactory.create(currentUser);
        SessionService.setCurrentSession(session);
        window.location.assign(userService.getSuccessLoginRedirectPage(currentUser));
    });

});