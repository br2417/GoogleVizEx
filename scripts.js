/**
 * @author
 */

	console.log("hi there"); 
	
	function pageLoaded(){
		
		console.log("got to page Loaded")
		
		//load the google visualization library 
		google.load("visualization", "1", {packages:["corechart"]});

		
	}
	
	$(document).ready(pageLoaded);
