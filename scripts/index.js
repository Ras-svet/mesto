import { Card } from "./Card.js";
import { initialElements, config } from "./constants.js";
import { FormValidator } from "./FormValidator.js";

const elementCards = document.querySelector('.elements');
// переменные для popup профиля
const popupProfile = document.querySelector(".popup_type_profile");
const formProfileElement = document.querySelector('[name="user-information"]');
const nameInput = formProfileElement.querySelector(".popup__field_type_name");
const jobInput = formProfileElement.querySelector(".popup__field_type_job");
const buttonClosePopupProfile = popupProfile.querySelector(".popup__close-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const personName = document.querySelector(".profile__name");
const personJob = document.querySelector(".profile__job");
// переменные для poopup добавления карточки
const popupCard = document.querySelector(".popup_type_card")
const formCardElement = document.querySelector('[name="card-information"]');
const titleCardInput = popupCard.querySelector(".popup__field_type_title");
const srcCardInput = popupCard.querySelector(".popup__field_type_src")
const buttonClosePopupCard = popupCard.querySelector(".popup__close-button");
const buttonAddPopupCard = document.querySelector(".profile__add-button");

// открытие popup
export function openPopup (popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupByEsc);
	popup.addEventListener('click', closePopupByOverlay);
}

// изменение инфрормации профиля
function handleFormSubmit (evt) {
	evt.preventDefault(); 
	const name = nameInput.value;
	const job = jobInput.value;
	personName.textContent = name;
	personJob.textContent = job;
	closePopup(popupProfile);
}

// отправка формы
function addCard (evt) {
	evt.preventDefault();
	const newCard = new Card({name: titleCardInput.value, link: srcCardInput.value}, '#element');
	const newCardElement = newCard.createCard();
	elementCards.prepend(newCardElement);
}

// закрытие popup
export function closePopup (popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closePopupByEsc);
	popup.removeEventListener('click', closePopupByOverlay);
}

// закрыть попап по нажатию escape
function closePopupByEsc(evt) {
	if (evt.key === "Escape") {
		const popupOpened = document.querySelector('.popup_opened');
		closePopup(popupOpened);
	}
}

// закрыть попап по нажатию на оверлей
function closePopupByOverlay(evt) {
	if (evt.target === evt.currentTarget) {
		const popupOpened = document.querySelector('.popup_opened');
		closePopup(popupOpened);
	}
}

// отрисовка карточек из массива
initialElements.forEach((item) => {
	const card = new Card(item, '#element');
	const cardElement = card.createCard();
	elementCards.append(cardElement);
})

// создание экхемпляров форм
const popupProfileValidated = new FormValidator(config, popupProfile);
popupProfileValidated.enableValidation();

const popupCardValidated = new FormValidator(config, popupCard);
popupCardValidated.enableValidation();

// наполнение popup профиля изначальными значениями
buttonEditProfile.addEventListener('click', function() {
	nameInput.value = personName.textContent;
	jobInput.value = personJob.textContent;
})

buttonAddPopupCard.addEventListener('click', (evt) => {
	openPopup(popupCard);
	formCardElement.reset();
	popupCardValidated.resetErrorForm();
	popupCardValidated.disableFormButton();
})
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));

buttonEditProfile.addEventListener('click', () => {
	openPopup(popupProfile);
	popupProfileValidated.resetErrorForm();
	popupProfileValidated.disableFormButton();
});
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));

formProfileElement.addEventListener('submit', handleFormSubmit);
formCardElement.addEventListener('submit', (evt) => {
	addCard(evt);
	closePopup(popupCard);
})