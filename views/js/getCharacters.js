/*
	Launches when document is ready

	When an option is selected:
        Format the option to match file name
        Fetches all the characters corresponding to the option
        Displays them in order
        Shuffles the set to make them tournament ready

        When the 'bracketGeneration' button is clicked:
            Generate the bracket with tournament ready characters
        When clicked again:
            Resets the bracket


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
    
                        `<tr><td>${element}</td></tr>`
                        
                    );
                    
                });

                let characters = response;

                //Shuffles the array
                for (let i = characters.length - 1; i > 0; i--){

                    let n = Math.floor(Math.random() * ((i + 1) + 1));

                    let temp = characters[i];
                    characters[i] = characters[n];
                    characters[n] = temp;

                }

                window.teams = [];

                let top_size = 1;

                while (top_size < characters.length) {

                    top_size *= 2;
                    
                }

                let catchup_matches = characters.length - (top_size / 2);

                for (let i = 0; i < characters.length; i++) {

                    if (catchup_matches != 0) {

                        window.teams.push( [characters[i], characters[(i+1)]] );
                        i++;
                        catchup_matches--;
                        
                    } else {

                        window.teams.push( [characters[i], null] );

                    }

                }
    
            },
    
            error:function(response){
    
                $("#charactersList").html("Error");
    
            }
    
        });

        document.getElementById("bracketGenerationButtonName").innerText = 'Generate Bracket';
        
    });

});