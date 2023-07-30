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
// переменные для открытия карточки на полный экран
const popupFullPicture = document.querySelector(".popup_type_fullscreen");
const titleFullPicture = popupFullPicture.querySelector(".popup__text");
const photoFullPicture = popupFullPicture.querySelector(".popup__picture");
const buttonCloseFullPicture = popupFullPicture.querySelector(".popup__close-button");

// открытие popup
export function openPopup (popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupByEsc);
	popup.addEventListener('click', closePopupByOverlay);
}

// изменение инфрормации профиля
function handleEditFormSubmit (evt) {
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
	const newCard = createCard({name: titleCardInput.value, link: srcCardInput.value}, '#element', handleFullCardPopup);
	elementCards.prepend(newCard);
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
		closePopup(evt.currentTarget);
	}
}

function handleFullCardPopup(name, link) {
	titleFullPicture.textContent = name;
	photoFullPicture.src = link;
	photoFullPicture.alt = name;
	openPopup(popupFullPicture)
}

function createCard(data, selector, func) {
	const card = new Card(data, selector, func);
	const cardElement = card.createCard();
	return cardElement
} 

// отрисовка карточек из массива
initialElements.forEach((item) => {
	const newCard = createCard(item, '#element', handleFullCardPopup);
	elementCards.append(newCard);
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
	popupCardValidated.resetFormErrors();
	popupCardValidated.disableButton();
})
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));

buttonEditProfile.addEventListener('click', () => {
	openPopup(popupProfile);
	popupProfileValidated.resetFormErrors();
	popupProfileValidated.disableButton();
});
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
buttonCloseFullPicture.addEventListener('click', () => closePopup(popupFullPicture));

formProfileElement.addEventListener('submit', handleEditFormSubmit);
formCardElement.addEventListener('submit', (evt) => {
	addCard(evt);
	closePopup(popupCard);
})