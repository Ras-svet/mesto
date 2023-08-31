(()=>{"use strict";class e{constructor(e,t,s,n,o,r,i){this._handleLike=i,this._personalId=n,this._cardId=e._id,this._ownerId=e.owner._id,this.likesNumber=e.likes,this._link=e.link,this._title=e.name,this._template=t,this._openFullScreen=s,this._removeCard=o,this._popupDeletionConfirm=r}_getTemplate(){return document.querySelector(this._template).content.querySelector(".element").cloneNode(!0)}_setEventListeners(){this._cardDeleteButton.addEventListener("click",(()=>{this._popupDeletionConfirm.open(this._cardId,this)})),this._cardElement.querySelector(".element__image").addEventListener("click",(()=>{this._openFullScreen(this._title,this._link)})),this._likeButton.addEventListener("click",(e=>{this._handleLike(this,this._cardId,this._likesContainer)}))}deleteCard(){this._cardElement.remove()}_checkDeleteAbility(){this._ownerId!==this._personalId&&this._cardDeleteButton.remove()}like(){this._likeButton.classList.contains("element__like-button_active")?this._likeButton.classList.remove("element__like-button_active"):this._likeButton.classList.add("element__like-button_active")}_showLikedCard(){this.likesNumber.some((e=>e._id===this._personalId))?this._cardElement.querySelector(".element__like-button").classList.add("element__like-button_active"):this._cardElement.querySelector(".element__like-button").classList.remove("element__like-button_active")}updateLikesNumber(e){this._cardElement.querySelector(".element__like-number").textContent=e.length}createCard(){return this._cardElement=this._getTemplate(),this._likeButton=this._cardElement.querySelector(".element__like-button"),this._likesContainer=this._cardElement.querySelector(".element__like-number"),this._cardDeleteButton=this._cardElement.querySelector(".element__trash"),this._cardImage=this._cardElement.querySelector(".element__image"),this._cardElement.querySelector(".element__title").textContent=this._title,this.updateLikesNumber(this._likesNumber),this._cardImage.src=this._link,this._cardImage.alt=this._title,this._checkDeleteAbility(),this._showLikedCard(),this._setEventListeners(),this._cardElement}}class t{constructor(e,t){this._form=t,this._submitButton=e.submitButtonSelector,this._input=e.inputSelector,this._inputErr=e.inputErrorClass,this._buttonInactive=e.inactiveButtonClass,this._inputList=Array.from(this._form.querySelectorAll(this._input)),this._buttonElement=this._form.querySelector(this._submitButton)}_showInputError(e,t){const s=this._form.querySelector(`#${e.name}-error`);e.classList.add(this._inputErr),s.textContent=t}_hideInputError(e){this._form.querySelector(`#${e.name}-error`).textContent="",e.classList.remove(this._inputErr)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_enableButton(){this._buttonElement.classList.remove(this._buttonInactive),this._buttonElement.disabled=!1}_toggleButton(){this._hasInvalidInput()?this.disableButton():this._enableButton()}_setEventListeners(){this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButton()}))}))}disableButton(){this._buttonElement.classList.add(this._buttonInactive),this._buttonElement.disabled=!0}resetFormErrors(){this._inputList.forEach((e=>{this._hideInputError(e)}))}enableValidation(){this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}class s{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this),this._button=this._popup.querySelector(".popup__close-button")}_handleEscClose(e){"Escape"===e.key&&this.close()}_handleOverlayClose(e){e.target===e.currentTarget&&this.close()}setEventListeners(){this._popup.addEventListener("click",(e=>{this._handleOverlayClose(e)})),this._button.addEventListener("click",(()=>{this.close()}))}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class n extends s{constructor(e,t){super(e),this._handleForm=t,this._form=this._popup.querySelector(".popup__forms"),this._inputList=this._form.querySelectorAll(".popup__field"),this._saveButton=this._popup.querySelector(".popup__save-button")}_getInputValues(){const e={};return this._inputList.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(()=>{const e=this._getInputValues();this._handleForm(e)}))}close(){super.close(),this._form.reset()}loading(e){this._saveButton.textContent=e}}const o={inputSelector:".popup__field",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__field_type_error"},r=document.querySelector(".popup_type_profile"),i=document.querySelector('[name="user-information"]'),l=i.querySelector(".popup__field_type_name"),a=i.querySelector(".popup__field_type_job"),c=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_card"),_=(h.querySelector(".popup__save-button"),document.querySelector(".profile__add-button")),u=document.querySelector(".profile__avatar-edit"),d=document.querySelector(".popup_type_avatar"),p=new class extends s{constructor(e){super(e),this._photo=this._popup.querySelector(".popup__picture"),this._title=this._popup.querySelector(".popup__text")}open(e,t){super.open(),this._photo.src=t,this._photo.alt=e,this._title.textContent=e}}(".popup_type_fullscreen");p.setEventListeners();const m=new n(".popup_type_card",(function(e){m.loading("Сохранение..."),b.addCard(e.nameCard,e.link).then((e=>{const t=L(e);g.addItem(t),m.close(),m.loading("Создать")})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}));m.setEventListeners();const v=new n(".popup_type_profile",(function(e){v.loading("Сохранение..."),b.changeUserInfo(e).then((e=>{f.setUserInfo(e),v.close(),v.loading("Сохранить")}))}));v.setEventListeners();const k=new class extends s{constructor(e,t){super(e),this._removeCard=t,this._saveButton=this._popup.querySelector(".popup__save-button")}open(e,t){super.open(),this._cardId=e,this._card=t}setEventListeners(){super.setEventListeners(),this._saveButton.addEventListener("click",(()=>{this._removeCard(this._cardId,this._card)}))}loading(e){this._saveButton.textContent=e}}(".popup_type_deletion",S);k.setEventListeners();const E=new n(".popup_type_avatar",(function(e){E.loading("Сохранение..."),b.changeAvatar(e).then((e=>{f.setUserPhoto(e),E.close(),E.loading("Сохранить")})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}));E.setEventListeners();const b=new class{constructor({url:e,headers:t}){this._url=e,this._headers=t}_checkResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getUserInfo(){return fetch(`${this._url}/users/me`,{headers:this._headers}).then(this._checkResponse)}getCards(){return fetch(`${this._url}/cards`,{headers:this._headers}).then(this._checkResponse)}addLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then(this._checkResponse)}removeLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}addCard(e,t){return fetch(`${this._url}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}deleteCard(e){return fetch(`${this._url}/cards/${e}`,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}changeAvatar(e){return fetch(`${this._url}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}changeUserInfo(e){return fetch(`${this._url}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}}({url:"https://mesto.nomoreparties.co/v1/cohort-74",headers:{authorization:"c55a96e6-da21-4263-9b88-67e69c11521a","Content-Type":"application/json"}});let y;Promise.all([b.getUserInfo(),b.getCards()]).then((([e,t])=>{f.setUserInfo(e),f.setUserPhoto(e),y=e._id,t.forEach((e=>{const t=L(e);g.addItemByAppend(t)}))})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}));const f=new class{constructor({nameSelector:e,jobSelector:t,photoSelector:s}){this._name=document.querySelector(e),this._job=document.querySelector(t),this._avatar=document.querySelector(s)}getUserInfo(){return{name:this._name.textContent,job:this._job.textContent}}setUserInfo(e){this._name.textContent=e.name,this._job.textContent=e.about}setUserPhoto(e){this._avatar.src=e.avatar,this._avatar.alt=e.name}}({nameSelector:".profile__name",jobSelector:".profile__job",photoSelector:".profile__avatar"});function L(t){return new e(t,"#element",I,y,S,k,C).createCard()}function S(e,t){b.deleteCard(e).then((e=>{t.deleteCard(),k.close()})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}const g=new class{constructor({renderer:e},t){this._renderer=e,this._container=document.querySelector(t)}addItemByAppend(e){this._container.append(e)}addItem(e){this._container.prepend(e)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}}({renderer:e=>{const t=L(e);g.addItemByAppend(t)}},".elements");function C(e,t,s){console.log(e.likesNumber),e.likesNumber.some((e=>e._id===y))?(console.log("true"),function(e,t,s){b.removeLike(e).then((e=>{console.log(e),t.textContent=e.likes.length,s.likesNumber=e.likes,s.like()})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}(t,s,e)):(console.log("false"),function(e,t,s){b.addLike(e).then((e=>{console.log(e),t.textContent=e.likes.length,s.likesNumber=e.likes,s.like()})).catch((e=>{console.log(`Ошибка при отправке запроса ${e}`)}))}(t,s,e))}function I(e,t){p.open(e,t)}const q=new t(o,r);q.enableValidation();const B=new t(o,h);B.enableValidation();const w=new t(o,d);w.enableValidation(),_.addEventListener("click",(e=>{m.open(),B.resetFormErrors(),B.disableButton()})),c.addEventListener("click",(()=>{const{name:e,job:t}=f.getUserInfo();l.value=e,a.value=t,v.open(),q.resetFormErrors(),q.disableButton()})),u.addEventListener("click",(e=>{E.open(),w.resetFormErrors(),w.disableButton()}))})();