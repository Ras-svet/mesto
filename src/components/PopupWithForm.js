import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(selectorPopup, handleForm) {
		super(selectorPopup);
		this._handleForm = handleForm;
		this._form = this._popup.querySelector('.popup__forms');
		this._inputList = this._form.querySelectorAll('.popup__field');
		this._saveButton = this._popup.querySelector('.popup__save-button')
	}
	_getInputValues() {
		const formData = {};
		this._inputList.forEach((input) => {
			formData[input.name] = input.value
		})
		return formData
	}
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', () => {
			const body = this._getInputValues();
			this._handleForm(body);
		})
	}
	close() {
		super.close();
		this._form.reset();
	}
	loading(text) {
		this._saveButton.textContent = text
	}
}