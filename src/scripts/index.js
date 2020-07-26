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

/* По всей работе:
В целом Качественно реализованы оновные аскепты задания:
  а. изпользуются современные ES стандарты такие как,
    1. експорт/импорт модулей
    2. стрелочные функции
    3. callback функции
  б. изпользовано слабое вызивание для создания связи между классами
  в. использованые приватные методы и свойства для классов для безопасности
  г. использован wrapper класс Section
  д. класс UserInfo реализовано олтично, без излишней запутанности
  е. используеться stats.color для конфигурации webpack, которыч светами будет отрисовать процесс build а.
  ж. правильно реализован .gitignore
  з. реализован htmlhint.rc для работы с HTML

 *** Что важно исправить: ***
1. Мы используем 'closeModalWindow' в файле Card.js - строка 8. которое не объявилено,
    из за чего получаем ошибку типа ReferenceError , и код останивливаеться
    причиной чего и у нас не работает закрытие Popup Клавишой ESC

    Решение: есть неколько решений которые можно реализовать
      a. метод _handleEscEvent класа Poup не сделать приватным и вызвать при keyup
      b. сделать вспомогащую функцию в папке Utils, которого пока нету. и использовать импортировав оттуда.

2. для корретной очереди render а стрнаницы, нужно перереализовать сборку на webkack,
    на данные момент у нас сперва гружется пустой HTML, потом реализация CSS,
    из за чего на неколько секунд явно видна голая HTML верстка без CSS
    Видео демонстраиця - https://www.loom.com/share/b3991f3a465d4ecaa533ce3618493b09

    Решение:
      a. нужно в модуль css-loader добавить опцию importLoaders: 1. для приоритета загрузки модулей при процессе build
        - больше об этом -  https://webpack.js.org/loaders/css-loader/#options
      b. на понадовиться добавить в проект postcss-loader и minicssextract plugin - для оптимизации  корректной загрузки
          - больше п них https://webpack.js.org/loaders/postcss-loader/ и https://webpack.js.org/plugins/mini-css-extract-plugin/



 *** Можно лучше: ***
1. в компоненте PopupWithForm - в методе setEventListener не вызиваеться super.setEventLister
    которое будет наследовать медот setEventListener класа Popup, и мы не будем булировать код в классе PopupWithForm

2. тоже самое в компонента popupWithImage, не реализовано наследование нетодов с компонента Popup,
    а в ручную инициалирован метод open. тем же и дублируеться код.
    - пример наследование метода - super.open();

3. в классе popupWithImage можно реализовать приватную функцию _addImage , который чисто отвечает за функционал добавления каринки,
    а в методе open вызвать его , таким способом каждый метод сделает только одну функцию.
    про pure functions - https://medium.com/better-programming/what-is-a-pure-function-3b4af9352f6f

4. можно во многих местах(пр. PopupWithForm.js строка 11) использовать десктруктуризаю массивов и обьектов из ES6 ,
    тем можем избижать излишнего кода
    пример - const { name, link } = document.querySelector('form').elements;
    больше об этом - https://medium.com/better-programming/what-is-a-pure-function-3b4af9352f6f

5. нужно структурировать папки и файлы следующими вариантами
    a. переместить все класссы в папку Components
    b. Создать папку Utils,
      1. создать файл config.js переместить туда все переменные для конфигураци или для хранения даты,
            и переменные достающие DOM элементы
      2. создать файл utils.js переместить туда все вспомогающие функции

6. не реализовано методолика DRY в классе Card.js , можно сделать следуя пунтку 5.б

7. ** ГЛОБАЛЬНО **
    реализовано инициализация переменных которые в файле не используются. (пр. webpack.config.js строка 2)
    для улучшения можно использовать ESLINT с конфигурацией предуприждения в таких случаях
    тут можно прочитать - https://eslint.org/docs/rules/no-unused-vars

8. *** о Webpack
  a. инициализация модулей реализовано переменной VAR, реализуя переменной CONST будет намного безопасно
      так как instance модулю уже не будет возможно изменить
  b. подключены плагини plugin-syntax-dynamic-import и plugin-proposal-class-properties
    1. plugin-proposal-class-properties не изпользуеться в прокете нигде
    2. вместо plugin-syntax-dynamic-import можно использовать core-js,
      который подготовит polyfill не только для импорта, но и для других функционалов
  в. формат woff2 можно реализовать одним конфигом file-loader
      пример -  {
                  test: /\.(png|svg|jpg|gif|woff2)$/,
                  loader: 'file-loader'
              },
  г. не изпользуется html-loader для оптимизации HTML
  д. реализованы ненужные конфигурации такие как
      1. proxy.path: '/api/*' в настройках devServer, такое в стеке нашего проекта, излишнее
      2. historyFallbackApi
      3. openPage с пустой строкой

  д. для читабельности кода можно отдельно использовать babel.config.js и переместить все конфиги babel туда.

9. *** о остальных файлах проекта
  а. реализован ненужный yaml файла для конфигурации gitlab
  б. в файле README.MD написан не касающийся с проектом текст
  в. в файле package.json в команде build нужно с перва  прописать удалению папки финального результата(dist в нашем случая).
      например этим модулем - https://github.com/johnagan/clean-webpack-plugin

*/
