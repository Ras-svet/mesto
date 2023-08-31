import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js"
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

import {
	config,
	popupProfile,
	nameInput,
	jobInput,
	buttonEditProfile,
	popupCard,
	buttonAddPopupCard,
	buttonAvatarEdit,
	popupAvatar
} from "../utils/constants.js"

// экземпляры попапов
const popupFullCard = new PopupWithImage('.popup_type_fullscreen');
popupFullCard.setEventListeners();

const popupCardAdd = new PopupWithForm('.popup_type_card', addCard);
popupCardAdd.setEventListeners();

const popupProfileEdit = new PopupWithForm('.popup_type_profile', handleEditFormSubmit);
popupProfileEdit.setEventListeners();

const popupCardDelete = new PopupWithConfirmation('.popup_type_deletion', removeCard);
popupCardDelete.setEventListeners();

const popupAvatarEdit = new PopupWithForm('.popup_type_avatar', changeAvatar)
popupAvatarEdit.setEventListeners();

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-74',
	headers: {
		authorization: 'c55a96e6-da21-4263-9b88-67e69c11521a',
		'Content-Type': 'application/json'
	}
})

function handleSubmit(request, popup) {
	popup.renderLoading(true);
	request()
	.then(() => {
		popup.close()
	})
	.catch((err) => {
		console.log(`Ошибка при отправке запроса ${err}`)
	})
	.finally(() => {
		popup.renderLoading(false)
	})
}

let personalId

Promise.all([api.getUserInfo(), api.getCards()])
	.then(([userData, cards]) => {
		userProfile.setUserInfo(userData);
		personalId = userData._id;
		initialCardsList.renderItems(cards)
	})
	.catch(err => {
		console.log(`Ошибка при отправке запроса ${err}`)
	})

const userProfile = new UserInfo({
	nameSelector: '.profile__name',
	jobSelector: '.profile__job',
	photoSelector: '.profile__avatar'
});

// создание экземпляра карточки
function createCard(data) {
	const card = new Card(data, '#element', handleCardClick, personalId, removeCard, popupCardDelete, handleLikeCard);
	const cardElement = card.createCard();
	return cardElement
} 

// добавление новой карточки
function addCard(data) {
	function makeRequestToAdd() {
		return api.addCard(data.nameCard, data.link).then(data => {
			const newCard = createCard(data);
			initialCardsList.addItem(newCard)
		})
	}
	handleSubmit(makeRequestToAdd, popupCardAdd)
}

// удаление карточки
function removeCard(cardId, card) {
	api.deleteCard(cardId)
	.then(res => {
		card.deleteCard();
		popupCardDelete.close();
	})
	.catch(err => {
		console.log(`Ошибка при отправке запроса ${err}`)
	})
}

// отрисовка карточек из массива
const initialCardsList = new Section({
	renderer: (item) => {
		const newCard = createCard(item);
		initialCardsList.addItemByAppend(newCard)
	}}, '.elements')

function handleLikeCard(card, cardId, likesContainer) {
	if (card.likesNumber.some(like => {
		return like._id === personalId
	})) {
		handleLikeRemove(cardId, likesContainer, card)
	} else {
		handleLikeAdd(cardId, likesContainer, card)
	}
}

// лайк карточки
function handleLikeAdd(cardId, likesContainer, card) {
	api.addLike(cardId)
	.then(response => {
		likesContainer.textContent = response.likes.length;
		card.likesNumber = response.likes;
		card.like()
	})
	.catch(err => {
		console.log(`Ошибка при отправке запроса ${err}`)
	})
}

// удаление лайка
function handleLikeRemove(cardId, likesContainer, card) {
	api.removeLike(cardId)
	.then(response => {
		likesContainer.textContent = response.likes.length;
		card.likesNumber = response.likes;
		card.like()
	})
	.catch(err => {
		console.log(`Ошибка при отправке запроса ${err}`)
	})
}

// открытие полного экрана карточки
function handleCardClick(name, link) {
	popupFullCard.open(name, link)
}

// изменение инфрормации профиля
function handleEditFormSubmit(body) {
	function makeRequestToChangeInfo() {
		return api.changeUserInfo(body).then(userData => {
			userProfile.setUserInfo(userData)
		})
	}
	handleSubmit(makeRequestToChangeInfo, popupProfileEdit)
}

// изменение аватара
function changeAvatar(body) {
	function makeRequestToChangeAvatar() {
		return api.changeAvatar(body).then(userData => {
		userProfile.setUserInfo(userData)
		})
	}
	handleSubmit(makeRequestToChangeAvatar, popupAvatarEdit)
}

// создание экземпляров форм
const popupProfileValidated = new FormValidator(config, popupProfile);
popupProfileValidated.enableValidation();

const popupCardValidated = new FormValidator(config, popupCard);
popupCardValidated.enableValidation();

const popupAvatarValidated = new FormValidator(config, popupAvatar);
popupAvatarValidated.enableValidation();

buttonAddPopupCard.addEventListener('click', (evt) => {
	popupCardAdd.open();
	popupCardValidated.resetFormErrors();
	popupCardValidated.disableButton();
});

buttonEditProfile.addEventListener('click', () => {
	const {name, job} = userProfile.getUserInfo();
	nameInput.value = name;
	jobInput.value = job
	popupProfileEdit.open();
	popupProfileValidated.resetFormErrors();
	popupProfileValidated.disableButton();
});

buttonAvatarEdit.addEventListener('click', (evt) => {
	popupAvatarEdit.open();
	popupAvatarValidated.resetFormErrors();
	popupAvatarValidated.disableButton()
})