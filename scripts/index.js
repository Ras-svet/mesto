let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__forms");
let nameInput = formElement.querySelector(".popup__field_type_name");
let jobInput = formElement.querySelector(".popup__field_type_job");
let closeButton = document.querySelector(".popup__close-button");
let editButton = document.querySelector(".profile__edit-button");
let personName = document.querySelector(".profile__name");
let personJob = document.querySelector(".profile__job");

function closePopup() {
	popup.classList.remove('popup_opened')
}

function handleFormSubmit (evt) {
	evt.preventDefault(); 
	let name = nameInput.value
	let job = jobInput.value

	personName.textContent = name;
	personJob.textContent = job;
	closePopup();
}

editButton.addEventListener('click', function() {
	popup.classList.add('popup_opened');
	nameInput.value = personName.textContent;
	jobInput.value = personJob.textContent;
})

closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit); 