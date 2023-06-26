// переменные для popup профиля
const popupProfile = document.querySelector(".popup_type_profile");
const formProfileElement = document.querySelector('[name="user-information"]');
const nameInput = formProfileElement.querySelector(".popup__field_type_name");
const jobInput = formProfileElement.querySelector(".popup__field_type_job");
const closePopupProfile = popupProfile.querySelector(".popup__close-button");
const editProfile = document.querySelector(".profile__edit-button");
const personName = document.querySelector(".profile__name");
const personJob = document.querySelector(".profile__job");
// переменные для poopup добавления карточки
const popupCard = document.querySelector(".popup_type_card")
const formCardElement = document.querySelector('[name="card-information"]');
const titleCardInput = popupCard.querySelector(".popup__field_type_title");
const srcCardInput = popupCard.querySelector(".popup__field_type_src")
const closePopupCard = popupCard.querySelector(".popup__close-button");
const addPopupCard = document.querySelector(".profile__add-button");
// переменные для открытия карточки в полноэкранный режим
const popupFullPicture = document.querySelector(".popup_type_fullscreen");
const titleFullPicture = popupFullPicture.querySelector(".popup__text");
const photoFullPicture = popupFullPicture.querySelector(".popup__picture");
const closeButtonFullPicture = popupFullPicture.querySelector(".popup__close-button");
// открытие popup
function openPopup (popup) {
	popup.classList.add('popup_opened')
}
// изменение инфрормации профиля
function handleFormSubmit (evt) {
	evt.preventDefault(); 
	let name = nameInput.value;
	let job = jobInput.value;
	personName.textContent = name;
	personJob.textContent = job;
	closePopup(popupProfile);
}
// добавление новой карточки
function createCard (evt) {
	evt.preventDefault();
	const newCard = {name: titleCardInput.value, link: srcCardInput.value}
	console.log(newCard)
	addCard(newCard)
	closePopup(popupCard)
	return addCard
}
// отрисовка карточек
function addCard(element) {
	const elementCards = document.querySelector('.elements');
	const elementTemplate = document.querySelector('#element').content;
	const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
	elementCard.querySelector('.element__trash').addEventListener('click', () => {
		elementCard.remove()
	})
	elementCard.querySelector('.element__title').textContent = element.name;
	elementCard.querySelector('.element__image').src = element.link;
	elementCard.querySelector('.element__image').addEventListener('click', () => {
		openPopup(popupFullPicture);
		createFullscreen(element.link, element.name);
	})
	elementCard.querySelector('.element__like').addEventListener('click', (evt) => {
		evt.target.classList.toggle('element__like_active')
	})
	elementCards.append(elementCard);
}
// закрытие popup
function closePopup (popup) {
	popup.classList.remove('popup_opened')
}
// добавление информации для открытия карточки
function createFullscreen(link, name) {
	titleFullPicture.textContent = name;
	photoFullPicture.src = link;
}
// отрисовка карточек из массива
initialElements.forEach(addCard)
// наполнение popup профиля изначальными значениями
editProfile.addEventListener('click', function() {
	nameInput.value = personName.textContent;
	jobInput.value = personJob.textContent;
})

addPopupCard.addEventListener('click', () => openPopup(popupCard))
closePopupCard.addEventListener('click', () => closePopup(popupCard));

editProfile.addEventListener('click', () => openPopup(popupProfile));
closePopupProfile.addEventListener('click', () => closePopup(popupProfile));

formProfileElement.addEventListener('submit', handleFormSubmit);
formCardElement.addEventListener('submit', createCard);

closeButtonFullPicture.addEventListener('click', () => closePopup(popupFullPicture));