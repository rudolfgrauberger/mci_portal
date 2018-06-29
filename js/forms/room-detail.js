'use strict'

$(document).ready( function() {

    if (SessionService.getCurrentSession() == null) {
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
            document.getElementById('searchbuttonroomdetail').click();
        }
    });

    let searchParams = new URLSearchParams(window.location.search);

    var currentRoom = RoomService.getRoomById(searchParams.get('roomid'));

    $('#roomDetailNumber').text(currentRoom.number);
    $('#roomDetailName').text(currentRoom.name);

    refreshOutputTable();

    $('#searchbuttonroomdetail').click(function () {
        refreshOutputTable();
    });

    function getPermissionToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return PermissionService.filterPermissionsForRoom(currentRoom, searchValue);
    }


    function cleanOutputTable() {
        var table = document.getElementById('roomdetailTable');
        var rowCount = table.rows.length;

        for (var index = 1; index < rowCount; ++index) {
            table.deleteRow(1);
        }
    }

    function refreshOutputTable() {
        $('#resultfieldperson').show();
        cleanOutputTable();
        var permissions = getPermissionToDisplay();

        var table = document.getElementById('roomdetailTable');

        for (var i = 0; i < permissions.length; i++) {
            var id = permissions[i].id;
            var room = RoomService.getRoomById(permissions[i].room);
            var person = PersonService.getPersonById(permissions[i].person);
            var roomManager =  UserService.getUserById(room.getRoomManager())

            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = PersonService.getPersonInfoAsString(person);

            if (roomManager) {
                cell2.innerHTML = roomManager.firstname + ' ' + roomManager.lastname;
            }

            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Ausleihen');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + id);
            x.onclick = (function(interne_id) {lent(interne_id) }).bind(this, id);
            cell3.appendChild(x);
        }
    }

    function lent(guid) {
        alert(guid);
        //window.location.href = 'room-detail.html?roomid=' + guid;
    }
});