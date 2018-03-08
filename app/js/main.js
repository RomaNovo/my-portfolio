function _q(select) {
	return document.querySelector(select);
}

function _qA(select) {
	return document.querySelectorAll(select);
}

/*------------------ Nav Menu ------------------*/

var 
	burger     = _q('.burger'),
	burgerElem = _qA('.burger__elem'),
	list       = _q('.nav__list');


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
	list.style.left = (burger.classList.contains('burger__open'))? '0px' : '-9999px';
});

window.onload = function() {
/* ============== FORM =================*/

 /*formName.addEventListener('input', function() {
 	if(this.value.length>0){
 		labelText.style.opacity = '1';
 	} else {
 		labelText.style.opacity = '0';
 	}
 })

 formEmail.addEventListener('input', function() {
 	if(this.value.length>0){
 		labelEmail.style.opacity = '1';
 	} else {
 		labelEmail.style.opacity = '0';
 	}
 })

 formArea.addEventListener('input', function() {
 	if(this.value.length>0){
 		labelArea.style.opacity = '1';
 	} else {
 		labelArea.style.opacity = '0';
 	}
 })*/


 

/* ============== FORM-END =============*/


// ====== Triangle ======
var logo = _q('.logo');

function showLogo() {
	logo.style.opacity = '1';
}
setTimeout(showLogo, 2000);

//====== CANVAS =======

	var ctx1 = _q('.my_canvas1').getContext('2d'),
		ctx2 = _q('.my_canvas2').getContext('2d'),
		ctx3 = _q('.my_canvas3').getContext('2d'),
		ctx4 = _q('.my_canvas4').getContext('2d'),
		ctx5 = _q('.my_canvas5').getContext('2d'),
		ctx6 = _q('.my_canvas6').getContext('2d'),
		ctx7 = _q('.my_canvas7').getContext('2d'),
		ctx8 = _q('.my_canvas8').getContext('2d'),
		ctx9 = _q('.my_canvas9').getContext('2d');
			
	function test(obj,persent) {
		var al = 0;
		var start = 4.72;
		var cw = obj.canvas.width;
		var ch = obj.canvas.height;
		var diff;
		function progressSim() {
			
			diff = ((al / 100) * Math.PI*2*10).toFixed(2);
			obj.clearRect(0, 0, cw, ch);
			obj.lineWidth = 10;
			obj.fillStyle = '#2c3e50'; // persent color;
			obj.strokeStyle = "#2c3e50";	
			obj.textAlign = 'center';
			obj.fillText(al + '%', cw*.5, ch*.5+2, cw);
			obj.beginPath();

			obj.arc(60,60,55, start, diff/10+start, false);
			
			
				
			obj.stroke();	// вывод на экран
			if(al >= persent) {
				clearTimeout(sim);
			}
			al++;
		}
		var sim = setInterval(progressSim, 15);
	}

var skills = _q('#skills');

var heightSkills = skills.offsetTop;

var scrol = window.pageYOffset;
var count = 0;	
	if(scrol + 200 > heightSkills) {
	test(ctx1,65);
	test(ctx2,80);	
	test(ctx3,85);
	test(ctx4,90);
	test(ctx5,100);
	test(ctx6,75);
	test(ctx7,85);
	test(ctx8,90);	
	test(ctx9,99);
	count++;
	}


window.addEventListener('scroll', function() {
	var scrol = window.pageYOffset;
	if(count > 0) return;
	if(scrol + 200 > heightSkills) {
	test(ctx1,65);
	test(ctx2,80);	
	test(ctx3,85);
	test(ctx4,90);
	test(ctx5,100);
	test(ctx6,75);
	test(ctx7,85);
	test(ctx8,90);	
	test(ctx9,99);
	count++;
	}	
})


		

	

	// ======== CANVAS END ==================

	// ======== SCROOL CONTROL ==============

	var navMenu = _q('.nav'),
		aboutD  = _q('.about__descr'),
		height = navMenu.offsetTop;

	
	window.addEventListener('scroll', function() {
		var scrollTop = document.documentElement.scrollTop;
		/*console.log(scrollTop,height);*/
		
		if( height < scrollTop) {
			navMenu.classList.add('nav_fixed');
		    aboutD.style.paddingTop = '68px';
			console.log(height)
			
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
			console.log(blockHeight, scroll);

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
	})
}

/*===================== Dynamic block ==================*/

/*var skills = _q('#skills');
console.log(skills);
var heightSkills = skills.offsetTop;
console.log(heightSkills);
var scrol = window.pageYOffset;
console.log(scrol);
window.addEventListener('scroll', function() {
	if(scrol > heightSkills) {

	}
})*/