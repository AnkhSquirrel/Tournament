/*
	Launches when document is ready & bracketGeneration is clicked

	Creates the bracket
*/

$(document).ready(function() {

    $("#bracketGeneration").click(function(){   
        
        bracketData = {

            teams: sendCharactersToBracket(),
            results: []
    
        };

        function render_fn(container, data, score, state) {

            switch(state) {
    
                case "empty-bye":
                    container.append("No team");
                    return;
    
                case "empty-tbd":
                    container.append("Upcoming");
                    return;
            
                case "entry-no-score":
                case "entry-default-win":
                case "entry-complete":
                    container.append(

                        `<div class="` + data.color + `">` +
                        data.name + 
                        `</div>`

                    );
                    return;
    
            }
    
        }
    
        $('#bracket').bracket({
        
            init: bracketData,
            decorator: {
                edit: function edit_fn(){},
                render: render_fn
            },
            save: function(){},
            skipConsolationRound: true,
            disableToolbar: true,
    
        });

    });

});