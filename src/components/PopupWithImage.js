import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(selectorPopup) {
		super(selectorPopup);
		this._photo = this._popup.querySelector('.popup__picture');
		this._title = this._popup.querySelector('.popup__text')
	}
	open(name, link) {
		super.open();
		this._photo.src = link;
		this._photo.alt = name;
		this._title.textContent = name;
	}
}