document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#add-set').addEventListener('click', () => add_set());
});


// Need a way to stop adding empty sets
function add_set() {
	let reps = document.querySelector('#reps').value;
	let weight = document.querySelector('#weight').value;
	let units = document.querySelector('#units').value;
	console.log(weight, reps, units);

	const set = document.createElement('div');
	set.innerHTML = `${reps} reps @ ${weight}${units}`;
	set.classList.add('col-10')
	document.querySelector('#currentsets').append(set);

	const edit = document.createElement('button');
	edit.id = 'test';
	edit.classList.add('btn', 'col-lg-1', 'edit-set');
	edit.setAttribute("type", "button");

	const icon = document.createElement('i');
	icon.classList.add("fa-solid", "fa-chevron-down");
	edit.appendChild(icon);

	document.querySelector('#currentsets').append(edit);
};