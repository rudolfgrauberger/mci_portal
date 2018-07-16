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
            document.getElementById('generalsearchbutton').click();
        }
    });

    refreshOutputTable();

    $('#generalsearchbutton').click(function () {
        refreshOutputTable();
    });

    function getRoomsToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return RoomService.filterRoomsBySearchString(searchValue);
    }

    function getPersonsToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return PersonService.filterPersonsBySearchString(searchValue);
    }

    function getTranspondersToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return TransponderService.filterTransponderBySearchString(searchValue);
    }

    function cleanOutputTable(tablename) {
        var table = document.getElementById(tablename);
        var rowCount = table.rows.length;

        for (var index = 1; index < rowCount; ++index) {
            table.deleteRow(1);
        }
    }

    function refreshOutputTable() {
        $('#resultfieldperson').show();
        $('#resultfieldroom').show();
        $('#resultfieldtransponder').show();

        cleanOutputTable('personTable');
        cleanOutputTable('roomTable');
        cleanOutputTable('transponderTable');

        var rooms = getRoomsToDisplay();
        var persons = getPersonsToDisplay();
        var transponders = getTranspondersToDisplay();

        var roomTable = document.getElementById('roomTable');

        for (var i = 0; i < rooms.length; i++) {
            var id = rooms[i].id;
            var row = roomTable.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = rooms[i].number + (rooms[i].name ? ' (' + rooms[i].name + ')' : '');
            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Details');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + id);
            x.setAttribute('style', 'float: right;')
            x.onclick = (function(interne_id) {room_details(interne_id) }).bind(this, id);
            cell2.appendChild(x);
        }

        var personTable = document.getElementById('personTable');

        for (var i = 0; i < persons.length; ++i) {
            var id = persons[i].id;
            var row = personTable.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var name_str = persons[i].matrikelno ? persons[i].matrikelno : persons[i].company;
            name_str += '/ ' + persons[i].firstname + ' ' + persons[i].lastname 
            cell1.innerHTML = name_str;
            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Details');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + id);
            x.setAttribute('style', 'float: right;')
            x.onclick =  (function(interne_id) {person_details(interne_id) }).bind(this, id);
            cell2.appendChild(x);
        }

        var transponderTable = document.getElementById('transponderTable');

        for (var i = 0; i < transponders.length; ++i) {
            var id = transponders[i].id;
            var row = transponderTable.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = transponders[i].no;
            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Details');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + id);
            x.setAttribute('style', 'float: right;');
            x.onclick =  (function(interne_id) {transponder_details(interne_id) }).bind(this, id);
            cell2.appendChild(x);
        }
    }

    function person_details(guid) {
        window.location.href = 'person-detail.html?personid=' + guid;
    }

    function room_details(guid) {
        window.location.href = 'room-detail.html?roomid=' + guid;
    }

    function transponder_details(guid) {
        window.location.href = 'transponder-detail.html?transponderid=' + guid;
    }
});