'use strict'

$(document).ready( function() {

    if (SessionService.getCurrentSession() === null) {
        window.location.href = 'login.html';
        return;
    }

    var searchInput = document.getElementById('searchInput');

    // Execute a function when the user releases a key on the keyboard
    searchInput.addEventListener('keyup', function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById('searchbuttonrvstart').click();
        }
    });

    refreshOutputTable();


    $('#searchbuttonrvstart').click(function() {
        refreshOutputTable();
    });

    function getTranspondersToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return TransponderService.filterTransponderBySearchStringForUser(SessionService.getCurrentSession().user, searchValue);
    }

    function cleanOutputTable() {
        var table = document.getElementById('rvtransponderRoomTable');
        var rowCount = table.rows.length;

        for (var index = 2; index < rowCount; ++index) {
            table.deleteRow(2);
        }
    }

    function refreshOutputTable() {
        cleanOutputTable();
        var transponder = getTranspondersToDisplay();

        var table = document.getElementById('rvtransponderRoomTable');

        var userRooms = RoomService.getAllAssignedRoomsForUser(SessionService.getCurrentSession().user);

        for (var i = 0; i < transponder.length; i++) {
            var id = transponder[i].id;
            var rooms = transponder[i].rooms.filter(function(x) {
                var room = RoomService.getRoomById(x);

                return userRooms.some(e => e.id === room.id);

            }).map(function(x) {
                var room = RoomService.getRoomById(x);
                var name = room.name ? '(' + room.name + ')' : '';
                return room.number + name;
            });

            var row = table.insertRow(2);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = transponder[i].no;
            cell2.innerHTML = rooms.join(', ');
            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Details');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + id);
            x.onclick = (function(interne_id) {transponder_details(interne_id) }).bind(this, id);
            cell3.appendChild(x);
        }
    }

  function transponder_details(guid) {
      window.location.href = 'rv-transponder-detail.html?transponderid=' + guid;
  }
});