const imageModalWindow = document.querySelector('.popup_type_image');
const imageElement = imageModalWindow.querySelector('.popup__image');
const imageCaption = imageModalWindow.querySelector('.popup__caption');
const ESC_KEYCODE = 27;

const closeModalWindow = () => {
  imageModalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModalWindow);
};

const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.which === ESC_KEYCODE) {
    action(activePopup);
  }
};

// Эти функции и переменные -- дубли из index.js. Они нарушают DRY, но в следующем спринте студенты удалят этот код.
// Как "Можно лучше" посоветуйте вынести эти функции и переменные в модуль utils.js и импортировать их в класс Card.

class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button')
      .addEventListener('click', () => this._handleLikeIcon());

    this._element.querySelector('.card__delete-button')
      .addEventListener('click', () => this._handleDeleteCard());

    this._element.querySelector('.card__image')
      .addEventListener('click', () => this._handlePreviewPicture());
  }

  _handleLikeIcon() {
    this._element.querySelector('.card__like-button').
      classList.toggle('card__like-button_is-active');
  }

  _handleDeleteCard() {
    this._element.remove();

    // Посоветовать занулять элемент
    this._element = null;
  }

  _handlePreviewPicture() {
    // Студенты изучат способы описания взаимодействия между классами только в следующем спринте.
    // Эту зависимость студенты будут передавать как хендлер в конструктор класса.
    // Поэтому на данный момент они дублируют код из index.js в Card.js (Объявление переменных, функции)

    imageElement.src = this._link;
    imageElement.alt = `Изображение ${this._link}`;
    imageCaption.textContent = this._text;

    imageModalWindow.classList.add('popup_is-opened');
    document.addEventListener('keyup', handleEscUp);
  }

  getView() {
    // Публичный метод, возвращащий представление карточки;
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._text;

    return this._element;
  }
}

export default Card;
