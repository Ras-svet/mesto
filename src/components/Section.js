export class Section{
	constructor({items, renderer}, selector) {
		this._dataArray = items;
		this._renderer = renderer;
		this._container = document.querySelector(selector);
	}
	addItemByAppend(element) {
		this._container.append(element)
	}
	addItemByPrepend(element) {
		this._container.prepend(element)
	}
	renderItems() {
		this._dataArray.forEach((item) => {
			this._renderer(item)
		})
	}
}