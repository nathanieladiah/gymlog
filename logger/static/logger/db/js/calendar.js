const date = new Date();

document.addEventListener('DOMContentLoaded', () => {
	renderCalendar();

	document.querySelector('.prev').addEventListener('click', () => {
		date.setMonth(date.getMonth() - 1)
		renderCalendar()
	})

	document.querySelector('.next').addEventListener('click', () => {
		date.setMonth(date.getMonth() + 1)
		renderCalendar()
	})

})

const renderCalendar = () => {
	date.setDate(1);

	const dayDetails = document.querySelector('#day-container');

	const monthDays = document.querySelector('.days');

	// gets the last day of the current month
	const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

	// gets the last day of the previous month
	const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

	const firstDayIndex = date.getDay();
	const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

	const nextDays = 7 - lastDayIndex - 1;

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]


	const year = date.getFullYear();
	document.querySelector('.date').innerHTML = months[date.getMonth()] +" " + year; 

	let days = "";

	for (let x = firstDayIndex; x > 0; x--) {
		days += `<div class="prev-date day">${prevLastDay - x + 1}</div>`
	}

	for(let i = 1; i <= lastDay; i++) {
		if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
			days += `<div class="today day">${i}</div>`;
		} else {
			days += `<div class="day">${i}</div>`;
		}
		
	}

	for(let j = 1; j <= nextDays; j++) {
		days += `<div class="next-date day">${j}</div>`
		monthDays.innerHTML = days;
	}
		
	dayDetails.style.display = 'none';

	// Event handler for clicking the days on the calendar to go to specific date page
	dateClicker(year, date.getMonth() + 1);

}


const dateClicker = (year, current_month) => {
	document.querySelectorAll('.day').forEach(date => {
		
		date.onclick = () => {
			// Change the month depending on which date is clicked
			if (date.classList.contains('prev-date')) {
				var month = current_month - 1;
			} else if (date.classList.contains('next-date')) {
				var month = current_month + 1;
			} else {
				var month = current_month;
			}
			let day = date.innerHTML;

			dayStr = day.toString().padStart(2, '0');
			monthStr = month.toString().padStart(2, '0');

			logContent(dayStr, monthStr, year);

		}
	})
}

const logContent = (day, month, year) => {

	document.querySelector('#calendar-container').style.display = 'none';
	document.querySelector('#day-container').style.display = 'block';

	

	// TODO format date
	const dateHeading = document.querySelector('#date-header');
	dateHeading.innerHTML = `${day} ${month} ${year}`;
	dateHeading.dataset.day = day;
	dateHeading.dataset.month = month;
	dateHeading.dataset.year = year;

	// Get the corresponding logs and sets from the database for this day
	fetch(`day/${day} ${month} ${year}`)
		.then(response => response.json())
		.then(exerciseLogs => {
			console.log(exerciseLogs);
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


document.querySelectorAll('.day-seek').forEach(button => {
		
	const dateHeading = document.querySelector('#date-header');

	// TODO write case statement here to decide if to change month and year
	button.onclick = () => {
		if (button.id == 'prev') {
			var day = Number(dateHeading.dataset.day) - 1;			
		} else {
			var day = Number(dateHeading.dataset.day) + 1;			
		}
		let month = dateHeading.dataset.month;
		year = dateHeading.dataset.year;

		let dayStr = day.toString().padStart(2, '0');
		let monthStr = month.toString().padStart(2, '0');

		logContent(dayStr, monthStr, year);

	}
})

document.querySelector('#calendar').addEventListener('click', () => {
	document.querySelector('#day-container').style.display = 'none';
	document.querySelector('#calendar-container').style.display = 'block';
})
