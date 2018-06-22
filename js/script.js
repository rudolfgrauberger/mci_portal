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

            // Example Data
            $("#personTable").find('tbody')
              .append($('<tr>')
              .append($('<td>')
              .text("11118686"))
              .append($('<td>')
              .text("Leopold Junkers"))
              .append($('<button type="button" onclick="location.href = \'person-detail.html\';" class="btn btn-success delete" id=change>')
              .text("Details"))
            );

            //var matr = document.getElementById("fname").value;
           //$(change).attr('id',matr); 
                       
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