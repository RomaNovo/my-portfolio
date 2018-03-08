
	function _(id){ return document.getElementById(id); }
	function _q(select) {return document.querySelector(select);}

	var formName = _q('.input[type=text]');
	var formEmail = _q('.input[type=email]');
	var formArea = _q('.textarea');
	var labelText = _q('#label-text');
	var labelEmail = _q('#label-email');
	var labelArea = _q('#label-area');
	var form = _q('#form');

	function clear() {
			_q('.input[type=text]').value = '';
			_q('.input[type=email]').value = '';
			_q('.textarea').value = '';
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
								var btnMessage = _('field__error_button');
								btnMessage.style.display = 'block';
								clear();
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
