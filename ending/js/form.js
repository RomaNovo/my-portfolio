
	function _(id){ return document.getElementById(id); }
	function _q(select) {return document.querySelector(select);}

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

	var formName   = _q('.input[type=text]');
	var formEmail  = _q('.input[type=email]');
	var formArea   = _q('.textarea');
	var labelText  = _q('#label-name');
	var labelEmail = _q('#label-email');
	var labelArea  = _q('#label-area');
	var form 	   = _q('#form');

	function clear() {
		formName.value  		 = '';
		formEmail.value 		 = '';
		formArea.value  		 = '';
		labelText.style.opacity  = '0';
		labelEmail.style.opacity = '0';
		labelArea.style.opacity  = '0';
	}

	/*function submitForm(){
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
	}*/
	
	/*form.addEventListener('input', function(e) {
		var row = e.target;
		var bibik = document.getElementById('label-' + row.dataset.target)
		if(row.value.length > 0) {
			
			bibik.style.opacity = '1';
		} else {
			bibik.style.opacity = '0';
		}

	})
*/
	/*var formBtn = document.querySelector('#submit');
	formBtn.addEventListener('click', submitForm);*/

	function submitForm(form) {
		alert('hi')
	  console.log(form)
	  var formData = new FormData();

	  if (validate(form)){

	    [...form.querySelectorAll('[data-id]')].forEach(item => {
	      formData.append(item.dataset.id, item.value)
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
	    .then(resp => resp.json())
	    .then(resp => {
	      if (typeof(resp) != 'object') resp = JSON.parse(resp);
	      let status = resp.status;
	      alert(status)
	    })
	  } 
	}

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
    		alert('ass')
    	  event.preventDefault();
    	  if(item.parentElement.parentElement.nodeName === 'FORM') {
    	  	alert('ee')
    	     submitForm(item.parentElement.parentElement)
    	  } else if ( item.parentElement.nodeName === 'FORM' && item.previousElementSibling.classList.contains('active')) {
    	    submitForm(item.parentElement)
    	    alert('ese')
    	  }    
    	});
  	})

