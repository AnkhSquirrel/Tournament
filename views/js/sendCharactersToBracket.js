/*
	Launches when sendCharactersToBracket function is called

    Returns an array of characters ready for bracket teams
*/
/*
	When a character set is selected

    Makes the 'generate bracket' button visible
*/

function sendCharactersToBracket() {

    let characters=[];
    let teams = [];

    //Pushes the checked characters to characters array
    $('#charactersList input[type=checkbox]').each(element => {

        if ($('#charactersList input[type=checkbox]')[element].checked) {

            characters.push($('input[type=checkbox]')[element].value);
            
        }

    });

    let nbOfCharacters = characters.length;

    if (nbOfCharacters == 1) {

        teams.push( [characters[0], null] );
        
    } else {

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
    
        //Takes characters and put them in a bracket ready array
        for (let i = 0; i < characters.length; i++) {
    
            if (catchup_matches != 0) {
    
                teams.push( [characters[i], characters[(i+1)]] );
                i++;
                catchup_matches--;
                
            } else {
    
                teams.push( [characters[i], null] );
    
            }
    
        }

    }

    return teams;
    
}

 $('#setName').on('select2:select', function (e) {

    document.getElementById('bracketGeneration').style.display='block';

}); 