var Utils = (function() {
	function generateID() {
		return (new Date()).getTime() + '_' + Math.ceil(Math.random() * 100);
	}

	function validateForm() {
		var form = document.getElementsByTagName('form')[0],
			relationship_input = form.elements['rel'],
			age = form.elements['age'].value,
			smoker_input = form.elements['smoker'];
		
		if ((parseInt(age, 10) != age) || parseInt(age, 10) <= 0) {
			console.log(typeof age !== 'number', parseInt(age, 10) <= 0);
			alert("Please make sure you fill in all fields.");
			return false;
		}
		if (relationship_input.options[relationship_input.selectedIndex] === 0) {
			alert("Please make sure you fill in all fields.");
			return false;
		}

		return true;
	}

	return {
		generateID: generateID,
		validateForm: validateForm
	}
})();