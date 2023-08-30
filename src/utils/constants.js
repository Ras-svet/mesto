export const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = {
	inputSelector: '.popup__field',
	submitButtonSelector: '.popup__save-button',
	inactiveButtonClass: 'popup__save-button_disabled',
	inputErrorClass: 'popup__field_type_error',
};

// переменные для popup профиля
export const popupProfile = document.querySelector(".popup_type_profile");
export const formProfileElement = document.querySelector('[name="user-information"]');
export const nameInput = formProfileElement.querySelector(".popup__field_type_name");
export const jobInput = formProfileElement.querySelector(".popup__field_type_job");
export const buttonEditProfile = document.querySelector(".profile__edit-button");
// переменные для poopup добавления карточки
export const popupCard = document.querySelector(".popup_type_card");
export const buttonSavePopupCard = popupCard.querySelector(".popup__save-button")
export const buttonAddPopupCard = document.querySelector(".profile__add-button");
// переменные для изменения профиля
export const buttonAvatarEdit = document.querySelector(".profile__avatar-edit");
export const popupAvatar = document.querySelector(".popup_type_avatar")