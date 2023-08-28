export class Api {
	constructor({url, headers}) {
		this._url = url;
		this._headers = headers;
	}
	_checkResponse(response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(`Ошибка: ${response.status}`)
	}
	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers
		}).then(this._checkResponse)
	}
	getCards() {
		return fetch(`${this._url}/cards`, {
			headers: this._headers
		}).then(this._checkResponse)
	}
}