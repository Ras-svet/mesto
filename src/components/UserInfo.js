export class UserInfo {
	constructor({nameSelector, jobSelector, photoSelector}) {
		this._name = document.querySelector(nameSelector);
		this._job = document.querySelector(jobSelector);
		this._avatar = document.querySelector(photoSelector)
	}
	getUserInfo() {
		const userInfo = {
			name: this._name.textContent,
			job: this._job.textContent,
		}
		return userInfo
	}
	setUserInfo({name, about, avatar}) {
		this._name.textContent = name;
		this._job.textContent = about;
		this._avatar.src = avatar;
		this._avatar.alt = name
	}
}