document.addEventListener('DOMContentLoaded', () => {
	// event handler for the add set button on exercise log page
	document.querySelector('#add-set').addEventListener('click', add_set);

	// Take the info from new exercise log to save it
	document.querySelector('#addlog-form').onsubmit = () => {
		let date = document.querySelector('#logdate').value
		let time = document.querySelector('#logtime').value
		let notes = document.querySelector('#lognotes').value
		const sets = [];

		// Iterate over all divs inside current set
		document.querySelectorAll('.new-set').forEach(newSet => {
			reps = newSet.dataset.reps;
			weight = newSet.dataset.weight;
			units = newSet.dataset.units;

			let set = {
				'reps': reps,
				'weight': weight,
				'units': units
			};
			sets.push(set);
		})
		save_log(date, time, notes, sets);
		return false;
	}

	
});

var setCount = 0;

// django function - used to get csrf_token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function add_set() {
	let reps = document.querySelector('#reps').value;
	let weight = document.querySelector('#weight').value;
	let units = document.querySelector('#units').value;
	// console.log(weight, reps, units);

	// check if the set has info in it before adding
	if (reps.length > 0 && weight.length > 0 && units.length > 0) {

		setCount += 1;
		const set = document.createElement('div');
		set.innerHTML = `${reps} reps @ ${weight}${units}`;
		set.id = `set-${setCount}`;
		set.classList.add('col-10', 'new-set');
		set.dataset['reps'] = reps;
		set.dataset['weight'] = weight;
		set.dataset['units'] = units;
		document.querySelector('#currentsets').append(set);

		// const edit = document.createElement('button');
		// edit.id = `edit-${setCount}`;
		// edit.classList.add('btn', 'col-lg-1', 'edit-set');
		// edit.dataset['set'] = set.id;
		// edit.setAttribute("type", "button");
		// edit.onclick = () => {
		// 	edit_set(set.id, edit.id);
		// }

		// const icon = document.createElement('i');
		// icon.classList.add("fa-solid", "fa-chevron-down");
		// edit.appendChild(icon);

		// document.querySelector('#currentsets').append(edit);
	} else {
		alert("Set info not filled in")
	}
};

// const edit_set = (setId, editId) => {
// 	console.log(setId, editId);
// 	const setToEdit = document.querySelector(`#${setId}`);
// 	const editButton = document.querySelector(`#${editId}`);

// 	const reps = setToEdit.dataset.reps;
// 	const weight = setToEdit.dataset.weight;
// 	const units = setToEdit.dataset.units;

// 	setToEdit.style.display = 'none';
// 	editButton.style.display = 'none';

// 	const editor = document.createElement('div');
// 	editor.classList.add('set-editor', 'row', 'align-items-center');
// 	editor.id = `edit-set-${setId}`;

// 	const repsRow = document.createElement('div');
// 	repsRow.classList.add('col-lg-4', 'input-style-1');
// 	editor.appendChild(repsRow)

// 	const repEdit = document.createElement('input')
// 	repEdit.classList.add('input-style-1');
// 	// repEdit.innerHTML = reps;
// 	repEdit.setAttribute("type", "text");
// 	repEdit.setAttribute("value", reps);
// 	repsRow.appendChild(repEdit);

// 	const weightRow = document.createElement('div');
// 	weightRow.classList.add('col-lg-3', 'input-style-1');
// 	editor.appendChild(weightRow)

// 	const weightEdit= document.createElement('input')
// 	weightEdit.classList.add('input-style-1');
// 	// weightEdit.innerHTML = weight;
// 	weightEdit.setAttribute("type", "text");
// 	weightEdit.setAttribute("value", weight);
// 	weightRow.appendChild(weightEdit);

// 	// const unitsEdit= document.createElement('input')
// 	// unitsEdit.classList.add('w-25');
// 	// unitsEdit.innerHTML = units;
// 	// editor.appendChild(unitsEdit);
// 	const saveEditButton = document.createElement('button')
// 	saveEditButton.classList.add('btn', 'col-lg-1', 'add-button')
// 	saveEditButton.id = `edit-${setId}`;
// 	saveEditButton.onclick = () => {
// 		saveEdit(setId, saveEditButton);
// 	}
// 	editor.appendChild(saveEditButton);

// 	const saveIcon = document.createElement('i');
// 	saveIcon.classList.add('fa-solid', 'fa-check');
// 	saveEditButton.appendChild(saveIcon);


// 	document.querySelector('#currentsets').prepend(editor);
// }

// const saveEdit = (setId) => {

// }


function save_log(date, time, notes, sets) {
	const csrftoken = getCookie('csrftoken');

	const form = document.querySelector('#addlog-form');
	const exercise_id = form.dataset.exercise;
	console.log(exercise_id, date, time, notes, sets);
	console.log(sets.length);

	if (sets.length != 0) {
		fetch(`/exercise/${exercise_id}/add`, {
			method: 'POST', 
			body: JSON.stringify({
				date: date,
				time: time,
				notes: notes,
				sets: sets
			}),
			headers: {'X-CSRFToken': csrftoken}
		})	
		.then(response => response.json())
		.then(result => {
			if (result.error) {
				alert(result.error);
				return;
			} else {
				window.location = result.url;
			}
		});
	} else {
		alert("Please add some sets")
	}

}
