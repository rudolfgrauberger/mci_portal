//init varible for selcted searchby
var searchfor = "Person";

//search-by function
$(document).ready( function() { 
    $('#generalsearchbutton').click(function () {

        if(searchfor == "Person"){
            //alert("suche Person");
            $("#resultfieldroom").hide();
            $("#resultfieldtransponder").hide();
            $("#resultfieldperson").show();
        }

        if(searchfor == "Raum"){
            //alert("suche raum");
            $("#resultfieldperson").hide();
            $("#resultfieldtransponder").hide();
            $("#resultfieldroom").show();
        }

        if(searchfor == "Transponder"){
            $("#resultfieldperson").hide();
            $("#resultfieldroom").hide();
            $("#resultfieldtransponder").show();
        }      
        });
  

        $('#searchbuttonPersons').click(function () {
            $("#resultfieldperson").show();
        });

        $('#searchbuttonRooms').click(function () {
            $("#resultfieldroom").show();
        });

        $('#searchbuttonTransponder').click(function () {
            $("#resultfieldtransponder").show();
        });
    });
    


    $(function(){
        $(".dropdown-menu li a").click(function(){
            searchfor = this.text
    
          //set dropdownbutton text to selected
          $(".dropdown-toggle:first-child").text($(this).text());
          $(".dropdown-toggle:first-child").val($(this).text());

          //hide all resultfields
          $("#resultfieldperson").hide();
          $("#resultfieldroom").hide();
          $("#resultfieldtransponder").hide();
    
       });
    
    });