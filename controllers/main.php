<?php

//Import players
$file_name = 'SuperSmashBrosMelee';
$players_import = file('.\\src\\players\\'.$file_name.'.txt', FILE_IGNORE_NEW_LINES);


// Variables
//Puts imported players to $players array, gives them id, name and eliminated keys, shuffles them
$players = array();
foreach ($players_import as $key => $value) {

    $players[$key]['id'] = $key;
    $players[$key]['name'] = $value;
    $players[$key]['eliminated'] = "no";

}
shuffle($players);
//Setup empty $matches array and bool $tournament_over
$matches = array();
$tournament_over = false;


//Function to setup contestants every round
function SetupContestants(): void{

    global $players;
    global $contestants;
    $contestants = array();
    $contestant_number = 0;

    for ($i=0; $i < count($players); $i++) { 

        if ($players[$i]["eliminated"] == "no") {

            $contestants[$contestant_number] = $players[$i];
            $contestant_number++;

        }

   }

}


//Function to setup the next matches
function MatchesAttribution(): void{

    global $tournament_over;
    global $contestants;
    global $matches;

    $matches = array();
    $match_number = 0;

    if (count($contestants) == 1) {

        $tournament_over = true;
    
    } else if (count($contestants) % 2 != 0) {

        $matches[$match_number] = array(
            $contestants[0],
            $contestants[1]
        );
    
    } else {

        for ($i=0; $i < count($contestants) ; $i+=2) { 

            $matches[$match_number] = array(
                $contestants[$i],
                $contestants[$i+1]
            );
            
            $match_number++;
    
        }

    }

}


//Function to eliminate players in current round
function MatchResults(): void{

    global $players;
    global $matches;

    for ($i=0; $i < count($matches) ; $i++) { 

        echo(PHP_EOL.'match n°'.$i.PHP_EOL);
        echo($matches[$i][0]['name']." VS ".$matches[$i][1]['name'].PHP_EOL);

        //Random winner
        $looser = rand(0, 1);

        for ($j=0; $j < count($players); $j++) { 

            if ($players[$j]['id'] == $matches[$i][$looser]['id']) {

                $players[$j]['eliminated'] = 'yes';

            };
            
        }
        
    }

}


//Launch the tournament
while ($tournament_over == false) {

    echo(PHP_EOL.PHP_EOL.'--- --- ---'.PHP_EOL);

    SetupContestants();

    MatchesAttribution();

    MatchResults();

    usleep(1000000);

}


echo(PHP_EOL.'---Tournament Over!---'.PHP_EOL);
echo('Winner is: '.$contestants[0]['name']);


?>