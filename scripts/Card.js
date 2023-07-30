import { openPopup, closePopup } from "./index.js";

const popupFullPicture = document.querySelector(".popup_type_fullscreen");
const titleFullPicture = popupFullPicture.querySelector(".popup__text");
const photoFullPicture = popupFullPicture.querySelector(".popup__picture");
const buttonCloseFullPicture = popupFullPicture.querySelector(".popup__close-button");

export class Card {
	constructor(data, templateSelector) {
		this._link = data.link;
		this._title = data.name;
		this._template = templateSelector;
	}

	_getTemplate() {
		const elementCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
		return elementCard
	}

	_setEventListeners() {
		this._cardElement.querySelector('.element__trash').addEventListener('click', () => {
			this._deleteCard();
		});

		this._cardElement.querySelector('.element__image').addEventListener('click', () => {
			this._openFullScreen();
			this._createFullscreen();
		});

		this._cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
			this._like(evt)
		});

		buttonCloseFullPicture.addEventListener('click', () => {
			this._closeFullScreen();
		})
	}

	_deleteCard() {
		this._cardElement.remove();
	}

	_like(evt) {
		evt.target.classList.toggle('element__like_active')
	}

	_createFullscreen() {
		titleFullPicture.textContent = this._title;
		photoFullPicture.src = this._link;
		photoFullPicture.alt = this._title;
	}

	_openFullScreen() {
		openPopup(popupFullPicture);
	}

	_closeFullScreen() {
		closePopup(popupFullPicture);
	}

	createCard() {
		this._cardElement = this._getTemplate();
		this._cardElement.querySelector('.element__title').textContent = this._title;
		this._cardElement.querySelector('.element__image').src = this._link;
		this._cardElement.querySelector('.element__image').alt = this._title;

		this._setEventListeners();
		return this._cardElement
	}
}