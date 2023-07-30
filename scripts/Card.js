export class Card {
	constructor(data, templateSelector, openFullScreen) {
		this._link = data.link;
		this._title = data.name;
		this._template = templateSelector;
		this._openFullScreen = openFullScreen;
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
			this._openFullScreen(this._title, this._link)
		});

		this._cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
			this._like(evt)
		});
	}

	_deleteCard() {
		this._cardElement.remove();
	}

	_like(evt) {
		evt.target.classList.toggle('element__like_active')
	}

	createCard() {
		this._cardElement = this._getTemplate();
		this._cardImage = this._cardElement.querySelector('.element__image');
		this._cardElement.querySelector('.element__title').textContent = this._title;
		this._cardImage.src = this._link;
		this._cardImage.alt = this._title;

		this._setEventListeners();
		return this._cardElement
	}
}