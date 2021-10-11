document.addEventListener('DOMContentLoaded', () => {
	const heading = document.querySelector('#journal-head');
	const month = heading.dataset.month;
	const year = heading.dataset.year;
	console.log(month, year);
	renderPage(month, year);

	// document.querySelector('.prev').addEventListener('click', () => {
	// 	date.setMonth(date.getMonth() - 1)
	// 	renderPage()
	// })

	// document.querySelector('.next').addEventListener('click', () => {
	// 	date.setMonth(date.getMonth() + 1)
	// 	renderPage()
	// })

})


const renderPage = (month, year) => {

	const dateHeading = document.querySelector('#journal-head');
	dateHeading.dataset.month = month;
	dateHeading.dataset.year = year;

	// TODO format the dates
	fetch(`journal/${month}/${year}`)
	.then(response => response.json())
	.then(notes => {
		// console.log(notes);
		const notesGroupedByDate = groupBy(notes, 'date');
		// console.log(notesGroupedByDate);
		const journalPage = document.querySelector('#content');
		journalPage.innerHTML = "";

		const headingDate = document.querySelector("#heading-month");
		headingDate.innerHTML = `${month}, ${year}`;

		Object.entries(notesGroupedByDate).forEach(dateGroup => {
			console.log(dateGroup);
			// dateGroup[0] is the date
			// dateGroup[1] is an array of all the notes
			const date = document.createElement('p');
			const dateTitle = document.createElement('strong');
			dateTitle.innerHTML = dateGroup[0];
			date.appendChild(dateTitle)
			journalPage.append(date);

			// iterate over the list of notes for each date
			dateGroup[1].forEach(note => {
				if (note.notes != "") {
					const noteObject = document.createElement('p');
					noteObject.innerHTML = `${note.exercise} - ${note.notes}`
					journalPage.append(noteObject);
					const noteSpace = document.createElement('br');
					journalPage.append(noteSpace);
				}
			})

		})
	})
}

// Accepts the array and key
const groupBy = (array, key) => {
	// Return the end result
	return array.reduce((result, currentValue) => {
		// If an array already present for key, push it to the array. Else create an array and push the object
		(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue
		);
		// Return the current iteration 'result' value, this will be taken as next iteration 'result' value and accumulate
		return result;
	}, {});
};


document.querySelectorAll('.month-seek').forEach(button => {
		
	const dateHeading = document.querySelector('#journal-head');

	// TODO write case statement here to decide if to change year
	button.onclick = () => {
		if (button.id == 'prev') {
			var month = Number(dateHeading.dataset.month) - 1;
		} else {
			var month = Number(dateHeading.dataset.month) + 1;
		}
		let year = dateHeading.dataset.year;

		let monthStr = month.toString().padStart(2, '0');

		renderPage(monthStr, year);

	}
})