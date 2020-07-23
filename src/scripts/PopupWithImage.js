import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(selector, text, link) {
      super();
      this._selector = selector;
      this._text = text;
      this._link = link;
    }

    open(){
        const imageElement = this._selector.querySelector('.popup__image');
        const imageCaption = this._selector.querySelector('.popup__caption');
        imageElement.src = this._link;
        imageCaption.innerText = this._text;
    }

}

export default PopupWithImage;