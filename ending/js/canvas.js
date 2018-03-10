
var colCanvas    = _qA('.progress__canvas'),
 	arrCanvas    = [];
 	skills 	     = _q('#skills'),
 	heightSkills = skills.offsetTop,
 	scroll       = window.pageYOffset,
 	count        = 0;

function showCanvas() {
	colCanvas.forEach(function(v,i) {
		var progress = v.dataset.progress;
		arrCanvas[i] = v.getContext('2d');
		drawCanvas(arrCanvas[i], progress);
	})
}

function drawCanvas(context,persent) {
	var al = 0,
		start = 4.72,
	    cw = context.canvas.width,
		ch = context.canvas.height,
		diff;

	function progressSim() {

		diff = ((al / 100) * Math.PI*2*10).toFixed(2);
		context.clearRect(0, 0, cw, ch);
		context.lineWidth   = 10;
		context.fillStyle   = '#2c3e50'; ;
		context.strokeStyle = "#2c3e50";	
		context.textAlign   = 'center';
		context.font        = "13px tahoma";
		context.fillText(al + '%', cw*.5, ch*.5+2, cw);
		context.beginPath();
		context.arc(60,60,55, start, diff/10+start, false);				
		context.stroke();

		context.beginPath();
		context.arc(60,60,55,4.72,3.5*Math.PI);
		context.globalCompositeOperation = 'destination-over';
		context.lineWidth   = 10;
		context.strokeStyle = 'white';	
		context.stroke();

		if (al >= persent) {
				clearTimeout(sim);
			}
			al++;
		}
		var sim = setInterval(progressSim, 15);
	}

if (scroll + 200 > heightSkills) {
	showCanvas();
	count++;
}

window.addEventListener('scroll', function() {
 	var scrol = window.pageYOffset;
	if (count > 0) return;
	if (scrol + 500 > heightSkills) {
		showCanvas();
		count++;
	}	
})