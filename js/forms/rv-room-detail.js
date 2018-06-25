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
            document.getElementById("searchbuttonrvroom").click();
        }
    });

    let searchParams = new URLSearchParams(window.location.search);

    var currentRoom = RoomService.getRoomById(searchParams.get("roomid"));

    autocomplete(document.getElementById("student-name"), PersonService.getAllPersonsAsStringArray());

    $("#rvaddbuttonsave").click(function() {
        var personString = document.getElementById("student-name").value;
        var expires = document.getElementById("date-tex").value;

        var person = PersonService.getPersonByFirstNameLastNameAndAdditionalInformation(personString);

        PermissionService.addPermissionForPersonToRoom(person, currentRoom, expires ? new Date(expires) : null);
        refreshOutputTable();
        document.getElementById("student-name").value = '';
        document.getElementById("date-tex").value = '';
        $("#exampleModal").modal('toggle');
    });

    $("#roomDetailNumber").text(currentRoom.number);
    $("#roomDetailName").text(currentRoom.name);

    refreshOutputTable();

    $("#searchbuttonrvroom").click(function() {
        refreshOutputTable();
    });

    function getPermissionToDisplay() {
      var searchValue = document.getElementById("searchInput").value;

      return PermissionService.filterPermissionsForRoom(currentRoom, searchValue);
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

      var table = document.getElementById("rvpersonTable");

      for (i = 0; i < permissions.length; i++) {
          var id = permissions[i].id;
          var person = PersonService.getPersonById(permissions[i].person);
          var row = table.insertRow(2);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = person.matrikelno;
          cell2.innerHTML = person.firstname + " " + person.lastname + (person.company ? " (" + person.company + ")" : "");
          cell3.innerHTML = permissions[i].expires ? permissions[i].expires : "unbegrenzt";
          var x = document.createElement("INPUT");
          x.setAttribute("type", "button");
          x.setAttribute("value", "Löschen");
          x.setAttribute("class", "btn btn-success");
          x.setAttribute("id", "permission_" + id);
          x.onclick = (function(permission_id) {remove_permission(permission_id) }).bind(this, id);
          cell4.appendChild(x);
    }
  }

  function remove_permission(newGuid) {
      PermissionService.removePermissionById(newGuid);
      refreshOutputTable();
  }

  // Source: https://www.w3schools.com/howto/howto_js_autocomplete.asp
    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
            }
        }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
});