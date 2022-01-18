/*
	Launches when sendCharactersToBracket function is called

    Returns an array of characters ready for bracket teams
*/
/*
	When a character set is selected

    Makes the 'generate bracket' button visible
*/

function sendCharactersToBracket() {

    let teams = [];
    let characters = [];

    //Pushes the checked characters to characters array
    $('#charactersList input[type=checkbox]').each(element => {

        if ($('#charactersList input[type=checkbox]')[element].checked) {

            characters.push($('input[type=checkbox]')[element].value);
            
        }

    });

    let nbOfCharacters = characters.length;

    if (nbOfCharacters > 1) {

        let i = nbOfCharacters;
        
        //Shuffles the characters array (Fisher–Yates shuffle)
        while (--i > 0) {

            let rand = Math.floor(Math.random() * (i+1));
    
            let temp = characters[rand];
            characters[rand] = characters[i];
            characters[i] = temp;
            
        }
    
        //Determines the max top size
        let top_size = 1;
    
        while (top_size < characters.length) {
    
            top_size *= 2;
            
        }
    
        //Determines how many catchup matches we need to get to a complete round
        let catchup_matches = characters.length - (top_size / 2);

        //Gets the player colors
        let playerOneColor = $('#playerOneColor')[0].value;
        let playerTwoColor = $('#playerTwoColor')[0].value;

        //Pendulum for character attribution
        let pendulum = true;

        if (Math.floor(Math.random() * 2) == 0) {

            pendulum = !pendulum;
            
        }

        //Takes characters and put them in a bracket ready array
        for (let i = 0; i < characters.length; i++) {

            let match = [];
            let color = [];

            if (catchup_matches != 0) {

                if (pendulum) {

                    color[0] = playerOneColor;
                    color[1] = playerTwoColor;
                   
                } else {

                    color[0] = playerTwoColor;
                    color[1] = playerOneColor;

                }

                match[0] = { 
                    name: characters[i], 
                    color: color[0]
                };

                match[1] = { 
                    name: characters[i+1], 
                    color: color[1]
                };

                i++;
                catchup_matches--;
  
            } else {

                if (pendulum) {

                    color[0] = playerOneColor;
                    
                } else {

                    color[0] = playerTwoColor;

                }

                match[0] = { 
                    name: characters[i], 
                    color: color[0]
                };

                match[1] = null;

                pendulum = !pendulum;
    
            }

            teams.push( match );
    
        }

    }

    return teams;
    
}

 $('#setName').on('select2:select', function (e) {

    document.getElementById('bracketGeneration').style.display='block';

}); 