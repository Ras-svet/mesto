export class Card {
	constructor(data, templateSelector, handleCardClick, personalId, removeCard, popupCardDelete, handleLikeCard) {
		this._handleLike = handleLikeCard;
		this._personalId = personalId;
		this._cardId = data._id;
		this._ownerId = data.owner._id;
		this.likesNumber = data.likes;
		this._link = data.link;
		this._title = data.name;
		this._template = templateSelector;
		this._openFullScreen = handleCardClick;
		this._removeCard = removeCard;
		this._popupDeletionConfirm = popupCardDelete
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

		this._likeButton.addEventListener('click', (evt) => {
			this._handleLike(this, this._cardId, this._likesContainer)
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

	like() {
		if (this._likeButton.classList.contains('element__like-button_active')) {
      this._likeButton.classList.remove('element__like-button_active')
    } else {
      this._likeButton.classList.add('element__like-button_active')
    }
	}

	_showLikedCard() {
		if (this.likesNumber.some((like) => {
			return like._id === this._personalId
		})) {
			this._likeButton.classList.add('element__like-button_active')
		} else {
			this._likeButton.classList.remove('element__like-button_active')
		}
	}

	updateLikesNumber(likes) {
		this._likesContainer.textContent = likes.length
	}

	createCard() {
		this._cardElement = this._getTemplate();
		this._likeButton = this._cardElement.querySelector('.element__like-button');
		this._likesContainer = this._cardElement.querySelector('.element__like-number');
		this._cardDeleteButton = this._cardElement.querySelector('.element__trash');
		this._cardImage = this._cardElement.querySelector('.element__image');
		this._cardTitle = this._cardElement.querySelector('.element__title');
		this._cardTitle.textContent = this._title;
		this.updateLikesNumber(this.likesNumber)
		this._cardImage.src = this._link;
		this._cardImage.alt = this._title;
		this._checkDeleteAbility();
		this._showLikedCard();
		this._setEventListeners();
		return this._cardElement
	}
}