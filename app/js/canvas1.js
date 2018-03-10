var colCanvas = _qA('.my_canvas');
var arrCanvas = [];

colCanvas.forEach(function(v,i) {
	arrCanvas[i] = v.getContext('2d');
})

test.apply(arrCanvas);