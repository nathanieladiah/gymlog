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
		const notesGroupedByDate = groupBy(notes, 'date');
		const journalPage = document.querySelector('#content');
		journalPage.innerHTML = "";

		const headingDate = document.querySelector("#heading-month");
		headingDate.innerHTML = `${month}, ${year}`;

		Object.entries(notesGroupedByDate).forEach(dateGroup => {
			// dateGroup[0] is the date
			// dateGroup[1] is an array of all the notes
			const logWrapper = document.createElement('div')

			const date = document.createElement('p');
			const dateTitle = document.createElement('strong');
			dateTitle.innerHTML = dateGroup[0];
			date.appendChild(dateTitle)
			logWrapper.append(date);

			var noteCount = 0;

			// iterate over the list of notes for each date
			dateGroup[1].forEach(note => {
				if (note.notes != "") {
					noteCount += 1;
					const noteObject = document.createElement('p');
					noteObject.innerHTML = `${note.exercise} - ${note.notes}`
					logWrapper.append(noteObject);
					const noteSpace = document.createElement('br');
					logWrapper.append(noteSpace);
				}
			})

			// Only display dates that have notes with content
			if (noteCount != 0) {
				journalPage.append(logWrapper);
			}

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

	// Statement here to decide if to change year
	button.onclick = () => {
		let year = Number(dateHeading.dataset.year);
		var month = Number(dateHeading.dataset.month);
		
		if (button.id == 'prev') {
			if (month === 1) {
				month = 12;
				year -= 1;
			} else {
				month -= 1;
			}
		} else {
			if (month === 12) {
				month = 1;
				year += 1;
			} else {
				month += 1;
			}
		}
		

		let monthStr = month.toString().padStart(2, '0');

		renderPage(monthStr, year);

	}
})