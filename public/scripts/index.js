import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import '../pages/index.css';
import '../images/logo.svg';

// Врапперы
const placesWrap = document.querySelector('.places__list');
const editFormModalWindow = document.querySelector('.popup_type_edit');
const cardFormModalWindow = document.querySelector('.popup_type_new-card');
// С submit ребята еще плохо работают.

// Кнопки и прочие дом узлы
const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');

// Данные форм и элементы форм
const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// решение на минималках. Конечно, студент может корректно обобрать велью инпутов в форме.

const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

openEditFormButton.addEventListener('click', () => {
  const userInfo = new UserInfo(profileTitle, profileDescription);
  const popup = new PopupWithForm(editFormModalWindow, userInfo.setUserInfo);
  titleInputValue.value = userInfo.getUserInfo().name;
  descriptionInputValue.value = userInfo.getUserInfo().description;
  popup.open();
  popup.setEventListeners();
});

openCardFormButton.addEventListener('click', () => {
  const popup = new PopupWithForm(cardFormModalWindow, Card.prototype.renderCard);
  popup.open();
  popup.setEventListeners();
});

const cardSection = new Section({items: Card.prototype.getInitialCards(), renderer: Card.prototype.renderCard}, placesWrap);
cardSection.drawElements();

const editFormValidator = new FormValidator(defaultFormConfig, editFormModalWindow);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormModalWindow);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
