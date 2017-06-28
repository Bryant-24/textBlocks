// Список блоков
const wrapBlocks = document.getElementById('blocks');
const blocks = document.querySelectorAll('.block');

// Таблица
const quantity = document.getElementById('quantity');
const quantitySelected = document.getElementById('quantitySelected');
const quantitySelectedRed = document.getElementById('quantitySelectedRed');
const quantitySelectedGreen = document.getElementById('quantitySelectedGreen');

// Форма добавления
const addForm = document.getElementById('add-form');
const counter = document.getElementById('count');
const button = document.getElementById('button');

// Одиночный/двойной клик
let clickInterval = 200;
let clickTimeId;



// Первоначалная загрузка
function main() {
	addForm.addEventListener('submit', addNewBlock);
	blocks.forEach(block => bindEvents(block));
}

main();


// Добавления нового блока в DOM
function addNewBlock(event) {
	event.preventDefault();

	const newBlock = createBlock();
	wrapBlocks.appendChild(newBlock);

	updateTable();
}


// Создание узла нового блока
function createBlock() {

	// Рандомный текст
	const text = document.createElement('p');
	text.innerText = createText(counter.value);

	// Элемент удаления блока
	const closelink = document.createElement('span');
	closelink.className = 'block-close';

	// Простой/сложный блок (0/1)
	const random = Math.round(Math.random());

	// Создание элемента списка
	const newBlock = document.createElement('li');
	newBlock.className = 'block';

	if (random) {
		newBlock.classList.add('block--hard');
	}

	newBlock.appendChild(text);
	newBlock.appendChild(closelink);

	// События закрытия/клика/двойного клика по блоку
	bindEvents(newBlock);

	// Очистка формы
	counter.value = '';

	return newBlock;
}


// События закрытия/клика/двойного клика по блоку
function bindEvents(block) {

	const close = block.querySelector('.block-close');

	close.addEventListener('click', closeBlock);
	block.addEventListener('click', selectBlock);
	block.addEventListener('dblclick', changeColor);
}


// Закрыть блок
function closeBlock(event) {

	const block = this.parentNode;

	// Если блок сложный - уточняющий вопрос
	if (block.classList.contains('block--hard')) {
		let answer = confirm('Вы действительно хотите удалить блок?');
		if (!answer) return event.stopPropagation();
	}

	// Закрытие блока
	wrapBlocks.removeChild(block);

	updateTable();
}


// Выделение блока
function selectBlock() {

	const block = this;

	// Защита от двойного клика
	if (clickTimeId) {
		clickTimeId = window.clearTimeout(clickTimeId);
	}

	clickTimeId = window.setTimeout(function () {

		// Выделение/снятие выделения с блока
		block.classList.toggle('active');
		updateTable();

	}, clickInterval);
}


// Смена цвета у сложных блоков
function changeColor(event) {

	const block = this;

	// Защита от одиночного клика
	if (clickTimeId) {
		clickTimeId = window.clearTimeout(clickTimeId);
	}

	// Смена красной рамки
	if (block.classList.contains('block--hard')) {
		block.classList.toggle('red');
	}

	updateTable();
}


// Создание рамдомного текста
function createText(count) {

	let counter = count || 100;
	let string = "";
	let letters = " A B C D E F G H I J K L M N O P Q R S T U V W abcdefghijklmnopqrstuvwxyz";
	let max = letters.length - 1;
	let min = 1;

	for (let i = 0; i < counter; i++) {
		string += letters.charAt(Math.floor(Math.random() * (max - min + 1)) + min);
	}

	return string;
}


// Актуализация таблицы
function updateTable() {

	const allBlocks = document.querySelectorAll('.block');
	let i, j, g, r;

	for (i = j = g = r = 0; i < allBlocks.length; i++) {
		if (allBlocks[i].classList.contains('active')) {
			j++;
			if (allBlocks[i].classList.contains('block--hard')) {
				if (allBlocks[i].classList.contains('red')) {
					r++;
				} else {
					g++;
				}
			}
		}

	}

	// Общее число блоков/число выделенных/зеленых/красных блоков
	quantity.value = i;
	quantitySelected.value = j;
	quantitySelectedGreen.value = g;
	quantitySelectedRed.value = r;
}
