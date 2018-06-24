//search-by function
$(document).ready( function() {

    $("form").submit(function(e) {
        e.preventDefault();
        var userService = new UserService();
        var currentUser = userService.loginUser(document.getElementById("inputName").value, document.getElementById("inputPassword").value);

        if (currentUser == null) {
            window.location.reload(false);
            return;
        }

        window.location.href = userService.getSuccessLoginRedirectPage(currentUser);
    });

});