(()=>{"use strict";class e{constructor(e,t,s,n){this._userId=n,this._link=e.link,this._title=e.name,this._template=t,this._openFullScreen=s}_getTemplate(){return document.querySelector(this._template).content.querySelector(".element").cloneNode(!0)}_setEventListeners(){this._cardElement.querySelector(".element__trash").addEventListener("click",(()=>{this._deleteCard()})),this._cardElement.querySelector(".element__image").addEventListener("click",(()=>{this._openFullScreen(this._title,this._link)})),this._cardElement.querySelector(".element__like").addEventListener("click",(e=>{this._like(e)}))}_deleteCard(){this._cardElement.remove()}_like(e){e.target.classList.toggle("element__like_active")}createCard(){return this._cardElement=this._getTemplate(),this._cardImage=this._cardElement.querySelector(".element__image"),this._cardElement.querySelector(".element__title").textContent=this._title,this._cardImage.src=this._link,this._cardImage.alt=this._title,this._setEventListeners(),this._cardElement}}class t{constructor(e,t){this._form=t,this._submitButton=e.submitButtonSelector,this._input=e.inputSelector,this._inputErr=e.inputErrorClass,this._buttonInactive=e.inactiveButtonClass,this._inputList=Array.from(this._form.querySelectorAll(this._input)),this._buttonElement=this._form.querySelector(this._submitButton)}_showInputError(e,t){const s=this._form.querySelector(`#${e.name}-error`);e.classList.add(this._inputErr),s.textContent=t}_hideInputError(e){this._form.querySelector(`#${e.name}-error`).textContent="",e.classList.remove(this._inputErr)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_enableButton(){this._buttonElement.classList.remove(this._buttonInactive),this._buttonElement.disabled=!1}_toggleButton(){this._hasInvalidInput()?this.disableButton():this._enableButton()}_setEventListeners(){this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButton()}))}))}disableButton(){this._buttonElement.classList.add(this._buttonInactive),this._buttonElement.disabled=!0}resetFormErrors(){this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}class s{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this),this._button=this._popup.querySelector(".popup__close-button")}_handleEscClose(e){"Escape"===e.key&&this.close()}_handleOverlayClose(e){e.target===e.currentTarget&&this.close()}setEventListeners(){this._popup.addEventListener("click",(e=>{this._handleOverlayClose(e)})),this._button.addEventListener("click",(()=>{this.close()}))}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class n extends s{constructor(e,t){super(e),this._handleForm=t,this._form=this._popup.querySelector(".popup__forms"),this._inputList=this._form.querySelectorAll(".popup__field")}_getInputValues(){const e={};return this._inputList.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(()=>{const e=this._getInputValues();this._handleForm(e),this.close()}))}close(){super.close(),this._form.reset()}}const r={inputSelector:".popup__field",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__field_type_error"},o=document.querySelector(".popup_type_profile"),i=document.querySelector('[name="user-information"]'),l=i.querySelector(".popup__field_type_name"),a=i.querySelector(".popup__field_type_job"),c=document.querySelector(".profile__edit-button"),p=document.querySelector(".popup_type_card"),_=document.querySelector(".profile__add-button"),u=new class extends s{constructor(e){super(e),this._photo=this._popup.querySelector(".popup__picture"),this._title=this._popup.querySelector(".popup__text")}open(e,t){super.open(),this._photo.src=t,this._photo.alt=e,this._title.textContent=e}}(".popup_type_fullscreen");u.setEventListeners();const d=new n(".popup_type_card",(function(e){const t=f(e,"#element",v);E.addItem(t)}));d.setEventListeners();const h=new n(".popup_type_profile",(function(e){y.setUserInfo(e)}));h.setEventListeners();const m=new class{constructor({url:e,headers:t}){this._url=e,this._headers=t}_checkResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getUserInfo(){return fetch(`${this._url}/users/me`,{headers:this._headers}).then(this._checkResponse)}getCards(){return fetch(`${this._url}/cards`,{headers:this._headers}).then(this._checkResponse)}}({url:"https://mesto.nomoreparties.co/v1/cohort-74",headers:{authorization:"c55a96e6-da21-4263-9b88-67e69c11521a","Content-Type":"application/json"}}),y=new class{constructor({nameSelector:e,jobSelector:t}){this._name=document.querySelector(e),this._job=document.querySelector(t)}getUserInfo(){return{name:this._name.textContent,job:this._job.textContent}}setUserInfo(e){this._name.textContent=e.nameUser,this._job.textContent=e.job}}({nameSelector:".profile__name",jobSelector:".profile__job"});Promise.all([m.getUserInfo(),m.getCards()]).then(((e,t)=>{y.setUserInfo(e),t.forEach((t=>{f(t,"#element",v,e._id)}))}));const E=new class{constructor({items:e,renderer:t},s){this._dataArray=e,this._renderer=t,this._container=document.querySelector(s)}addItemByAppend(e){this._container.append(e)}addItem(e){this._container.prepend(e)}renderItems(){this._dataArray.forEach(this._renderer)}}({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:e=>{const t=f(e,"#element",v);E.addItemByAppend(t)}},".elements");function v(e,t){u.open(e,t)}function f(t,s,n){return new e(t,s,n).createCard()}E.renderItems();const b=new t(r,o);b.enableValidation();const k=new t(r,p);k.enableValidation(),_.addEventListener("click",(e=>{d.open(),k.resetFormErrors(),k.disableButton()})),c.addEventListener("click",(()=>{const{name:e,job:t}=y.getUserInfo();l.value=e,a.value=t,h.open(),b.resetFormErrors(),b.disableButton()}))})();