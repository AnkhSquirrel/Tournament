/*
	Launches when document is ready

	When an option is selected:
        Format the option to match file name
        Fetches all the characters from the set
        Displays them in order as checkboxes
*/

$(document).ready(function() {

    $('#setName').select2({

        placeholder: 'Select a game...'

    }).on('select2:select', function (e) {
        
        $.ajax({
            
            url:'/controller/listOfCharactersInSet.php',
            type:'POST',
            dataType: 'json', 
            data: {
                setName : document.getElementById("setName").value
                    .replace(/ /g, "_")
                    .replace(/:/g, "˸")
                    .concat('.txt')
            },
    
            success:function(response){	
    
                $("#charactersList").html('');
    
                response.forEach(element => {
    
                    $("#charactersList").append(

                        `<input type="checkbox" id="` + `${element}` + `" value="` + `${element}` + `" class="characterCheckbox" checked>` +
                        `<label for="` + `${element}` + `">${element}` +
                        `<br>`

                    );
                    
                });

                $("#charactersList").append(

                    //`<button id="bracketGeneration">Generate Bracket</button>`

                );
    
            },
    
            error:function(response){
    
                $("#charactersList").html("Error");
    
            }
    
        });
        
    });

});