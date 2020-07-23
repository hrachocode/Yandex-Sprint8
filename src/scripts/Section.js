class Section {
    constructor(data, selector) {
      this._items = data.items;
      this._renderer = data.renderer;
      this._selector = selector;
    }

    drawElements(){
        this._items.forEach(item => {
            this._renderer(item, this._selector)
        })
    }

    addItem(element){
        this._selector.append(element);
    }
}

export default Section;
