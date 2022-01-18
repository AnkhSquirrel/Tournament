/*
	Launches when document is ready

	Fetches the list of sets
    Format each file name
    Adds each set as an option
*/

$(document).ready(function() {

    $.ajax({
        
        url:'/controller/listOfSets.php',

        success:function(response){	

            try {

                JSON.parse(response).forEach(element => {

                    let setTitle = element
                        .replace(".txt", "")
                        .replace(/_/g, " ")
                        .replace(/˸/g, ":");
                    let newSet = new Option(setTitle, setTitle, false, false);
                    $("#setName").append(newSet).trigger('change');

                });
                
            } catch (error) {

                console.log(error);
                
            }

        },

        error:function(response){

            console.log(response);

        }

    });

});