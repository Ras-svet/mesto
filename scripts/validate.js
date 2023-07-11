
// показать ошибку
const showInputError = (lib, formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
	inputElement.classList.add(lib.inputErrorClass);
	errorElement.textContent = errorMessage;
};

// скрыть ошибку
const hideInputError = (lib, formElement, inputElement) => {
	const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
	errorElement.textContent = '';
	inputElement.classList.remove(lib.inputErrorClass);
};

// функция проверки валидности инпутов и показа или скрытия ошибок
const checkInputValidity = (formElement, inputElement) => {
	// const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
	if (!inputElement.validity.valid) {
		showInputError(config, formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(config, formElement, inputElement);
	};
};

// проверка валидности всей формы
const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid
	});
};

// показать кнопку
const showButton = (lib, buttonElement) => {
	buttonElement.classList.remove(lib.inactiveButtonClass);
	buttonElement.disabled = false;
}

// скрыть кнопку
const hideButton = (lib, buttonElement) => {
	buttonElement.classList.add(lib.inactiveButtonClass);
	buttonElement.disabled = true;
}

const toggleButton = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		hideButton(config, buttonElement);
	} else {
		showButton(config, buttonElement);
	};
};

// навешивание слушателя длля инпутов
const setEventListeners = (lib, formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(lib.inputSelector));
	const buttonElement = formElement.querySelector(lib.submitButtonSelector);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function() {
			checkInputValidity(formElement, inputElement);
			toggleButton(inputList, buttonElement);
		});
	});
};

const enableValidation = (lib) => {
	const formList = Array.from(document.querySelectorAll(lib.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		setEventListeners(config, formElement);
	});
};

enableValidation(config);