export class UserInfo {
	constructor({name, job}) {
		this._name = document.querySelector(name);
		this._job = document.querySelector(job);
	}
	getUserInfo() {
		const userInfo = {
			name: this._name.textContent,
			job: this._job.textContent
		}
		return userInfo
	}
	setUserInfo(data) {
		this._name.textContent = data.nameUser;
		this._job.textContent = data.job;
	}
}