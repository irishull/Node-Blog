
function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function doSomeLongShit() {
	return new Promise(function(resolve, reject){
		sleep(5000);
		console.log("done");
		resolve();
	});
}

doSomeLongShit();
console.log("I need to do this shit asap");