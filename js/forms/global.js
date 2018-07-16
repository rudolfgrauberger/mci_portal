'use strict'

$(document).ready(function () {

    $('#logoutButton').click(function () {
        SessionService.setCurrentSession(null);
        window.location.assign('login.html');
    });
});

function newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
       return v.toString(16);
    });
 }

 /*
  - Ignores upper and lower case
  - Ignores dot
*/
 function searchEqualityCompare(attribute, searchString) {
     attribute = attribute.replace('.', '');
     searchString = searchString.replace('.', '');
     return attribute.search(new RegExp(searchString, 'i')) !== -1;
 }