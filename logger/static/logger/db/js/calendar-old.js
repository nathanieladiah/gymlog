const date = new Date();

document.addEventListener('DOMContentLoaded', () => {
	renderCalendar();
	// addDateLinks();

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

	// const month = date.getMonth(); // returns index number of current month (starts at 0)

	const year = date.getFullYear();
	document.querySelector('.date').innerHTML = months[date.getMonth()] +" " + year; 

	// document.querySelector('.today-date').innerHTML = new Date().toDateString();

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

	// Event handler for clicking the days on the calendar to go to specific date page
	 addDateLinks(year, date.getMonth() + 1);
}

const addDateLinks = (year, current_month) => {
	// fetch(`calendar_day/${year}/${month}/${day}`)
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
			fetch(`calendar_day/${year}/${month}/${day}`)
			.then(response => response.json())
			.then(result => {
				window.location = result.url;
			})
		}
	})
}



// document.querySelector('.prev').addEventListener('click', () => {
// 	date.setMonth(date.getMonth() - 1)
// 	renderCalendar()
// })

// document.querySelector('.next').addEventListener('click', () => {
// 	date.setMonth(date.getMonth() + 1)
// 	renderCalendar()
// })

// document.querySelector('.current-month').addEventListener('click', () => {
// 	date.setMonth(date.getMonth())
// 	renderCalendar()
// })

// renderCalendar()