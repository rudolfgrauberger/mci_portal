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
            document.getElementById("searchbuttonrvroom").click();
        }
    });

    let searchParams = new URLSearchParams(window.location.search);

    var currentRoom = RoomService.getRoomById(searchParams.get("roomid"));

    $("#roomDetailNumber").text(currentRoom.number);
    $("#roomDetailName").text(currentRoom.name);

    refreshOutputTable();

  $("#searchbuttonrvroom").click(function() {
      refreshOutputTable();
  });

  function getPermissionToDisplay() {
      var searchValue = document.getElementById("searchInput").value;

      return PermissionService.filterPermissionsForRoom(currentRoom, searchValue);
    }

  function cleanOutputTable() {
    var table = document.getElementById('rvpersonTable');
    var rowCount = table.rows.length;

    for (var index = 2; index < rowCount; ++index) {
        table.deleteRow(2);
    }
  }

  function refreshOutputTable() {
      cleanOutputTable();
      var permissions = getPermissionToDisplay();

      var table = document.getElementById("rvpersonTable");

      for (i = 0; i < permissions.length; i++) {
          var id = permissions[i].id;
          var person = PersonService.getPersonById(permissions[i].person);
          var row = table.insertRow(2);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = person.matrikelno;
          cell2.innerHTML = person.firstname + " " + person.lastname;
          cell3.innerHTML = permissions.expires == null ? "unbegrenzt" : permissions.expires;
          var x = document.createElement("INPUT");
          x.setAttribute("type", "button");
          x.setAttribute("value", "Löschen");
          x.setAttribute("class", "btn btn-success");
          x.setAttribute("id", "permission_" + id);
          x.onclick = (function(permission_id) {remove_permission(permission_id) }).bind(this, id);
          cell4.appendChild(x);
    }
  }

  function remove_permission(guid) {
      alert("Permission-ID: " + guid);
  }

});