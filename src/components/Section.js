export class Section {
	constructor({renderer}, selector) {
		this._renderer = renderer;
		this._container = document.querySelector(selector)
	}
	addItemByAppend(element) {
		this._container.append(element)
	}
	addItem(element) {
		this._container.prepend(element)
	}
	renderItems(cards) {
		cards.forEach((card) => {
			this._renderer(card)
		})
	}
}