'use strict'

$(document).ready( function() {

    if (SessionService.getCurrentSession() === null) {
        window.location.href = 'login.html';
        return;
    }

    var input = document.getElementById('student-name');

    var persons = PersonService.getAllPersons();

    for (var personIndex = 0; personIndex < persons.length; ++personIndex) {
        var x = document.createElement('OPTION');
        x.setAttribute('value', persons[personIndex].id);
        x.textContent = PersonService.getPersonInfoAsString(persons[personIndex]);
        input.appendChild(x);
    }

    $('.combobox').combobox();

    var searchInput = document.getElementById('searchInput');

    // Execute a function when the user releases a key on the keyboard
    searchInput.addEventListener('keyup', function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            $('#searchbuttonrvroom').click();
        }
    });

    $( '#exampleModal' ).on( 'keypress', function( e ) {
        if( e.keyCode === 13 ) {
            e.preventDefault();
            $('#rvaddbuttonsave').click();
        }
    } );

    let searchParams = new URLSearchParams(window.location.search);

    var currentTransponder = TransponderService.getTransponderById(searchParams.get('transponderid'));

    $('#rvaddbuttonsave').click(function() {
        var personId = document.getElementById('student-name').value;
        var expires = document.getElementById('date-tex').value;

        var person = PersonService.getPersonById(personId);

        if (!person) {
            return;
        }

        $('#student-name').data('combobox').clearTarget();
        $('#student-name').data('combobox').clearElement();

        document.getElementById('date-tex').value = '';
        $('#exampleModal').modal('toggle');

        PermissionService.addPermissionForPersonToTransponder(person, currentTransponder, expires ? new Date(expires) : null);
        refreshOutputTable();
    });

    $('#exampleModal').on('shown.bs.modal', function(e) {
        $("#exampleModal :text").focus();
    });

    $('#transponderDetailNumber').text(currentTransponder.no);
    $('#transponderDetailName').text('');

    refreshOutputTable();

    $('#searchbuttonrvroom').click(function() {
        refreshOutputTable();
    });

    function getPermissionToDisplay() {
      var searchValue = document.getElementById('searchInput').value;

      return PermissionService.filterPermissionsForTransponder(currentTransponder, searchValue);
    }

    function cleanOutputTable() {
        var table = document.getElementById('rvpersonTable');
        var rowCount = table.rows.length;

       for (var index = 2; index < rowCount; ++index) {
           table.deleteRow(2);
       }
    }

    function refreshOutputTable() {
      cleanOutputTable();
      var permissions = getPermissionToDisplay();

      var table = document.getElementById('rvpersonTable');

      for (var i = 0; i < permissions.length; i++) {
          var id = permissions[i].id;
          var person = PersonService.getPersonById(permissions[i].person);
          var row = table.insertRow(2);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = person.matrikelno ? person.matrikelno : person.company;
          cell2.innerHTML = PersonService.getPersonInfoAsString(person);
          cell3.innerHTML = permissions[i].expires ? permissions[i].expires : 'unbegrenzt';
          var x = document.createElement('INPUT');
          x.setAttribute('type', 'button');
          x.setAttribute('value', 'Löschen');
          x.setAttribute('class', 'btn btn-success');
          x.setAttribute('id', 'permission_' + id);
          x.onclick = (function(permission_id) {remove_permission(permission_id) }).bind(this, id);
          cell4.appendChild(x);
    }
  }

  function remove_permission(newGuid) {
      PermissionService.removePermissionById(newGuid);
      refreshOutputTable();
  }
});