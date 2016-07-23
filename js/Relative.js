var Relative = (function() {
	
	function Relative(config) {
		this.relationship = config.relationship;
		this.age = config.age;
		this.smoker = config.smoker;
		this.id = config.id;
		this.removeFromParent = config.destroy;
	}

	Relative.prototype.init = function() {
		this.buildHTML();
		this.setupListener();

		return this.container;
	}

	Relative.prototype.buildHTML = function() {
		this.container = document.createElement('li');
		this.container.style.height = '35px';

		this.age_element = document.createElement('div');
		this.age_element.style.width = '20%';
		this.age_element.style.display = 'inline-block';
		this.age_element.style.lineHeight = '36px';
		this.age_element.style.textAlign = 'center';
		this.age_element.innerText = this.age;

		this.container.appendChild(this.age_element);

		this.relationship_element = document.createElement('div');
		this.relationship_element.style.width = '40%';
		this.relationship_element.style.display = 'inline-block';
		this.relationship_element.style.textAlign = 'center';
		this.relationship_element.style.lineHeight = '30px';
		this.relationship_element.innerText = this.relationship;

		this.container.appendChild(this.relationship_element);

		this.smoker_element = document.createElement('div');
		this.smoker_element.style.width = '30%';
		this.smoker_element.style.display = 'inline-block';
		this.smoker_element.style.textAlign = 'center';
		this.smoker_element.style.lineHeight = '30px';
		this.smoker_element.innerText = (this.smoker ? 'Yes' : 'No');

		this.container.appendChild(this.smoker_element);

		this.close_element = document.createElement('div');
		this.close_element.style.width = '10%';
		this.close_element.style.display = 'inline-block';
		this.close_element.style.textAlign = 'center';
		this.close_element.style.lineHeight = '30px';
		this.close_element.style.cursor = 'pointer';
		this.close_element
		this.close_element.innerText = 'X';

		this.container.appendChild(this.close_element);
	}

	Relative.prototype.setupListener = function() {
		this.close_element.addEventListener('click', this.destroy.bind(this));
	}

	Relative.prototype.destroy = function() {
		console.log('destroy');
		this.close_element.removeEventListener('click', this.destroy);
		this.removeFromParent(this.id);
	}

	Relative.prototype.toDataObj = function() {
		return {
			"relationship": this.relationship,
			"age": this.age,
			"smoker": this.smoker
		}
	}

	return {
		Relative: Relative
	}
})();