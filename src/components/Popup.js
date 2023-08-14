export class Popup{
	constructor(selectorPopup) {
		this._popup = document.querySelector(selectorPopup);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._button = this._popup.querySelector('.popup__close-button')
	}
	_handleEscClose(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}
	_handleOverlayClose(evt) {
		if (evt.target === evt.currentTarget) {
			this.close();
		}
	}
	setEventListeners() {
		this._popup.addEventListener('click', (evt) => {
			this._handleOverlayClose(evt);
		});

		this._button.addEventListener('click', () => {
			this.close()
		})
	}
	open() {
		this._popup.classList.add('popup_opened');
		// this.setEventListeners();
		document.addEventListener('keydown', this._handleEscClose);
	}
	close() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}
}