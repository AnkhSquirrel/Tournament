/*
	Launches when document is ready and introduction box is clicked

    Closes the box
*/

$(document).ready(function() {

    $('#introductionCloseButton')[0].onclick = function(){

        document.getElementById('introduction').style.display='none';
    
    }; 

});