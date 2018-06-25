$(document).ready( function() {

    if (SessionService.getCurrentSession() == null) {
        window.location.href = 'login.html';
        return;
    }

    var searchInput = document.getElementById("searchInput");

    // Execute a function when the user releases a key on the keyboard
    searchInput.addEventListener("keyup", function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("searchbuttonPersons").click();
        }
    });


    refreshOutputTable();

    $('#searchbuttonPersons').click(function () {
        refreshOutputTable();
    });

    function getPersonsToDisplay() {
        var searchValue = document.getElementById("searchInput").value;
  
        return PersonService.filterPersonsBySearchString(searchValue);
    }

    function cleanOutputTable() {
        var table = document.getElementById('personTable');
        var rowCount = table.rows.length;
    
        for (var index = 1; index < rowCount; ++index) {
            table.deleteRow(1);
        }
    }

    function refreshOutputTable() {
        $("#resultfieldperson").show();
        cleanOutputTable();
        var persons = getPersonsToDisplay();
  
        var table = document.getElementById("personTable");
  
        for (i = 0; i < persons.length; i++) {
            var id = persons[i].id;
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = persons[i].matrikelno ? persons[i].matrikelno : persons[i].company;
            cell2.innerHTML = persons[i].firstname + " " + persons[i].lastname;
        }
    }
});