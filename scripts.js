/**
 * @author
 */

	console.log("hi there"); 
	
	//UNEMPDATA is the local name of the json file I just loaded
	
	function dataLoaded(UNEMPDATA){
		
		console.log(UNEMPDATA)
		
		var myObsData = UNEMPDATA.observations; 
		
		///i am trying to construct an array of arrays
		
		var myDataArray = [];
		
		//?console log my DataArray
		
		//wait a second, I need headers in the first row
		//create a header array and push to 
		
		
		var headerArray = ["Date", "Value"];
		myDataArray.push(headerArray);
		
		
		
		//push always puts things onto the end of the array
		
		// specify starting point, ending point, 
		for(var i=0; i<myObsData.length; i++){
			
			//create reference to current object in list
			var currObj = myObsData[i];
			
			//below is the Number function, basically says 'treat this as a number.' If you need to make it a string, you would write String.
			var currArray = [currObj.date, Number(currObj.value)];
			
			//myDataArray is the array of arrays
			
			myDataArray.push(currArray);
			
		} //end of for loop
		
		console.log(myDataArray);
		
		//fed data to visualization library
		 var myDataTable = google.visualization.arrayToDataTable(myDataArray);
		 
		 
		 //create options object to actually customize the look of the chart
		 
		 var chartOptions = {
          title: "Unemployment since 1980"
        };


		//tell it to create a line chart
		var myChart = new google.visualization.LineChart(document.getElementById("myChartDiv"));
  			myChart.draw(myDataTable, chartOptions);
   	
	}
	
	
	function googleLoaded(){
		
		console.log("google loaded");
		
		// 
		$.get("UEMP270V_data.json", dataLoaded, "json");
		
	}
	
	function pageLoaded(){
		
		console.log("got to page Loaded");
		
		//load the google visualization library 
		//added the callback - want the name of the callback function to be googleLoaded
		
		google.load("visualization", "1", {packages:["corechart"], callback: "googleLoaded"});

		
	}
	
	$(document).ready(pageLoaded);
