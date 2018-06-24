//search-by function
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
            document.getElementById("searchbuttonrvstart").click();
        }
    });

    refreshOutputTable();


  $("#searchbuttonrvstart").click(function() {
      refreshOutputTable();
  });

  function getRoomsToDisplay() {
      var searchValue = document.getElementById("searchInput").value;

      return RoomService.filterAssignedRoomsForUser(SessionService.getCurrentSession().user, searchValue);
    }

  function cleanOutputTable() {
    var table = document.getElementById('rvroomTable');
    var rowCount = table.rows.length;

    for (var index = 2; index < rowCount; ++index) {
        table.deleteRow(2);
    }
  }

  function refreshOutputTable() {
      cleanOutputTable();
      var rooms = getRoomsToDisplay();

      var table = document.getElementById("rvroomTable");

      for (i = 0; i < rooms.length; i++) {
          var row = table.insertRow(2);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.innerHTML = rooms[i].number;
          cell2.innerHTML = rooms[i].name;
    }
  }
});