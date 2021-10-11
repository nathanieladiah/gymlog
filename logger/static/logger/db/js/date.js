document.addEventListener('DOMContentLoaded', () => {

	const dateHeading = document.querySelector('#date-header');
	let day = dateHeading.dataset.day;
	let month = dateHeading.dataset.month;
	let year = dateHeading.dataset.year;

	addDate(day, month, year);

	document.querySelector('#prev').addEventListener('click', () => {
		// TODO write case statement to determine the correct year and month
		addDate(day - 1, month, year);
	})

	document.querySelector('#next').addEventListener('click', () => {
		addDate(Number(day) + 1, month, year);
	})

})

const addDate= (day, month, year) => {

	monthstr = month.toString().padStart(2, '0');
	daystr = day.toString().padStart(2, '0');
	logContent(daystr, monthstr, year);
	
}

const logContent = (day, month, year) => {
	// Get the corresponding logs and sets from the database for this day
	fetch(`seek_day/${year}/${month}/${day}`)
		.then(response => response.json())
		.then(exerciseLogs => {
			// console.log(exerciseLogs);
			const logWrapper = document.querySelector('.log-wrapper');
			logWrapper.innerHTML = "";

			const journalPage = document.querySelector('#content');			
			journalPage.innerHTML = "";

			// use this since it isn't an array:
			// each exercise log is an array with 0 being the key (log id) and 1 being the dict with sets and log info
			Object.entries(exerciseLogs).forEach(exerciseLog => {
				console.log(exerciseLog);

				// create a div for each exercise log
				const logObject = document.createElement('div');
				logObject.classList.add('log', 'mb-30', 'p-2');
				logObject.id = `log-${exerciseLog[1].log_info.id}`;

				// create elements for what goes inside the logs
				const exerciseName = document.createElement('h3');
				exerciseName.classList.add('mb-2');
				exerciseName.innerHTML = exerciseLog[1].log_info.exercise;
				logObject.appendChild(exerciseName);

				const setList = document.createElement('ul');
				logObject.appendChild(setList);

				// Need to iterate over exerciseLog.sets_perLog and create list items for each set
				exerciseLog[1].sets_perlog.forEach(set => {
					const setItem = document.createElement('li');
					setItem.innerHTML = `${set.reps} reps @ ${set.weight}${set.units}`;
					setList.appendChild(setItem);
				})

				// append the log Object
				logWrapper.append(logObject);
				// document.querySelector('.log-wrapper').append(logObject);

				// create a <strong> inside a <p> for the notes times and a <p> for the note and then a <br>
				

				// TODO format the time 
				if (exerciseLog[1].log_info.notes != "") {

					const noteTime = document.createElement('p');
					const noteTimeEmphasis = document.createElement('strong');
					noteTimeEmphasis.innerHTML = `${exerciseLog[1].log_info.time} - ${exerciseLog[1].log_info.exercise}`;
					noteTime.appendChild(noteTimeEmphasis);
					journalPage.append(noteTime);

					const noteBody = document.createElement('p');
					noteBody.innerHTML = exerciseLog[1].log_info.notes;
					journalPage.append(noteBody);

					const noteSpace = document.createElement('br');
					journalPage.append(noteSpace);
				}

			})

		})
}
