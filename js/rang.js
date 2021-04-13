(function() {
	"use strict";

	const canvas = document.getElementById('mainCanvas');
	const context = canvas.getContext('2d');

	let isDrawing = false;
	let x = 0;
	let y = 0;

	let bgColor = "#ffffff";
	let brushColor = "#000000";
	let brushPicker;
	let bgPicker;

	const downloadButton = document.getElementById('downloadButton');

	// Startup
	window.addEventListener("load", startup, false);

	function startup() {
		// Set up brush color picker
		brushPicker = document.querySelector("#brushColor");
		brushPicker.value = brushColor;
		brushPicker.addEventListener("input", pickerUpdate, false);
		brushPicker.addEventListener("change", pickerUpdate, false);
		brushPicker.select();

		// Set up background color picker
		bgPicker = document.querySelector("#bgColor");
		bgPicker.value = bgColor;
		bgPicker.addEventListener("input", bgPickerUpdate, false);
		bgPicker.addEventListener("change", bgPickerUpdate, false);
		bgPicker.select();
	}

	// Color input handling
	function pickerUpdate(event) {
		brushColor = event.target.value;
	}

	function bgPickerUpdate(event) {
		bgColor = event.target.value;
		context.fillStyle = bgColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	// Canvas handling
	canvas.addEventListener('mousedown', e => {
		x = e.offsetX;
		y = e.offsetY;
		isDrawing = true;
	});

	canvas.addEventListener('mousemove', e => {
		if (isDrawing === true) {
			drawLine(context, x, y, e.offsetX, e.offsetY);
			x = e.offsetX;
			y = e.offsetY;
		}
	});

	canvas.addEventListener('mouseup', e => {
		if (isDrawing === true) {
			drawLine(context, x, y, e.offsetX, e.offsetY);
			x = 0;
			y = 0;
			isDrawing = false;
		}
	});

	function drawLine(context, x1, y1, x2, y2) {
		context.beginPath();
		context.strokeStyle = brushColor;
		context.lineWidth = 1;
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
		context.closePath();
	}

	// Downloading
	downloadButton.addEventListener('click', e => {
		let link = document.createElement('a');
		link.download = 'rang.png';
		link.href = canvas.toDataURL()
		link.click();
	});
}());
