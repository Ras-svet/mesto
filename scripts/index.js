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
// переменные для открытия карточки в полноэкранный режим
const popupFullPicture = document.querySelector(".popup_type_fullscreen");
const titleFullPicture = popupFullPicture.querySelector(".popup__text");
const photoFullPicture = popupFullPicture.querySelector(".popup__picture");
const buttonCloseFullPicture = popupFullPicture.querySelector(".popup__close-button");

// открытие popup
function openPopup (popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', (evt) => {
		closePopupByEsc(evt, popup);
	})
	popup.addEventListener('click', (evt) => {
		closePopupByOverlay(evt, popup);
	})
	resetErrorForm(popup);
	disableFormButton(popup);
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
	const newCard = createCard({name: titleCardInput.value, link: srcCardInput.value});
	elementCards.prepend(newCard);
}

// отрисовка карточек
function createCard(element) {
	const elementTemplate = document.querySelector('#element').content;
	const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
	elementCard.querySelector('.element__trash').addEventListener('click', () => {
		elementCard.remove()
	})
	elementCard.querySelector('.element__title').textContent = element.name;
	elementCard.querySelector('.element__image').src = element.link;
	elementCard.querySelector('.element__image').alt = element.name;
	elementCard.querySelector('.element__image').addEventListener('click', () => {
		openPopup(popupFullPicture);
		createFullscreen(element.link, element.name);
	})
	elementCard.querySelector('.element__like').addEventListener('click', (evt) => {
		evt.target.classList.toggle('element__like_active')
	})
	return elementCard;
}

// закрытие popup
function closePopup (popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', (evt) => {
		closePopupByEsc(evt, popup);
	})
	popup.removeEventListener('click', (evt) => {
		closePopupByOverlay(evt, popup);
	})
}

// добавление информации для открытия карточки
function createFullscreen(link, name) {
	titleFullPicture.textContent = name;
	photoFullPicture.src = link;
	photoFullPicture.alt = name;
}

// очитить форму от ошибок
function resetErrorForm(popup) {
	const inputList = Array.from(popup.querySelectorAll('.popup__field'));
	inputList.forEach((inputElement) => {
		hideInputError(config, popup, inputElement)
	})
}

// деактивировать кнопку сохранения/создания при открытии попапа
function disableFormButton(popup) {
	const buttonElement = popup.querySelector('.popup__save-button');
	if (buttonElement) {
		hideButton(config, buttonElement);
	}
}

// закрыть попап по нажатию escape
function closePopupByEsc(evt, popup) {
	if (evt.key === "Escape") {
		closePopup(popup);
	}
}

// закрыть попап по нажатию на оверлей
function closePopupByOverlay(evt, popup) {
	if (evt.target === evt.currentTarget) {
		closePopup(popup);
	}
}

// отрисовка карточек из массива
initialElements.forEach((item) => elementCards.append(createCard(item)))

// наполнение popup профиля изначальными значениями
buttonEditProfile.addEventListener('click', function() {
	nameInput.value = personName.textContent;
	jobInput.value = personJob.textContent;
})

buttonAddPopupCard.addEventListener('click', (evt) => {
	openPopup(popupCard);
	formCardElement.reset();
})
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));

buttonEditProfile.addEventListener('click', () => openPopup(popupProfile));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));

formProfileElement.addEventListener('submit', handleFormSubmit);
formCardElement.addEventListener('submit', (evt) => {
	addCard(evt);
	closePopup(popupCard);
});

buttonCloseFullPicture.addEventListener('click', () => closePopup(popupFullPicture));