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
  
        for (var i = 0; i < persons.length; i++) {
            var id = persons[i].id;
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = persons[i].matrikelno ? persons[i].matrikelno : persons[i].company;
            cell2.innerHTML = persons[i].firstname + " " + persons[i].lastname;
            var x = document.createElement("INPUT");
            x.setAttribute("type", "button");
            x.setAttribute("value", "Details");
            x.setAttribute("class", "btn btn-success");
            x.setAttribute("id", "details_" + id);
            x.onclick = (function(interne_id) {person_details(interne_id) }).bind(this, id);
            cell3.appendChild(x);
        }
    }
    
    function person_details(guid) {
        window.location.href = 'person-detail.html?personid=' + guid;
    }
});