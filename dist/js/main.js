var MY_RESUME = {};

(function($){

	MY_RESUME.contains = function(value1, value2){
		if(value1 === undefined || value2 === undefined){
			return false;
		}
		return value1.toLowerCase().indexOf(value2.toLowerCase()) != -1;
	}
 
	// replace the parameters in the string by the values
	// values : Array [value1, value2, ... value n]
	// parameters in string : $1, $2, ... $n
	MY_RESUME.replaceParameters = function(string, values){
		for (var i = 0; i < values.length; i++) {
			var parameterIndex = i+1;
			var parameter = '$' + parameterIndex;
			var value = values[i];
			string = string.replace(parameter, value);
		}
		return string;
	}
 
	$(document).ready(function() {
	
		var minWidth = 320;
		
		 

	    // Ascensorjs plugin call
			var ascensor = $('#ascensorBuilding').ascensor({
			                  ascensorFloorName:["MainInfo", "FitnessClub", "Strength", "Body"], 
							  direction: [[0,0],[0,1],[0,2],[0,3]],
							  childType: 'section',
							  time: 1000,
							  easing: 'easeInOutQuad'
							  });
			var ascensorInstance = $('#ascensorBuilding').data('ascensor');

			$(".ascensorLinkPrev").click(function() {
				ascensorInstance.prev();
			});
				
			$(".ascensorLinkNext").click(function() {
				ascensorInstance.next();
			});

	});

})(jQuery);


