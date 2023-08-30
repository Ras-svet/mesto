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

let personalId

Promise.all([api.getUserInfo(), api.getCards()])
	.then(([userData, cards]) => {
		userProfile.setUserInfo(userData);
		userProfile.setUserPhoto(userData);
		personalId = userData._id
		cards.forEach(card => {
			const cardElement = createCard(card);
			initialCardsList.addItemByAppend(cardElement)
		})
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
	const card = new Card(data, '#element', handleCardClick, personalId, handleLikeAdd, handleLikeRemove, removeCard, popupCardDelete);
	const cardElement = card.createCard();
	return cardElement
} 

// добавление новой карточки
function addCard(data) {
	popupCardAdd.loading('Сохранение...');
	api.addCard(data.name, data.link)
	.then(data => {
		const newCard = createCard(data);
		initialCardsList.addItem(newCard);
		popupCardAdd.close();
		popupCardAdd.loading('Создать')
	})
	.catch(err => {
		console.log(`Ошибка при отправке запроса ${err}`)
	})
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

// лайк карточки
function handleLikeAdd(cardId, likesContainer) {
	api.addLike(cardId)
	.then(response => {
		likesContainer.textContent = response.likes.length;
	})
	.catch(err => {
		console.log(`Ошибка при отправке запроса ${err}`)
	})
}

// удалени лайка
function handleLikeRemove(cardId, likesContainer) {
	api.removeLike(cardId)
	.then(response => {
		likesContainer.textContent = response.likes.length;
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
	popupProfileEdit.loading('Сохранение...')
	api.changeUserInfo(body)
	.then(userData => {
		userProfile.setUserInfo(userData);
		popupProfileEdit.close();
		popupProfileEdit.loading('Сохранить')
	})
}

// изменение аватара
function changeAvatar(body) {
	popupAvatarEdit.loading('Сохранение...')
	api.changeAvatar(body)
	.then(userData => {
		userProfile.setUserPhoto(userData);
		popupAvatarEdit.close();
		popupAvatarEdit.loading('Сохранить')
	})
	.catch(err => {
		console.log(`Ошибка при отправке запроса ${err}`)
	})
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