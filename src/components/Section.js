export class Section{
	constructor({renderer}, selector) {
		// this._dataArray = items;
		this._renderer = renderer;
		this._container = document.querySelector(selector);
	}
	addItemByAppend(element) {
		this._container.append(element)
	}
	addItem(element) {
		this._container.prepend(element)
	}
	renderItems(obj, userId) {
		// this._dataArray.forEach(this._renderer)
		if (Array.isArray(obj)) {
			obj.forEach(item => {
					this._renderer(item, userId);
			});
		} else this._renderer(obj);

	}
}