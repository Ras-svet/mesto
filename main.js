(()=>{"use strict";class e{constructor(e,t,s,n,r,o,i,l){this._addLike=r,this._deleteLike=o,this._personalId=n,this._cardId=e._id,this._ownerId=e.owner._id,this._likesNumber=e.likes,this._link=e.link,this._title=e.name,this._template=t,this._openFullScreen=s,this._removeCard=i,this._popupDeletionConfirm=l}_getTemplate(){return document.querySelector(this._template).content.querySelector(".element").cloneNode(!0)}_setEventListeners(){this._cardDeleteButton.addEventListener("click",(()=>{this._popupDeletionConfirm.open(this._cardId,this)})),this._cardElement.querySelector(".element__image").addEventListener("click",(()=>{this._openFullScreen(this._title,this._link)})),this._cardElement.querySelector(".element__like-button").addEventListener("click",(e=>{this._like(e)}))}deleteCard(){this._cardElement.remove()}_checkDeleteAbility(){this._ownerId!==this._personalId&&this._cardDeleteButton.remove()}_like(e){e.target.classList.contains("element__like-button_active")?(e.target.classList.remove("element__like-button_active"),this._deleteLike(this._cardId,this._likesContainer)):(e.target.classList.add("element__like-button_active"),this._addLike(this._cardId,this._likesContainer))}_showLikedCard(){console.log(this._likesNumber),console.log(this._personalId),this._likesNumber.hasOwnProperty(this._personalId)?this._cardElement.querySelector(".element__like-button").classList.add("element__like-button_active"):this._cardElement.querySelector(".element__like-button").classList.remove("element__like-button_active")}updateLikesNumber(e){this._cardElement.querySelector(".element__like-number").textContent=e.length}createCard(){return this._cardElement=this._getTemplate(),this._likesContainer=this._cardElement.querySelector(".element__like-number"),this._cardDeleteButton=this._cardElement.querySelector(".element__trash"),this._cardImage=this._cardElement.querySelector(".element__image"),this._cardElement.querySelector(".element__title").textContent=this._title,this.updateLikesNumber(this._likesNumber),this._cardImage.src=this._link,this._cardImage.alt=this._title,this._checkDeleteAbility(),this._showLikedCard(),this._setEventListeners(),this._cardElement}}class t{constructor(e,t){this._form=t,this._submitButton=e.submitButtonSelector,this._input=e.inputSelector,this._inputErr=e.inputErrorClass,this._buttonInactive=e.inactiveButtonClass,this._inputList=Array.from(this._form.querySelectorAll(this._input)),this._buttonElement=this._form.querySelector(this._submitButton)}_showInputError(e,t){const s=this._form.querySelector(`#${e.name}-error`);e.classList.add(this._inputErr),s.textContent=t}_hideInputError(e){this._form.querySelector(`#${e.name}-error`).textContent="",e.classList.remove(this._inputErr)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_enableButton(){this._buttonElement.classList.remove(this._buttonInactive),this._buttonElement.disabled=!1}_toggleButton(){this._hasInvalidInput()?this.disableButton():this._enableButton()}_setEventListeners(){this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButton()}))}))}disableButton(){this._buttonElement.classList.add(this._buttonInactive),this._buttonElement.disabled=!0}resetFormErrors(){this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}class s{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this),this._button=this._popup.querySelector(".popup__close-button")}_handleEscClose(e){"Escape"===e.key&&this.close()}_handleOverlayClose(e){e.target===e.currentTarget&&this.close()}setEventListeners(){this._popup.addEventListener("click",(e=>{this._handleOverlayClose(e)})),this._button.addEventListener("click",(()=>{this.close()}))}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class n extends s{constructor(e,t){super(e),this._handleForm=t,this._form=this._popup.querySelector(".popup__forms"),this._inputList=this._form.querySelectorAll(".popup__field"),this._saveButton=this._popup.querySelector(".popup__save-button")}_getInputValues(){const e={};return this._inputList.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(()=>{const e=this._getInputValues();this._handleForm(e)}))}close(){super.close(),this._form.reset()}loading(e){this._saveButton.textContent=e}}const r={inputSelector:".popup__field",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__field_type_error"},o=document.querySelector(".popup_type_profile"),i=document.querySelector('[name="user-information"]'),l=i.querySelector(".popup__field_type_name"),_=i.querySelector(".popup__field_type_job"),a=document.querySelector(".profile__edit-button"),c=document.querySelector(".popup_type_card"),h=c.querySelector(".popup__save-button"),u=document.querySelector(".profile__add-button"),d=new class extends s{constructor(e){super(e),this._photo=this._popup.querySelector(".popup__picture"),this._title=this._popup.querySelector(".popup__text")}open(e,t){super.open(),this._photo.src=t,this._photo.alt=e,this._title.textContent=e}}(".popup_type_fullscreen");d.setEventListeners();const p=new n(".popup_type_card",(function(e){p.loading("Сохранение..."),console.log(h.textContent),v.addCard(e.name,e.link).then((e=>{const t=y(e,"#element",S,b,g,C,L,E);f.addItem(t),p.close(),p.loading("Создать")})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}));p.setEventListeners();const m=new n(".popup_type_profile",(function(e){k.setUserInfo(e)}));m.setEventListeners();const E=new class extends s{constructor(e,t){super(e),this._removeCard=t,this._saveButton=this._popup.querySelector(".popup__save-button")}open(e,t){super.open(),this._cardId=e,this._card=t}setEventListeners(){super.setEventListeners(),this._saveButton.addEventListener("click",(()=>{this._removeCard(this._cardId,this._card)}))}loading(e){this._saveButton.textContent=e}}(".popup_type_deletion",L);E.setEventListeners();const v=new class{constructor({url:e,headers:t}){this._url=e,this._headers=t}_checkResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getUserInfo(){return fetch(`${this._url}/users/me`,{headers:this._headers}).then(this._checkResponse)}getCards(){return fetch(`${this._url}/cards`,{headers:this._headers}).then(this._checkResponse)}addLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then(this._checkResponse)}removeLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}addCard(e,t){return fetch(`${this._url}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}deleteCard(e){return fetch(`${this._url}/cards/${e}`,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}}({url:"https://mesto.nomoreparties.co/v1/cohort-74",headers:{authorization:"c55a96e6-da21-4263-9b88-67e69c11521a","Content-Type":"application/json"}});let b;Promise.all([v.getUserInfo(),v.getCards()]).then((([e,t])=>{k.setUserInfo(e),b=e._id,t.forEach((e=>{const t=y(e,"#element",S,b,g,C,L,E);f.addItemByAppend(t)}))})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}));const k=new class{constructor({nameSelector:e,jobSelector:t}){this._name=document.querySelector(e),this._job=document.querySelector(t)}getUserInfo(){return{name:this._name.textContent,job:this._job.textContent}}setUserInfo(e){this._name.textContent=e.name,this._job.textContent=e.about}}({nameSelector:".profile__name",jobSelector:".profile__job"});function y(t,s,n,r,o,i,l,_){return new e(t,s,n,r,o,i,l,_).createCard()}function L(e,t){v.deleteCard(e).then((e=>{t.deleteCard(),E.close()})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}const f=new class{constructor({renderer:e},t){this._renderer=e,this._container=document.querySelector(t)}addItemByAppend(e){this._container.append(e)}addItem(e){this._container.prepend(e)}renderItems(e,t){this._dataArray.forEach(this._renderer),Array.isArray(e)?e.forEach((e=>{this._renderer(e,t)})):this._renderer(e)}}({renderer:e=>{const t=y(e,"#element",S,b,g,C,L,E);f.addItemByAppend(t)}},".elements");function g(e,t){v.addLike(e).then((e=>{t.textContent=e.likes.length,console.log(e.likes.length),console.log(t)})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}function C(e,t){v.removeLike(e).then((e=>{t.textContent=e.likes.length,console.log(e.likes.length),console.log(t)})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}function S(e,t){d.open(e,t)}const I=new t(r,o);I.enableValidation();const q=new t(r,c);q.enableValidation(),u.addEventListener("click",(e=>{p.open(),q.resetFormErrors(),q.disableButton()})),a.addEventListener("click",(()=>{const{name:e,job:t}=k.getUserInfo();l.value=e,_.value=t,m.open(),I.resetFormErrors(),I.disableButton()}))})();