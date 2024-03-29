const nameInput = document.querySelector('#name');
const add = document.getElementById("add");
const taskInput = document.getElementById("content")
const tasksList = document.getElementById("list-container")
const emptyList = document.getElementById('emptyList');

const username = localStorage.getItem('username') || '';
nameInput.value = username;
nameInput.addEventListener('change', (e) => {
	localStorage.setItem('username', e.target.value);
})

let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

add.addEventListener('click', addTask);
tasksList.addEventListener('click', deleteTask);

function addTask(event) {
    if(taskInput.value === ''){
        alert('Введите задачу!')
    }
    else{
        event.preventDefault();
            const taskText = taskInput.value;
            const newTask = {
                id: Date.now(),
                text: taskText,
                done: false,
            };
            tasks.push(newTask);
            saveToLocalStorage();

            renderTask(newTask);

            taskInput.value = '';
            taskInput.focus();

            checkEmptyList();
    }
	
}

function deleteTask(event) {
	if (event.target.dataset.action !== 'delete') return;
	const parenNode = event.target.closest('.list-group-item');
	const id = Number(parenNode.id);

	tasks = tasks.filter((task) => task.id !== id);
	saveToLocalStorage();
	parenNode.remove();
	checkEmptyList();
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/list.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}
	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	}
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	const taskHTML = `
                <li id="${task.id}" class="list-group-item">
					<span class="task-title">${task.text}</span>
					<div class="task-item-buttons">
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
