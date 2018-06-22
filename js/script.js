var searchfor = "Person";
$(document).ready( function() { 
    $('#searchbutton').click(function () {
        var input = (document.getElementById("searchInput").value);
       // alert(document.getElementById("searchInput").value);
        if(searchfor == "Person"){
            //alert("suche Person");
            $("#resultfieldroom").hide();
            $("#resultfieldperson").show();
        }

        if(searchfor == "Raum"){
            //alert("suche raum");
            $("#resultfieldperson").hide();
            $("#resultfieldroom").show();
        }

        if(searchfor == "Transponder"){
            alert("suche Transponder");
        }




        
});

 $('body').on('click', 'button.delete', function() {
        document.getElementById("dataTable").deleteRow(1);
        
    });
    });

    $(function(){

        $(".dropdown-menu li a").click(function(){
            //alert(this.text);
            searchfor = this.text
    
          $(".dropdown-toggle:first-child").text($(this).text());
          $(".dropdown-toggle:first-child").val($(this).text());
    
       });
    
    });