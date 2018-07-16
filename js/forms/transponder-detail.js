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
            document.getElementById('searchbuttontransponderdetail').click();
        }
    });

    function injectSignaturePad() {
        var scriptInit = document.createElement('script');
        scriptInit.setAttribute('src', 'js/signature-pad.min.js');
        document.getElementById('signatureBody').appendChild(scriptInit);
    }

    injectSignaturePad();


    let searchParams = new URLSearchParams(window.location.search);

    var currentTransponder = TransponderService.getTransponderById(searchParams.get('transponderid'));

    $('#transponderDetailNumber').text(currentTransponder.no);
    $('#transponderDetailName').text('');

    refreshOutputTable();

    $('#searchbuttontransponderdetail').click(function () {
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
        
        return PersonService.filterPersonsForTransponderAndBySearchString(currentTransponder, searchValue);
    }

    function cleanOutputTable() {
        var table = document.getElementById('transonderdetailTable');
        var rowCount = table.rows.length;

        for (var index = 1; index < rowCount; ++index) {
            table.deleteRow(1);
        }
    }

    function refreshOutputTable() {
        $('#resultfieldperson').show();
        cleanOutputTable();
        var persons = getPersonsToDisplay();

        var table = document.getElementById('transonderdetailTable');

        for (var i = 0; i < persons.length; i++) {
            var transponderID = currentTransponder.id;
            var permissions = PermissionService.getPermissionForPersonAndTransponder(persons[i].id, currentTransponder.id);
            var manager = permissions.manager ? UserService.getUserById(permissions.manager) : null;

            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = PersonService.getPersonInfoAsString(persons[i]);
            cell1.innerHTML += ' ('+(persons[i].matrikelno ? persons[i].matrikelno : persons[i].company)+')';
            
            if (manager) {
                cell2.innerHTML = UserService.getUserInfoAsString(manager);
            }
            var cell3 = row.insertCell(2);
            
            var x = document.createElement('INPUT');
            x.setAttribute('type', 'button');
            x.setAttribute('value', 'Ausleihen');
            x.setAttribute('class', 'btn btn-success');
            x.setAttribute('id', 'details_' + transponderID);
            x.setAttribute('style', 'float: right;');
            x.setAttribute('data-toggle', 'modal');
            x.setAttribute('data-target', '#lentModal');
            cell3.appendChild(x);
        }
    }
});