//init varible for selcted searchby
var searchfor = "Person";

//search-by function
$(document).ready( function() { 
            // Example Data
            $("#roomdetailTable").find('tbody')
            .append($('<tr>')
            .append($('<td>')
            .text("Leopold Junkers"))
            .append($('<td>')
            .text("Prof. Dr. Bente"))
            .append($('<button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-success delete" id=DYNAMIC>')
            .text("Ausleihen"))
          );

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
        $('#searchbuttonTransponder').click(function () {
            $("#resultfieldtransponder").show();
        });

        $('#searchbuttonroomdetail').click(function () {
    
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