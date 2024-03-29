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
            document.getElementById('searchbuttonRooms').click();
        }
    });

    refreshOutputTable();

    $('#searchbuttonRooms').click(function () {
        refreshOutputTable();
    });

    function getRoomsToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return RoomService.filterRoomsBySearchString(searchValue);
    }

    function cleanOutputTable() {
        var table = document.getElementById('roomTable');
        var rowCount = table.rows.length;

        for (var index = 1; index < rowCount; ++index) {
            table.deleteRow(1);
        }
    }

    function refreshOutputTable() {
        $('#resultfieldroom').show();
        cleanOutputTable();
        var rooms = getRoomsToDisplay();

        var table = document.getElementById('roomTable');

        for (var i = 0; i < rooms.length; i++) {
            var id = rooms[i].id;
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = rooms[i].number;
            cell2.innerHTML = rooms[i].name;
            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Details');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + id);
            x.setAttribute('style', 'float: right;');
            x.onclick = (function(interne_id) {room_details(interne_id) }).bind(this, id);
            cell3.appendChild(x);
        }
    }

    function room_details(guid) {
        window.location.href = 'room-detail.html?roomid=' + guid;
    }
});