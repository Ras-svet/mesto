import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(selectorPopup, handleForm) {
		super(selectorPopup);
		this._handleForm = handleForm;
		this._form = this._popup.querySelector('.popup__forms');
		this._inputList = this._form.querySelectorAll('.popup__field')
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
			const data = this._getInputValues();
			this._handleForm(data);
			this.close();
		})
	}
	close() {
		super.close();
		this._form.reset();
	}
}