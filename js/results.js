'use strict'
 function set_results(){
	 var strResults = document.getElementById('textbox-results').value ;
	 
 if (strResults=="Enter Results") {
       strResults = prompt("Enter Results", "Enter Results");
    }
 // g_strActivity = strResults;  
  document.getElementById('textbox-results').value = strResults;
  }