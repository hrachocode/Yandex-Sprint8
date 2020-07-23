const ESC_KEYCODE = 27;

class Popup {
    
    constructor(selector) {
      this._selector = selector;
      this.open = this.open.bind(this);
    }

    open(){
        this._selector.classList.add('popup_is-opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close(){
        this._selector.classList.remove('popup_is-opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        evt.preventDefault();
        
        this._isEscEvent(evt, close);
    };

    _isEscEvent = (evt, action) => {
        const activePopup = document.querySelector('.popup_is-opened');
        if (evt.which === ESC_KEYCODE) {
          action(activePopup);
        }
    };

    setEventListeners(){        
        this._selector.addEventListener('click', () => {
            this.open();
        });
          
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }
}

export default Popup;