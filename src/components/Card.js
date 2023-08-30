export class Card {
	constructor(data, templateSelector, handleCardClick, personalId, handleLikeAdd, handleLikeRemove, removeCard, popupCardDelete) {
		this._addLike = handleLikeAdd;
		this._deleteLike = handleLikeRemove;
		this._personalId = personalId;
		this._cardId = data._id;
		this._ownerId = data.owner._id;
		this._likesNumber = data.likes;
		this._link = data.link;
		this._title = data.name;
		this._template = templateSelector;
		this._openFullScreen = handleCardClick;
		this._removeCard = removeCard;
		this._popupDeletionConfirm = popupCardDelete;
	}

	_getTemplate() {
		const elementCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
		return elementCard
	}

	_setEventListeners() {
		this._cardDeleteButton.addEventListener('click', () => {
			this._popupDeletionConfirm.open(this._cardId, this)
		});

		this._cardElement.querySelector('.element__image').addEventListener('click', () => {
			this._openFullScreen(this._title, this._link)
		});

		this._cardElement.querySelector('.element__like-button').addEventListener('click', (evt) => {
			this._like(evt)
		});
	}

	deleteCard() {
		this._cardElement.remove();
	}

	_checkDeleteAbility() {
		if (this._ownerId !== this._personalId) {
			this._cardDeleteButton.remove()
		}
	}

	_like(evt) {
		if (evt.target.classList.contains('element__like-button_active')) {
      evt.target.classList.remove('element__like-button_active');
      this._deleteLike(this._cardId, this._likesContainer)
    } else {
      evt.target.classList.add('element__like-button_active');
      this._addLike(this._cardId, this._likesContainer)
    }
	}

	_showLikedCard() {
		if (this._likesNumber.some((like) => {
			return like._id === this._personalId
		})) {
			this._cardElement.querySelector('.element__like-button').classList.add('element__like-button_active')
		} else {
			this._cardElement.querySelector('.element__like-button').classList.remove('element__like-button_active')
		}
	}

	updateLikesNumber(likes) {
		this._cardElement.querySelector('.element__like-number').textContent = likes.length
	}

	createCard() {
		this._cardElement = this._getTemplate();
		this._likesContainer = this._cardElement.querySelector('.element__like-number');
		this._cardDeleteButton = this._cardElement.querySelector('.element__trash');
		this._cardImage = this._cardElement.querySelector('.element__image');
		this._cardElement.querySelector('.element__title').textContent = this._title;
		this.updateLikesNumber(this._likesNumber)
		this._cardImage.src = this._link;
		this._cardImage.alt = this._title;
		this._checkDeleteAbility();
		this._showLikedCard();
		this._setEventListeners();
		return this._cardElement
	}
}