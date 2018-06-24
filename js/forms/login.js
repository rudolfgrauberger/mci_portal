//search-by function
$(document).ready( function() {

    $("form").submit(function(e) {
        e.preventDefault();
        var userService = new UserService();
        var currentUser = userService.getUserByName(document.getElementById("inputName").value);

        if (currentUser == null) {
            window.location.reload(false);
            return;
        }

        if (currentUser.username == "rv"){
            window.location.href = 'rv-start.html';
        }
        if(currentUser.username == "pf"){
            window.location.href = 'search.html';
        }
    });

});