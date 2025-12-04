/**
 * Отвечает за отрисовку элементов на странице.
 * @constructor
 * @param {array} items - Массив данных, которые нужно добавить на страницу при инициализации класса.
 * @param {function} renderer -  Функция, которая отвечает за создание и отрисовку данных на странице.
 * @param {string} selector - Cелектор контейнера, в который нужно добавлять созданные элементы.
 */

class Filter {
  constructor(
    items,
    totals,
    selector = ".filters",
    templateSelector = "#filter-template",
  ) {
    this._initialArray = items;
    this.totals = totals;
    this._container = document.querySelector(selector);
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".filter-button")
      .cloneNode(true);

    return cardElement;
  }

  _render(item) {
    const filter = this._getTemplate();
    filter.querySelector(".filter-button__label").textContent = item.label;
    filter.querySelector(".filter-button__counter").textContent = item.count;

    return filter;
  }

  renderItems() {
    this._container.querySelector(".filter-button__counter").textContent =
      this.totals;
    this._initialArray.forEach((item) => {
      this._container.append(this._render(item));
    });
  }
}

export default Filter;
