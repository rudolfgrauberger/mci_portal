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

    function getTransponderToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return TransponderService.filterTransponderBySearchString(searchValue);
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
        var transponder = getTransponderToDisplay();

        var table = document.getElementById('roomdetailTable');

        for (var i = 0; i < transponder.length; i++) {
            var id = transponder[i].id;
            var no = transponder[i].no;

            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = no;
            var cell2 = row.insertCell(1);

            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Ausleihen');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + id);
            x.onclick = (function(interne_id) {lent(interne_id) }).bind(this, id);
            cell2.appendChild(x);
        }
    }

    function lent(guid) {
        alert(guid);
        //window.location.href = 'room-detail.html?roomid=' + guid;
    }
});