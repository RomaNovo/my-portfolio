function _q(select) {
	return document.querySelector(select);
}

function _qA(select) {
	return document.querySelectorAll(select);
}

let condt = true; 
let _ = (events, target, func) => {
  events.split(' ').forEach((event) => {
    document.addEventListener(event, (e) => {
      [...document.querySelectorAll(target)].forEach((item) => {
        let element = e.target;
        if (item == element)
          return func(e, element);
        else{
          while(element.parentElement){
            if (item == element){
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

_('input', '[data-type]', (e, el) => {
  let input = el;
  if (types[el.dataset.type].test(el.value)){
    input.classList.add('valid');
    input.classList.remove('form__input_novalid');
  }
  /*else input.classList.add('form__input_novalid');*/
});


let validate = (form) => {
  let inputs = [...form.querySelectorAll('[data-type]')];
  let passed = true;
  let password;
  
  inputs.forEach((item) => {
    
    if (item.dataset.type == 'password') password = item.value;
    if ((types[item.dataset.type] && types[item.dataset.type].test(item.value)) || (item.value == password && item.value != '')){
      item.classList.remove('form__input_novalid');
    }
    else{
      passed = false;
      item.classList.add('form__input_novalid');
    }
  });

  return passed;
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
})


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

		 		/*if (timer) clearTimeout(timer);*/
		 		timer = setTimeout(function() {
		 			preloader.style.transform = 'scale(10)';
		 			preloader.style.opacity = '0';
		 		},1400);
		 	
		 		/*if (timer) clearTimeout(timer);*/
		 		timer = setTimeout(function() {
				document.body.style.overflow='visible';
		 			
		 			/*triangleOdd.forEach( item => {
		 				item.style.animationDelay = `${delay}ms`;
		 			});
		 			triangleEven.forEach( item => {
		 				item.style.animationDelay = `${delay}ms`;
		 			});
		 			logoAnimation.style.animationDelay = `${delay}ms`;*/
		 			preloader.remove();
		 			resolve();
		 			
		 		},1500);
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
		 		/*clearInterval(interval);*/
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
		 		console.log(line.style.width);
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

	
 function init() {
let preloader = document.querySelector('.preloader');

if(!condt) {
	preloader.remove();
}
condt = false;

/*--------------------------- Preloader ------------------------------*/


 	
 	
/*----------------------- Preloader END -----------------------*/	
 	/*let langItemUk = document.querySelectorAll('.lang__item')[0],
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
 	});*/

 	let langGroup = _q('.lang__group');
 	langGroup.addEventListener('click', (e)=> {
 		langGroup.querySelectorAll('.lang__icon').forEach( item => {
 			item.classList.remove('lang__icon_active');
 		})
 		console.log(e.target)
 		/*changeLang(`data-${e.target}`);*/
 		if( e.target.parentNode == e.currentTarget) {
 			console.log(e.target.firstElementChild)
 			e.target.firstElementChild.classList.add('lang__icon_active');
 			changeLang(`data-${e.target.dataset.lang}.json`);
 		} else {
 			console.log(e.target.parentNode.firstElementChild)
 			e.target.parentNode.firstElementChild.classList.add('lang__icon_active');
 			changeLang(`data-${e.target.parentNode.dataset.lang}.json`);
 		}
 	})


    
 	/*---------------------------- Canvas -------------------------*/

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

 	
	/*------------------ Nav Menu ------------------*/

	let
		burger     = _q('.burger'),
		burgerElem = _qA('.burger__elem'),
		menuList   = _q('.nav__menu');


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
	
	let logo = _q('.logo');
	
	function showLogo() {
		logo.style.opacity = '1';
	}

	setTimeout(showLogo, 2000);
	
	// ====== LogoEnd ======
	
	// ======== SCROOL CONTROL ==============

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

	// ========== SCROOL NAVIGATION ============

	let link = document.querySelectorAll('.nav__link');

	for(let i = 0; i < link.length; i++) {
		let scroll, blockHeight;

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

	/*============= WATCHING TAB =================*/

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


/*------------------------- Form -----------------------*/

/*function _(id){ return document.getElementById(id); }
function _q(select) {return document.querySelector(select);}

var formName = _q('.input[type=text]');
var formEmail = _q('.input[type=email]');
var formArea = _q('.textarea');
var labelText = _q('#label-name');
var labelEmail = _q('#label-email');
var labelArea = _q('#label-area');
var form = _q('#form');

function clear() {
=======
	function _(id){ return document.getElementById(id); }
	function _q(select) {return document.querySelector(select);}
	
	let formName = _q('.input[type=text]'),
		formEmail = _q('.input[type=email]'),
		formArea = _q('.textarea'),
		labelText = _q('#label-name'),
		labelEmail = _q('#label-email'),
		labelArea = _q('#label-area'),
		form = _q('#form');
	
	function clear() {
>>>>>>> preloader
		formName.value = '';
		formEmail.value = '';
		formArea.value = '';
		labelText.style.opacity = '0';
		labelEmail.style.opacity = '0';
		labelArea.style.opacity = '0';
	}

	function submitForm(){
		_("submit").disabled = true;
	
		let Formdata = new FormData();
	
		Formdata.append( "n", _q('.input[type=text]').value );
		Formdata.append( "e", _q('.input[type=email]').value );
		Formdata.append( "m", _q('.textarea').value );
		
		var ajax = new XMLHttpRequest();
	
		ajax.open( "POST", "example_parser.php" );
	
		ajax.onreadystatechange = function() {
		
			if(ajax.readyState == 4 && ajax.status == 200) {
				if(ajax.responseText == "success"){
					setTimeout(function() {
						let btnMessage = _('field__error_button');
						btnMessage.style.display = 'block';
						clear();	
					}, 1000);		
				}
			}
		}
	
		ajax.send(Formdata);
	}


<<<<<<< HEAD
var formBtn = document.querySelector('#submit');
formBtn.addEventListener('click', submitForm);
*/

form.addEventListener('input', function(e) {

	var row = e.target;
	var bibik = document.getElementById('label-' + row.dataset.target)
	if(row.value.length > 0) {
		
		bibik.style.opacity = '1';
	} else {
		bibik.style.opacity = '0';
	}

})

let _ = (events, target, func) => {
  events.split(' ').forEach((event) => {
    document.addEventListener(event, (e) => {
      [...document.querySelectorAll(target)].forEach((item) => {
        let element = e.target;
        if (item == element)
          return func(e, element);
        else{
          while(element.parentElement){
            if (item == element){
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

let types = {
  'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  'phone': /^\+([0-9]|\(|\)|.)+$/,
  'text': /.+/,
}

_('input', '[data-type]', (e, el) => {
  let input = el;
  if (types[el.dataset.type].test(el.value)){
    input.classList.add('valid');
    input.classList.remove('form__input_novalid');
  }
  /*else input.classList.add('form__input_novalid');*/
});

var formBtn = document.querySelector('#submit');
formBtn.addEventListener('click', submitForm);

let validate = (form) => {
  let inputs = [...form.querySelectorAll('[data-type]')];
  let passed = true;
  let password;
 	inputs.forEach(item => {
 		console.log(item)
 	})
  inputs.forEach((item) => {
    
    if (item.dataset.type == 'password') password = item.value;
    if ((types[item.dataset.type] && types[item.dataset.type].test(item.value)) || (item.value == password && item.value != '')){
      item.classList.remove('form__input_novalid');
    }
    else{
      passed = false;
      item.classList.add('form__input_novalid');
    }
  });

  return passed;
};

function submitForm(form) {
 
  var formData = new FormData();

  if (validate(form)){

    [...form.querySelectorAll('[data-id]')].forEach(item => {
      formData.append(item.dataset.id, item.value);
    });
    fetch('example_parser.php', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData,
      credentials: 'same-origin'
    })
   /* .then(resp => resp.json())
    .then(resp => {
      if (typeof(resp) != 'object') resp = JSON.parse(resp);
      let status = resp.status;
    })*/
  } 
}

	 [...document.querySelectorAll('.submit')].forEach(item => {

    	item.addEventListener('click',  function(event) { 
    		
    	  event.preventDefault();
    	  if(item.parentElement.parentElement.nodeName === 'FORM') {
    	     submitForm(item.parentElement.parentElement)

    	  } /*else if ( item.parentElement.nodeName === 'FORM' && item.previousElementSibling.classList.contains('active')) {
    	    submitForm(item.parentElement)	    
    	  }*/    
    	});
  	})

	form.addEventListener('input', function(e) {
		let row = e.target;
		let bibik = document.getElementById('label-' + row.dataset.target)
		if(row.value.length > 0) {	
			bibik.style.opacity = '1';
		} else {
			bibik.style.opacity = '0';
		}
	});


	let formBtn = document.querySelector('#submit');
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








