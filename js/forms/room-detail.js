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

    function injectSignaturePad() {
        var scriptInit = document.createElement('script');
        scriptInit.setAttribute('src', 'js/signature-pad.min.js');
        document.getElementById('signatureBody').appendChild(scriptInit);
    }

    injectSignaturePad();

    let searchParams = new URLSearchParams(window.location.search);

    var currentRoom = RoomService.getRoomById(searchParams.get('roomid'));

    $('#roomDetailNumber').text(currentRoom.number);
    $('#roomDetailName').text(currentRoom.name);

    refreshOutputTable();

    $('#searchbuttonroomdetail').click(function () {
        refreshOutputTable();
    });

    $( '#lentModal' ).on( 'keypress', function( e ) {
        if( e.keyCode === 13 ) {
            e.preventDefault();
            $('#transponderlent').click();
        }
    });

    $('#transponderlent').click(function() {

        var sigBody = document.getElementById('signatureBody');

        while (sigBody.hasChildNodes()) {   
            sigBody.removeChild(sigBody.firstChild);
        }

        injectSignaturePad();
        
        $('#lentModal').modal('toggle');
    });


    function getPersonsToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

        return PersonService.filterPersonsWithPermissionForRoomAndBySearchString(currentRoom, searchValue);
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
        var persons = getPersonsToDisplay();

        var table = document.getElementById('roomdetailTable');

        for (var i = 0; i < persons.length; i++) {
            var permissions = PermissionService.getPermissionForPersonAndRoom(persons[i].id, currentRoom);
            var manager = permissions.manager ? UserService.getUserById(permissions.manager) : null;
            var transponderID = permissions.transponder;

            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = persons[i].matrikelno ? persons[i].matrikelno : persons[i].company;
            var cell2 = row.insertCell(1);
            cell2.innerHTML = PersonService.getPersonInfoAsString(persons[i]);
            var cell3 = row.insertCell(2);
            if (manager) {
                cell3.innerHTML = UserService.getUserInfoAsString(manager);
            }

            var cell4 = row.insertCell(3);

            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Ausleihen');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('style', 'float: right;');
            x.setAttribute('id', 'details_' + transponderID);
            x.setAttribute('data-toggle', 'modal');
            x.setAttribute('data-target', '#lentModal');
            cell4.appendChild(x);
        }
    }
});