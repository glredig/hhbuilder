var hhbuilder = (function() {
	var relatives = {},
		relatives_list,
		JSON_display,
		age_input,
		relationship_input,
		smoker_input;

	function init() {
		JSON_display = document.querySelectorAll('.debug')[0];
		buildList();
		setupListeners();
	}

	function buildList() {
		var header = document.createElement('li');
		relatives_list = document.createElement('ul');
		relatives_list.style.listStyleType = 'none';
		document.body.appendChild(relatives_list);
		relatives_list.style.width = '600px';
		header.innerHTML = '<div style="width: 20%; display: inline-block; text-align: center;">Age</div>';
		header.innerHTML += '<div style="width: 40%; display: inline-block; text-align: center;">Relationship</div>';
		header.innerHTML += '<div style="width: 30%; display: inline-block; text-align: center;">Smoker?</div>';
		header.innerHTML += '<div style="width: 10%; display: inline-block; text-align: center;">Delete</div>';
		header.style.fontWeight = 'bold';
		relatives_list.appendChild(header);
	}

	function addRelative(data) {
		var rel = new Relative.Relative({
			relationship: data.relationship,
			age: data.age,
			smoker: data.smoker,
			id: Utils.generateID(),
			destroy: removeRelative
		})

		rel.init();
		relatives[rel.id] = rel;
		relatives_list.appendChild(rel.container);

		clearForm();
	}

	function removeRelative(id) {
		if (relatives[id] !== undefined) {
			relatives_list.removeChild(relatives[id].container);
			delete relatives[id];
		}
	}

	function setupListeners() {
		var add_btn = document.querySelectorAll('.add')[0],
			submit_btn = document.querySelectorAll('button[type=submit]')[0],
			form = document.getElementsByTagName('form')[0];

		relationship_input = form.elements['rel'];
		age_input = form.elements['age'];
		smoker_input = form.elements['smoker'];

		add_btn.addEventListener('click', function(e) {
			e.preventDefault();
			if (!Utils.validateForm()) {
				return false;
			}
			else {
				addRelative({
					relationship: relationship_input.options[relationship_input.selectedIndex].value,
					age: age_input.value,
					smoker: smoker_input.checked
				});
			}
		});

		submit_btn.addEventListener('click', function(e) {
			e.preventDefault();
			toDataObj();
		});
	}

	function clearForm() {
		age_input.value = '';
		smoker_input.checked = false;
		relationship_input.selectedIndex = 0;
	}

	function toDataObj() {
		var compiled = [];

		for (var obj in relatives) {
			compiled.push({
				"relationship": relatives[obj]["relationship"],
				"age": relatives[obj]["age"],
				"smoker": relatives[obj]["smoker"]
			});
		}
		JSON_display.innerText = JSON.stringify(compiled, null, 2);
		JSON_display.style.display = 'block';
	}

	return {
		init: init
	}
})();

(function() {
	hhbuilder.init();
})();