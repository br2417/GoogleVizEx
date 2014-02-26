/**
 * @author
 */

	console.log("hello there - this is to test the page"); 
	
		//UnemploymentData is the local name of the json file that will be loaded
	
	
	function JSONLoaded(UnemploymentData){
		
		console.log(UnemploymentData)
		
		//For our chart, we only want to use the "Observations" property of the JSON data file, which is an array of objects.
		//The below variable is what makes the selection; it basically means take UnemploymentData (which is the local name that stands for the
		// actual JSON data file: UEMP27...), and choose the observations object; this variable will be called ObservationsArray
		
		var ObservationsArray = UnemploymentData.observations; 
		
		//The way the Google Visualizations library wants to be 'fed' the data is as an array of arrays
		//However, the observations property within the JSON file that we are working with is formatted as an array of objects
		//We therefore have to convert the data into an array of arrays, so that the data can be successfully transformed into a Google Visualizations chart
		//Below I have created a variable called GoogleDataArray, which is basically the array that the data will be placed into
		
		var GoogleDataArray = [];
		
		//In order for the chart to show up on the page properly, I need to add headers
		//Headers always go on the first row
		//In order to create a header I have created the variable below called: FirstRowHeader
		//FirstRowHeader basically means/says: create a header array and push to GoogleDataArray
		
		var FirstRowHeader = ["Date", "Value"];
		GoogleDataArray.push(FirstRowHeader);
		
		//This is my for loop which I have created in order for the computer to loop through the JSON array - to create my array of arrays
		for(var i=0; i<ObservationsArray.length; i++){
			
		//The below variable creates a reference to current objects in the list
			var currentObject = ObservationsArray[i];
			
		//Within the JSON data file that we are using, we are only interested in two properties within the "observations" array of objects; 
		//these are the "date" and "value" properties. Both of these are formatted as strings (they are within "")
		//The Google Visualizations library wants the "value" key values to be formatted as numbers
		//Below I use the Number function (which bascially means/says: 'treat this as a number')
		//Should we wish to do the inverse process (conversion from numbers to string data types) we would write String, instead
		 
			var currentArray = [currentObject.date, Number(currentObject.value)];
			
		//GoogleDataArray is my array of arrays that we created above. What the below coding does is basically apply the Number function
		//to our array of arrays - so that within our newly reformatted array of arrays, we now have numbers instead of string type data
		//for our "value" entries
			
			GoogleDataArray.push(currentArray);
			
		} //This is end of for loop
		
		console.log(GoogleDataArray);
		
		//fed data to visualization library
		 var BennysDataTable = google.visualization.arrayToDataTable(GoogleDataArray);
		 
		 
		 //With Google Visualizations we have the option to customize our charts
		 //Below, I used the CustomChart variable to create an options object to add a title to the chart
		 
		 var CustomChart = {
          title: "This chart shows unemployment data since 1980"
        };


		//Below is where we finally tell the computer to create a line chart
		//We use a function that is part of the Google Visualizations library 
		//What makes the Google Visualizations library powerful is the fact that we can easily change the type of chart that visualizes 
		//our data by changing the LineChart part of the variable to BarChart, or ColumnChart etc..
		
		var BennysChart = new google.visualization.LineChart(document.getElementById("myGoogleChartDiv"));
  			BennysChart.draw(BennysDataTable, CustomChart);
   	
	}
	
	
	function GLibLoaded(){
		
		console.log("google loaded - this is to see if the GLibLoaded function has worked");
		
		// 
		$.get("UEMP270V_data.json", JSONLoaded, "json");
		
	}
	
	function pageLoaded(){
		
		console.log("got to page Loaded");
		
		//load the google visualization library 
		//added the callback - want the name of the callback function to be GLibLoaded
		
		google.load("visualization", "1", {packages:["corechart"], callback: "GLibLoaded"});

		
	}
	
	$(document).ready(pageLoaded);
