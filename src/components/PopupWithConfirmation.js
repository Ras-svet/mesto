import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
	constructor(selectorPopup, removeCard) {
		super(selectorPopup)
		this._removeCard = removeCard;
		this._saveButton = this._popup.querySelector('.popup__save-button');
	}
	open(cardId, card) {
		super.open();
		this._cardId = cardId;
		this._card = card
	}
	setEventListeners() {
		super.setEventListeners();
		this._saveButton.addEventListener('click', () => {
			this._removeCard(this._cardId, this._card)
		})
	}
	loading(text) {
		this._saveButton.textContent = text
	}
}