



	var gg = document.getElementById('content').innerHTML;

		var x = function() {
			
			return function() {
				return gg;
			}
		}

	function lang(json) {
		var source = null;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', json, false);
		xhr.send();

		if(xhr.status == 200) {
			data = JSON.parse(xhr.responseText);
		}

		 source = x()();
		
		var template = Handlebars.compile(source);
		var html = template(data);
		var body = document.body;
			body.innerHTML = html;
	}
	
	lang('data-ru.json');
	
	var langItem = document.querySelectorAll('.lang__item')[0];
		
	langItem.addEventListener('click', function() {
		 lang('data-uk.json');
	})
