import Popup from './Popup.js';
const placesWrap = document.querySelector('.places__list');

class PopupWithForm extends Popup {
    constructor(selector, formSubmitFunction) {
      super();
      this._selector = selector;
      this._formSubmitFunction = formSubmitFunction;
    }

    _getInputValues(selector){
        if(selector === 'user'){
            const onwerNameInput = document.querySelector('#owner-name') ? document.querySelector('#owner-name').value : null;
            const ownerDescInput = document.querySelector('#owner-description') ? document.querySelector('#owner-description').value : null;

            return {name: onwerNameInput, description: ownerDescInput};
        }
        else if(selector === 'image'){
            const placeNameInput = document.querySelector('#place-name') ? document.querySelector('#place-name').value : null;
            const placeLinkInput = document.querySelector('#place-link') ? document.querySelector('#place-link').value : null;

            return {name: placeNameInput, link: placeLinkInput};
        }
    }

    _submitListener = () => {
        this.removeEventListeners();
        if(this._getInputValues('image').name){
            this._formSubmitFunction(this._getInputValues('image'), placesWrap);
        }
        this.close();
    }
    
    close(){
        this._selector.classList.remove('popup_is-opened');
        document.removeEventListener('keyup', this._handleEscClose);
        document.querySelector('.popup__form').reset();
    }

    removeEventListeners(){
        const imageForm = document.getElementsByClassName('popup__form')[1];
        imageForm.removeEventListener('submit', this._submitListener, false);
    }

    setEventListeners(){
        const userForm = document.getElementsByClassName('popup__form')[0];
        const imageForm = document.getElementsByClassName('popup__form')[1];

        this._selector.addEventListener('click', () => {
            this.open();
        });         
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });

        userForm.addEventListener('submit', () => {
            if(this._getInputValues('user').name){
                this._formSubmitFunction(this._getInputValues('user'));
            }
            this.close();
        });

        imageForm.addEventListener('submit', this._submitListener, false);

    }

}

export default PopupWithForm;