function _q(select) {
	return document.querySelector(select);
}

function _qA(select) {
	return document.querySelectorAll(select);
}

let _ = (events, target, func) => {
	events.split(' ').forEach((event) => {
		document.addEventListener(event, (e) => {
			[...document.querySelectorAll(target)].forEach((item) => {
				let element = e.target;
				if (item == element)
					return func(e, element);
				else {
					while (element.parentElement) {
						if (item == element) {
							return func(e, element);
						}
						else
							element = element.parentElement;
					}
				}
			});
			return false;
		});
	});
};

let condt = false; 

let content = document.getElementById('content').innerHTML;

function changeLang(json) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', json, false);
	xhr.send();

	if(xhr.status == 200) {
		data = JSON.parse(xhr.responseText);
	}

	source = content;
	
	let template = Handlebars.compile(source);
	let html = template(data);
	let body = document.body;
		body.innerHTML = html;
	init();
}

changeLang('data-ru.json');

/*--------------------------- Preloader ------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
	let promise = new Promise(function(resolve,reject) {
	let preloader = document.querySelector('.preloader');
	let counterHtml = preloader.querySelector('.preloader__counter');
	let counterText = counterHtml.textContent || counterHtml.innerText;
	let counterInt = parseInt(counterHtml.textContent || counterHtml.innerText);
	let preloaderContent = preloader.querySelector('.preloader__image');
	let line = preloader.querySelector('.preloader__line');
	let overlay = preloader.querySelector('.preloader__overlay');
	let allowed = 0;
	let timer;
	let triangleEven = document.querySelectorAll('.triangle__even');
	let triangleOdd = document.querySelectorAll('.triangle__odd');
	let logoAnimation = document.querySelector('.logo');
	let delay = 4125;
	let preloadCondition = 0;
			
	function preloaderScale() {
	 	timer = setTimeout(function() {
	 		preloader.style.transform = 'scale(10)';
	 		preloader.style.opacity = '0';

	 	},1500);	 
		timer = setTimeout(function() {	
			preloader.remove();
			document.body.style.overflow='visible';
	 		resolve();			
		},1800);

	}

	function showPic() {
		overlay.style.transition = 'width 1.5s';
		overlay.style.width = '0';
		if (timer) clearTimeout(timer);
		timer = setTimeout(function() {
			preloader.style.backgroundColor = 'black';
		},1500);
		return preloaderScale();
	}

	function readyForPic() {
		preloaderContent.style.opacity = '1';
		preloader.style.backgroundColor = 'black';
		setTimeout(function() {
			counterHtml.style.display = 'none';
			line.style.display = 'none';
		}, 500);
		return showPic();
	}

	function preloaderCount() {
		counterHtml.innerText = `${counterInt++}`;
		line.style.width = `${counterInt/10}%`;
		line.style.left = `${(100 - counterInt/10) / 2 + 0.8}%`;
	}

	if(preloadCondition == 0) {
		document.body.style.overflow='hidden';
		let interval = setInterval(function() {
			counterInt <= 100 ? preloaderCount() : allowed++;
			allowed === 1 ? readyForPic() : false;
		}, 20);
		preloadCondition++;
	} else {
		preloader.remove();
	}	 	
	});
	promise.then(function() {
		changeLang('data-ru.json');
	})	 	
})	
	/*----------------------- Preloader END -----------------------*/	
	
 function init() {
	let preloader = document.querySelector('.preloader');
	(!condt)? preloader.remove() : condt = false;

 	let types = {
 	  'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
 	  'phone': /^\+([0-9]|\(|\)|.)+$/,
 	  'text': /.+/,
 	}

 	let validate = (form) => {
 	  let inputs = [...form.querySelectorAll('[data-type]')];
 	  let passed = true;
 	  
 	  inputs.forEach((item) => {
 	    
 	    if (types[item.dataset.type] && types[item.dataset.type].test(item.value)) {
 	      item.classList.remove(`${item.nodeName.toLowerCase()}_novalid`);
 	    }
 	    else{
 	      passed = false;
 	      item.classList.add(`${item.nodeName.toLowerCase()}_novalid`);
 	    }
 	  });

 	  return passed;
 	};

 	function submitForm(form) {
 
 	  if (validate(form)){
 		let formData = new FormData();
 	    [...form.querySelectorAll('[data-id]')].forEach(item => {
 	      formData.append(item.dataset.id, item.value);
 	    });
 	
 	  let ajax = new XMLHttpRequest();
 	  
 	  ajax.open( "POST", "example_parser.php" );
 	  
 	  ajax.onreadystatechange = function() {
 	  
 	  	if(ajax.readyState == 4 && ajax.status == 200) {
 	  		if(ajax.responseText == "success"){
 	  			setTimeout(function() {
 	  				let btnMessage = _q('.field__error_button');
 	  				btnMessage.style.display = 'block';		
 	  			}, 1000);		
 	  		}
 	  	}
 	  }
 	  
 	  ajax.send(formData);
 	  } 
 	};

 	[...document.querySelectorAll('.submit')].forEach(item => {
 	  item.addEventListener('click',  function(event) { 
 	    event.preventDefault();
 	    if(item.parentElement.parentElement.nodeName === 'FORM') {
 	       submitForm(item.parentElement.parentElement)
 	    } else if ( item.parentElement.nodeName === 'FORM' && item.previousElementSibling.classList.contains('active')) {
 	      submitForm(item.parentElement)
 	    }    
 	  });
 	});

 	_('input', '[data-type]', (e, el) => {
 	  let input = el;
 	  if (types[el.dataset.type].test(el.value)){
 	    input.classList.add(`${input.nodeName.toLowerCase()}_novalid`);
 	    input.classList.remove(`${input.nodeName.toLowerCase()}_novalid`);
 	  }
 	  /*else input.classList.add('form__input_novalid');*/
 	});

 	form.addEventListener('input', function(e) {
 		let inputStyle = document.getElementById('label-' + e.target.dataset.target).style;
 		inputStyle.opacity = (e.target.value.length)? '1' : '0';
 	})

	
	
	/*----------------------- Change language ---------------------*/
 	let langGroup = _q('.lang__group');
 	langGroup.addEventListener('click', (e)=> {
 		langGroup.querySelectorAll('.lang__icon').forEach( item => {
 			item.classList.remove('lang__icon_active');
 		});
 				
 		( e.target.parentNode == e.currentTarget )? 
 			changeLang(`data-${e.target.dataset.lang}.json`) : 
 			changeLang(`data-${e.target.parentNode.dataset.lang}.json`);	
 	})
   /*----------------------- Change language ----------------------*/

 	/*------------------------- Canvas ----------------------------*/

 	let colCanvas    = _qA('.progress__canvas'),
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
 			let progress = v.dataset.progress;
 			arrCanvas[i] = v.getContext('2d');
 			drawCanvas(arrCanvas[i], progress);
 		})
 	}

 	function drawCanvas(context,persent) {
 		let al = 0,
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
 			let sim = setInterval(progressSim, 15);
 	}

	if (scrollCanvas + 200 > heightSkills) {	
	 	 showCanvas();
	 	 addCount(); 	 		
	}

	window.addEventListener('scroll', function() {
	 	let scrollingCanvas = window.pageYOffset;
	 	 
	 	if (count > 0) {
	 		return;
	 	} else if (scrollingCanvas + 500 > heightSkills) {
	 		showCanvas();
	 		setTimeout(addCount,0);
	 	}					
	});

	/*------------------------- Canvas END-------------------------*/

 	
	/*------------------------- Nav Menu --------------------------*/

	let
		burger     = _q('.burger'),
		burgerElem = _qA('.burger__elem'),
		menuList   = _q('.nav__menu');
	 	function burgerActive() {
		 burger.classList.toggle('burger__open');

		 if (burger.classList.contains('burger__open')) {
			 burgerElem.forEach(function (v) {
				 v.classList.add('burger__elem_open');
			 })
		 } else {
			 burgerElem.forEach(function (v) {
				 v.classList.remove('burger__elem_open');
			 })
		 }
		 menuList.style.left = (burger.classList.contains('burger__open')) ? '0px' : '-9999px';
	 }	
		
		burger.addEventListener('click', burgerActive)	;
				
		
		
		
	
	/*------------------------- Nav Menu END-----------------------*/

	/*------------------------- Logo ------------------------------*/
	
	let logo = _q('.logo');
	
	function showLogo() {
		logo.style.opacity = '1';
	}

	setTimeout(showLogo, 2000);

	/*------------------------- Logo END---------------------------*/
	
	/*------------------------- SCROOL CONTROL --------------------*/

	let navMenu = _q('.nav'),
		aboutD  = _q('.about__descr'),
		height = navMenu.offsetTop;

		let scrollTop = document.documentElement.scrollTop;

		if( height < scrollTop) {
			navMenu.classList.add('nav_fixed');
		    aboutD.style.paddingTop = '68px';					
		} else if( height > scrollTop){
			navMenu.classList.remove('nav_fixed');
			aboutD.style.paddingTop = '0';
		}

	window.addEventListener('scroll', function() {
		let scrollTop = document.documentElement.scrollTop;
				
		if( height < scrollTop) {
			navMenu.classList.add('nav_fixed');
		    aboutD.style.paddingTop = '68px';				
		} else if( height > scrollTop){
			navMenu.classList.remove('nav_fixed');
			aboutD.style.paddingTop = '0';
		}		
	});	
	/*----------------------- SCROOL CONTROL END -----------------*/

	/*----------------------- SCROOL NAVIGATION ------------------*/

	let link = document.querySelectorAll('.nav__link');

	for(let i = 0; i < link.length; i++) {
		let scroll, blockHeight;

		link[i].addEventListener('click', function() {
			event.preventDefault();
			burgerActive();
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
					scroll = scroll + 20;
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
					scroll = scroll - 20;
					timer = setTimeout(my_scrollUp, 5);
	 			}
	 			else {
	 				clearTimeout(timer);
	 				window.scrollTo(0,blockHeight);
	 			}
	 		}
		});
	}
	/*----------------------- SCROOL NAVIGATION END---------------*/

	/*----------------------- WATCHING TAB -----------------------*/

	let groupTab = document.querySelectorAll('header, section');
	function watchTab(v) {
		let scroll = window.pageYOffset;
		if(scroll + 100 >= v.offsetTop && scroll < v.offsetTop + v.offsetHeight - 100) {
			let id = v.getAttribute('id');
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
	/*----------------------- WATCHING TAB END--------------------*/
};









