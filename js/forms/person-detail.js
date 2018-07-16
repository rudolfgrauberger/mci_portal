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
            document.getElementById('searchbuttonRoom').click();
        }
    });

    let searchParams = new URLSearchParams(window.location.search);

    var currentPerson = PersonService.getPersonById(searchParams.get('personid'));

    $('#personDetailName').text(currentPerson.firstname + ' ' + currentPerson.lastname);
    $('#personDetailNumber').text(currentPerson.matrikelno ? currentPerson.matrikelno : currentPerson.company);

    refreshOutputTable();

    $('#searchbuttonRoom').click(function () {
        refreshOutputTable();
    });

    function getPermissionToDisplay() {
        var searchValue = document.getElementById('searchInput').value;

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
        $('#resultfieldperson').show();
        cleanOutputTable();
        var permissions = getPermissionToDisplay();

        var table = document.getElementById('permissionTable');

        for (var i = 0; i < permissions.length; i++) {
            var transponderID = permissions[i].transponder;
            var rooms = RoomService.filterRoomsByTransponder(permissions[i].transponder);
            var transponder = TransponderService.getTransponderById(permissions[i].transponder);
            var manager = UserService.getUserById(permissions[i].manager);
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = transponder.no;

            var selectedRooms = rooms.map(x => {
                var name = x.name ? '(' + x.name + ')' : '';
                return x.number + name;
            });

            cell2.innerHTML = selectedRooms.join(', ');

            cell3.innerHTML = UserService.getUserInfoAsString(manager);

            var cell4 = row.insertCell(3);

            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Ausleihen');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + transponderID);
            x.setAttribute('style', 'float: right;');
            x.onclick = (function(interne_id) {lent(interne_id) }).bind(this, transponderID);
            cell4.appendChild(x);
        }
    }

    function lent(guid) {

        JavaScript.load("js/signature-pad.js");

        alert(guid);
    }
});

var JavaScript = {
    load: function(src, callback) {
      var script = document.createElement('script'),
          loaded;
      script.setAttribute('src', src);

      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };