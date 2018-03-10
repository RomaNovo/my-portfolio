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