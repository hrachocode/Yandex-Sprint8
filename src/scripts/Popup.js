const ESC_KEYCODE = 27;

class Popup {

    constructor(selector) {
      this._selector = selector;
      this.open = this.open.bind(this);
      /* Можно Лучше: здесь можно обойтись без байдинга.
          если есть смысл использовать, то можно обходить байдинг изменив
          метод open на стрелочную функциую
          open = () => { ...code }
      */
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
    }
}

/* класс Popup может только ответить за открытия-закрытия и инициализации listener ов
    а функционал реализации закрытив при клике ESC можно переместить в папку utils
*/

export default Popup;
