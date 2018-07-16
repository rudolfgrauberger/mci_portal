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
            document.getElementById('searchbuttonTransponder').click();
        }
    });


    refreshOutputTable();

    $('#searchbuttonTransponder').click(function () {
        refreshOutputTable();
    });

    function getTransponderToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return TransponderService.filterTransponderBySearchString(searchValue);
    }

    function cleanOutputTable() {
        var table = document.getElementById('transponderTable');
        var rowCount = table.rows.length;

        for (var index = 1; index < rowCount; ++index) {
            table.deleteRow(1);
        }
    }

    function refreshOutputTable() {
        $('#resultfieldtransponder').show();
        cleanOutputTable();
        var transponders = getTransponderToDisplay();

        var table = document.getElementById('transponderTable');

        for (var i = 0; i < transponders.length; i++) {
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = transponders[i].no;

            var rooms = RoomService.filterRoomsByTransponder(transponders[i].id);

            var roomString = rooms.map(function(x) {
                return x.number;
            });

            cell2.innerHTML = roomString.join(', ');

            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Details');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + transponders[i].id);
            x.setAttribute('style', 'float: right;');
            x.onclick = (function(interne_id) {transponder_details(interne_id) }).bind(this, transponders[i].id);
            cell3.appendChild(x);
        }
    }

    function transponder_details(guid) {
        window.location.href = 'transponder-detail.html?transponderid=' + guid;
    }
});