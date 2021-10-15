document.addEventListener('DOMContentLoaded', () => {
	// event handler for the show description button on routine page
	// document.querySelectorAll('.routine-desc').forEach(desc => {
	// 	desc.style.display = 'none';
	// })

	document.querySelectorAll('.show-desc').forEach(button => {
		let routine_id = button.dataset.routine;
		let text = button.dataset.description;
		button.onclick = () => {
			showdesc(routine_id, text);
		}
	})

	
});


const showdesc = (routine_id, text) => {
	if (!document.getElementById(`routine-${routine_id}-description`)) {

		const description = document.createElement('div');
		description.id = `routine-${routine_id}-description`;
		description.classList.add('row', 'p-3', 'border-bottom', 'routine-desc')

		const desctext = document.createElement('p');
		desctext.classList.add('col-10','col-lg-11');
		desctext.innerHTML = text;
		description.appendChild(desctext)

		const hideButton = document.createElement('button');
		hideButton.classList.add('btn', 'col-1', 'hide-desc', 'align-self-start');
		hideButton.setAttribute('type', 'button');
		hideButton.dataset['id'] = description.id;

		hideButton.onclick = () => {
			hideDesc(description.id)
		}

		const icon = document.createElement('i');
		icon.classList.add('fa-solid', 'fa-chevron-up');
		hideButton.appendChild(icon);

		description.appendChild(hideButton);


		document.querySelector(`#routine-${routine_id}-wrapper`).append(description);
	}
	// document.querySelector(`#routine-${routine_id}-description`).style.display = 'grid';

}


// document.querySelectorAll('.hide-desc').forEach(button => {
// 	let routine_id = button.dataset.id;
// 	button.onclick = () => {
// 		hideDesc(routine_id);
// 	}
// })

const hideDesc = (id) => {
	const description = document.getElementById(id);
	description.parentNode.removeChild(description);
}