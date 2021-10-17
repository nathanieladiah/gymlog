document.addEventListener('DOMContentLoaded', () => {
	// Get the initial value of the graph select button
	var timeframe = document.getElementById('time-frame');
	let time = timeframe.value;
	graphData(time);



	// timeframe.onchange = (timeframe) => {
	// 	let time = timeframe.value;
	// 	console.log(time);
	// }
	// var myChart = new Chart(ctx, {
	// 	type: 'bar',
	// 	data: {
	// 		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	// 		datasets: [{
	// 			label: '# of Votes', 
	// 			data: [12, 19, 3, 5, 2, 3],
	// 			backgroundColor: [
	// 				'rgba(255, 99, 132, 0.2)',
	// 				'rgba(54, 162, 235, 0.2)',
	// 				'rgba(255, 206, 86, 0.2)',
	// 				'rgba(75, 192, 192, 0.2)',
	// 				'rgba(153, 102, 255, 0.2)',
	// 				'rgba(255, 159, 64, 0.2)'
	// 			],
	// 			borderColor: [
	// 				'rgba(255, 99, 132, 1)',
	// 				'rgba(54, 162, 235, 1)',
	// 				'rgba(255, 206, 86, 1)',
	// 				'rgba(75, 192, 192, 1)',
	// 				'rgba(153, 102, 255, 1)',
	// 				'rgba(255, 159, 64, 1)'
	// 			],
	// 			borderWidth: 1
	// 		}]
	// 	},
	// 	options: {
	// 		scales: {
	// 			y: {
	// 				beginAtZero: true
	// 			}
	// 		}
	// 	}
	// });
})

const timeframe = document.getElementById('time-frame');
timeframe.onchange = () => {
	time = timeframe.value
	graphData(time);
}

// TODO: convert units
const graphData = time => {
	const select = document.getElementById('time-frame');
	const month = select.dataset.month;
	const year = select.dataset.year;
	// get the current month, put it in a dataset in the html
	// get the exercise and send a fetch request to get all the logs for an exercise for that day:
	// need reps and weights for each day
	console.log(month, year);

	fetch(`graph/${time}/${month}/${year}`)
	.then(response => response.json())
	.then(exerciseLogs => {
		// console.log(exerciseLogs);
		// Should I assume that there is only 1 log per exercise per day?
		data = [];
		labels = [];
		Object.entries(exerciseLogs).forEach(log => {
			var totalVolume = 0;
			console.log(log);
			labels.push(log[1].log_info.date);
			log[1].sets_perlog.forEach(set => {
				let volume = set.weight * set.reps;
				totalVolume += volume;
			})
			data.push(totalVolume);
		});
		console.log(data, labels);
		renderGraph(data, labels);
	})
}

const renderGraph = (volume, dates) => {
	var ctx = document.getElementById('Chart1');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			// labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			labels: dates,
			datasets: [{
				label: 'Total Volume Load', 
				// data: [12, 19, 3, 5, 2, 3],
				data: volume,
				fill: false,
				xAxisId: 'Date',
				yAxisId: 'Volume Load (kg)',
				// backgroundColor: [
				// 	'rgba(255, 99, 132, 0.2)',
				// 	'rgba(54, 162, 235, 0.2)',
				// 	'rgba(255, 206, 86, 0.2)',
				// 	'rgba(75, 192, 192, 0.2)',
				// 	'rgba(153, 102, 255, 0.2)',
				// 	'rgba(255, 159, 64, 0.2)'
				// ],
				// borderColor: [
				// 	'rgba(255, 99, 132, 1)',
				// 	'rgba(54, 162, 235, 1)',
				// 	'rgba(255, 206, 86, 1)',
				// 	'rgba(75, 192, 192, 1)',
				// 	'rgba(153, 102, 255, 1)',
				// 	'rgba(255, 159, 64, 1)'
				// ],
				// borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}