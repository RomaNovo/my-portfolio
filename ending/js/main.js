function _q(select) {
	return document.querySelector(select);
}

function _qA(select) {
	return document.querySelectorAll(select);
}

var content = document.getElementById('content').innerHTML;

	/*var x = function() {
		
		return function() {
			return gg;
		}
	}*/

function changeLang(json) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', json, false);
	xhr.send();

	if(xhr.status == 200) {
		data = JSON.parse(xhr.responseText);
	}

	 source = content;
	
	var template = Handlebars.compile(source);
	var html = template(data);
	var body = document.body;
		body.innerHTML = html;
	load();
}

changeLang('data-ru.json');




 function load() {

 	var langItemUk = document.querySelectorAll('.lang__item')[0],
 		langItemUa = document.querySelectorAll('.lang__item')[1],
 		langItemRu = document.querySelectorAll('.lang__item')[2];
 		
 	langItemUk.addEventListener('click', function() {
 		 changeLang('data-uk.json');
 	});

 	langItemRu.addEventListener('click', function() {
 		 changeLang('data-ru.json');
 	});

 	langItemUa.addEventListener('click', function() {
 		 changeLang('data-ua.json');
 	});
 	
 	/*---------------------------- Canvas -------------------------*/

 	var colCanvas    = _qA('.progress__canvas'),
 	 	arrCanvas    = [];
 	 	skills 	     = _q('#skills'),
 	 	heightSkills = skills.offsetTop,
 	 	scrollCanvas = window.pageYOffset,
 	 	count        = 0;

	function addCount() {
		count++;
	}

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

	if (scrollCanvas + 200 > heightSkills) {	
	 	 		showCanvas();
	 	 		addCount(); 	 		
	}

	window.addEventListener('scroll', function() {
	 	var scrollingCanvas = window.pageYOffset;
	 	 
	 	if (count > 0) {
	 		return;
	 	} else if (scrollingCanvas + 500 > heightSkills) {
	 		showCanvas();
	 		setTimeout(addCount,0);
	 	}					
	});

 	
	/*------------------ Nav Menu ------------------*/

	var 
		burger     = _q('.burger'),
		burgerElem = _qA('.burger__elem'),
		menuList       = _q('.nav__menu');


	burger.addEventListener('click', function() {
		burger.classList.toggle('burger__open');

		if(burger.classList.contains('burger__open')) {
			burgerElem.forEach(function(v) {
				v.classList.add('burger__elem_open');
			})	
		} else {
			burgerElem.forEach(function(v) {
				v.classList.remove('burger__elem_open');
			})
		}	
		menuList.style.left = (burger.classList.contains('burger__open'))? '0px' : '-9999px';
	});
	

	// ====== Logo ======
	
	var logo = _q('.logo');
	
	function showLogo() {
		logo.style.opacity = '1';
	}

	setTimeout(showLogo, 2000);
	
	// ====== LogoEnd ======
	
	// ======== SCROOL CONTROL ==============

	var navMenu = _q('.nav'),
		aboutD  = _q('.about__descr'),
		height = navMenu.offsetTop;

		var scrollTop = document.documentElement.scrollTop;
		if( height < scrollTop) {
			navMenu.classList.add('nav_fixed');
		    aboutD.style.paddingTop = '68px';
			
			
		} else if( height > scrollTop){
			navMenu.classList.remove('nav_fixed');
			aboutD.style.paddingTop = '0';
		}
	

	window.addEventListener('scroll', function() {
		var scrollTop = document.documentElement.scrollTop;
		
		
		if( height < scrollTop) {
			navMenu.classList.add('nav_fixed');
		    aboutD.style.paddingTop = '68px';
			
			
		} else if( height > scrollTop){
			navMenu.classList.remove('nav_fixed');
			aboutD.style.paddingTop = '0';
		}		
	});	

	// ========== SCROOL NAVIGATION ============

	var link = document.querySelectorAll('.nav__link');

	for(var i = 0; i < link.length; i++) {
		var scroll, blockHeight;
		link[i].addEventListener('click', function() {
			event.preventDefault();
			scroll      = window.pageYOffset;
			blockHeight = document.querySelector(this.getAttribute('href')).offsetTop;

			if(scroll < blockHeight) {
				my_scrollDown();
			} else if(scroll > blockHeight) {
				my_scrollUp();
			}

			function my_scrollDown() {
	 			if(scroll	< blockHeight) {
	 				window.scrollTo(blockHeight, scroll);
					scroll = scroll + 50;
					timer = setTimeout(my_scrollDown, 5);
	 			}
	 			else {
	 				clearTimeout(timer);
	 				 window.scrollTo(0,blockHeight);
	 			}
	 		}

	 		function my_scrollUp() {
	 			if(scroll > blockHeight) {
	 				window.scrollTo(blockHeight, scroll );
					scroll = scroll - 50;
					timer = setTimeout(my_scrollUp, 5);
	 			}
	 			else {
	 				clearTimeout(timer);
	 				window.scrollTo(0,blockHeight);
	 			}
	 		}
		});
	}

	/*============= WATCHING TAB =================*/

	var groupTab = document.querySelectorAll('header, section');
	function watchTab(v) {
		var scroll = window.pageYOffset;
		if(scroll + 100 >= v.offsetTop && scroll < v.offsetTop + v.offsetHeight - 100) {
			var id = v.getAttribute('id');
			document.querySelector('[href="#' + id + '"]').classList.add('nav__link_active');
		}
	}

	groupTab.forEach(function(v) {
		watchTab(v);
	});

	window.addEventListener('scroll', function() {
		link.forEach(function(v) {
			v.classList.remove('nav__link_active');
		})
		groupTab.forEach(function(v) {
			watchTab(v);
		});
	});


/*------------------------- Form -----------------------*/
function _(id){ return document.getElementById(id); }
function _q(select) {return document.querySelector(select);}

var formName = _q('.input[type=text]');
var formEmail = _q('.input[type=email]');
var formArea = _q('.textarea');
var labelText = _q('#label-name');
var labelEmail = _q('#label-email');
var labelArea = _q('#label-area');
var form = _q('#form');

function clear() {
		formName.value = '';
		formEmail.value = '';
		formArea.value = '';
		labelText.style.opacity = '0';
		labelEmail.style.opacity = '0';
		labelArea.style.opacity = '0';
}

function submitForm(){
	_("submit").disabled = true;	
	var Formdata = new FormData();

	Formdata.append( "n", _q('.input[type=text]').value );
	Formdata.append( "e", _q('.input[type=email]').value );
	Formdata.append( "m", _q('.textarea').value );
	
	var ajax = new XMLHttpRequest();

	ajax.open( "POST", "example_parser.php" );

	ajax.onreadystatechange = function() {
	
		if(ajax.readyState == 4 && ajax.status == 200) {
						if(ajax.responseText == "success"){
							setTimeout(function() {
							var btnMessage = _('field__error_button');
							btnMessage.style.display = 'block';
							clear();	
						}, 1000);
							
						}
		}
	}
	ajax.send(Formdata);
}


form.addEventListener('input', function(e) {
	var row = e.target;
	var bibik = document.getElementById('label-' + row.dataset.target)
	if(row.value.length > 0) {
		
		bibik.style.opacity = '1';
	} else {
		bibik.style.opacity = '0';
	}

})

var formBtn = document.querySelector('#submit');
formBtn.addEventListener('click', submitForm);

};

/*var cors = document.querySelector('.cors');

cors.addEventListener('click', function() {
	var xdr = new XDomainRequest();
	xdr.onload = function() {
		var result = xdr.responseText;
		console.log(result);
	}
	xdr.open("GET", "http://klavogonki.ru/");
	xdr.send(null);
});*/

/*var cors = document.querySelector('.cors');
cors.addEventListener('click', function() {
	
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var request = new XHR();

	request.open("GET", "http://klavogonki.ru/",true);
        request.setRequestHeader("X-Uid", "123");
        request.setRequestHeader("X-Authorization", "2c9de507f2c54aa1");
        request.setRequestHeader("Access-Control-Expose-Headers", "X-Uid");
            request.onload = function() {
               alert('hi');
              var result =  this.responseText;
              console.log(result);
            }	
	
	request.send();
})*/








