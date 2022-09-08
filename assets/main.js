const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const habits = [
	{
		id: 1,
		img: '/assets/img/coffee.svg',
		name: 'No caffeine',
		completed: [false, false, false, false, false, false, false]
	}
];

const getDayButton = ({id}, isCheked, index, dayName) => 
`<button class='${isCheked ? "checked" : ""}' onclick="toggleHabit('${id}', '${index}')"><img src="/assets/img/check.svg" alt="" width="25"><span>${dayName}</span></button>`;

const toggleHabit = (habitId, index) => {
	const elem = document.querySelectorAll(`[data-id = '${habitId}'] .habit-plan button`);

	const countDays = habits.length * 7;
	const percentOneDay = 100 / countDays;

	const progressBarElem = document.querySelector('.progress-bar > div');
	const isCheked = elem[index].classList.contains('checked');

	if (isCheked) {
		elem[index].classList.remove('checked');
	} else {
		elem[index].classList.add('checked');
	}
	
	const currentPercent = +progressBarElem.textContent.replace('%', '');

	let percent = isCheked ? currentPercent - percentOneDay : currentPercent + percentOneDay;

	if (percent > 98) percent = 100; 
	progressBarElem.textContent = percent.toFixed(1) + '%';
	progressBarElem.style.width = percent + '%';
	
};

const getWeekDaysElement = habit => {
	return weekDays.map((name, index) => getDayButton(habit, habit.completed[index], index, name)).join('');
};

const getHabitElement = habit =>
`<div class="habit" data-id='${habit.id}'>
	<div class="habit-header">
		<img src='${habit.img}' alt="" width="80">
		<span class="font-semibold text-2xl">${habit.name}</span>
	</div>
	<div class="habit-plan">${getWeekDaysElement(habit)}</div>
</div>`;

const render = (habits) => {
	const habitContainer = document.querySelector('.habit-container');
	habitContainer.innerHTML = habits.map(habit => getHabitElement(habit)).join('');
};

render(habits);

// Add New Habbit

const openForm = () => {
	document.querySelector('.form').classList.add('open');
};

const addNewHabit = () => {
	const inputElem = document.querySelector('.form input');
	const value = inputElem.value;
	if (!value) {
		alert("Habit name is required!");
		return;
	} else {
		habits.unshift({
			id: habits.length + 1,
			img: '/assets/img/coffee.svg',
			name: value,
			completed: [false, false, false, false, false, false, false]
		});
		
		render(habits);
		document.querySelector('.form').classList.remove("open");	
		inputElem.value = "";
	}
};