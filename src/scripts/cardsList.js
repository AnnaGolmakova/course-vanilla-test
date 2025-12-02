/**
 * Отвечает за отрисовку элементов на странице.
 * @constructor
 * @param {array} items - Массив данных, которые нужно добавить на страницу при инициализации класса.
 * @param {function} renderer -  Функция, которая отвечает за создание и отрисовку данных на странице.
 * @param {string} selector - Cелектор контейнера, в который нужно добавлять созданные элементы.
 */

class CardsList {
  constructor({ items, renderer }, selector = ".cards") {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

  setItem(item, prepend = false) {
    this.addItem(this._renderer(item), prepend);
  }

  addItem(item, prepend = false) {
    if (prepend) {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }
}

export default CardsList;
