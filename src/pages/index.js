import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js"
import { Api } from "../components/Api.js";

import {
	initialElements,
	config,
	popupProfile,
	nameInput,
	jobInput,
	buttonEditProfile,
	popupCard,
	buttonAddPopupCard
} from "../utils/constants.js"

// экземпляры попапов
const popupFullCard = new PopupWithImage('.popup_type_fullscreen');
popupFullCard.setEventListeners();

const popupCardAdd = new PopupWithForm('.popup_type_card', addCard);
popupCardAdd.setEventListeners();

const popupProfileEdit = new PopupWithForm('.popup_type_profile', handleEditFormSubmit);
popupProfileEdit.setEventListeners();

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-74',
	headers: {
		authorization: 'c55a96e6-da21-4263-9b88-67e69c11521a',
		'Content-Type': 'application/json'
	}
})

const userProfile = new UserInfo({
	nameSelector: '.profile__name',
	jobSelector: '.profile__job'
});

let personalId

Promise.all([api.getUserInfo(), api.getCards()])
	.then(([userData, cards]) => {
		userProfile.setUserInfo(userData);
		personalId = userData._id
		cards.forEach(card => {
			const cardElement = createCard(card, '#element', handleCardClick, personalId);
			initialCardsList.addItem(cardElement)
		})
	})

// изменение инфрормации профиля
function handleEditFormSubmit (data) {
	userProfile.setUserInfo(data)
}

// добавление новой карточки
function addCard (data) {
	const newCard = createCard(data, '#element', handleCardClick);
	initialCardsList.addItem(newCard);
}

// отрисовка карточек из массива
const initialCardsList = new Section({
	// items: initialElements,
	renderer: (item) => {
		const newCard = createCard(item, '#element', handleCardClick, personalId);
		initialCardsList.addItemByAppend(newCard)
	}
}, '.elements')

// открытие полного экрана карточки
function handleCardClick(name, link) {
	popupFullCard.open(name, link)
}

// создание экземпляра карточки
function createCard(data, selector, func, personalId) {
	const card = new Card(data, selector, func, personalId);
	const cardElement = card.createCard();
	return cardElement
} 

// создание экземпляров форм
const popupProfileValidated = new FormValidator(config, popupProfile);
popupProfileValidated.enableValidation();

const popupCardValidated = new FormValidator(config, popupCard);
popupCardValidated.enableValidation();~

buttonAddPopupCard.addEventListener('click', (evt) => {
	popupCardAdd.open();
	popupCardValidated.resetFormErrors();
	popupCardValidated.disableButton();
})

buttonEditProfile.addEventListener('click', () => {
	const {name, job} = userProfile.getUserInfo();
	nameInput.value = name;
	jobInput.value = job
	popupProfileEdit.open();
	popupProfileValidated.resetFormErrors();
	popupProfileValidated.disableButton();
});