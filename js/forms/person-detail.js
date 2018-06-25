$(document).ready( function() {

    if (SessionService.getCurrentSession() == null) {
        window.location.href = 'login.html';
        return;
    }

    var searchInput = document.getElementById("searchInput");

    // Execute a function when the user releases a key on the keyboard
    searchInput.addEventListener("keyup", function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("searchbuttonRoom").click();
        }
    });

    let searchParams = new URLSearchParams(window.location.search);

    var currentPerson = PersonService.getPersonById(searchParams.get("personid"));

    $("#personDetailName").text(currentPerson.firstname + " " + currentPerson.lastname);
    $("#personDetailNumber").text(currentPerson.matrikelno ? currentPerson.matrikelno : currentPerson.company);

    refreshOutputTable();

    $('#searchbuttonRoom').click(function () {
        refreshOutputTable();
    });

    function getPermissionToDisplay() {
        var searchValue = document.getElementById("searchInput").value;
  
        return PermissionService.filterPermissionsForPerson(currentPerson, searchValue);
    }


    function cleanOutputTable() {
        var table = document.getElementById('permissionTable');
        var rowCount = table.rows.length;
    
        for (var index = 1; index < rowCount; ++index) {
            table.deleteRow(1);
        }
    }

    function refreshOutputTable() {
        $("#resultfieldperson").show();
        cleanOutputTable();
        var permissions = getPermissionToDisplay();
  
        var table = document.getElementById("permissionTable");
  
        for (i = 0; i < permissions.length; i++) {
            var room = RoomService.getRoomById(permissions[i].room);
            var roomManager =  UserService.getUserById(room.getRoomManager())
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = room.number;
            cell2.innerHTML = room.name;

            if (roomManager) {
                cell3.innerHTML = roomManager.firstname + " " + roomManager.lastname;
            }
        }
    }
});