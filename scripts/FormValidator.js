export class FormValidator {
	constructor(config, form) {
		this._form = form;
		this._submitButton = config.submitButtonSelector;
		this._input = config.inputSelector;
		this._inputErr = config.inputErrorClass;
		this._buttonInactive = config.inactiveButtonClass;
		this._inputList = Array.from(this._form.querySelectorAll(this._input));
		this._buttonElement = this._form.querySelector(this._submitButton);
	}
	_showInputError(inputElement, errorMessage) {
		const errorElement = this._form.querySelector(`#${inputElement.name}-error`);
		inputElement.classList.add(this._inputErr);
		errorElement.textContent = errorMessage;
	}

	_hideInputError(inputElement) {
		const errorElement = this._form.querySelector(`#${inputElement.name}-error`);
		errorElement.textContent = '';
		inputElement.classList.remove(this._inputErr);
	}

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		};
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid
		});
	}

	_enableButton() {
		this._buttonElement.classList.remove(this._buttonInactive);
		this._buttonElement.disabled = false;
	}

	_toggleButton() {
		if (this._hasInvalidInput()) {
			this.disableButton();
		} else {
			this._enableButton();
		};
	}

	_setEventListeners() {
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButton();
			});
		});
	}

	disableButton() {
		this._buttonElement.classList.add(this._buttonInactive);
		this._buttonElement.disabled = true;
	}

	resetFormErrors() {
		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement)
		})
	}

	enableValidation() {
		this._form.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		this._setEventListeners();
	}
}