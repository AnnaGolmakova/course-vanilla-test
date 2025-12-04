/**
 * Отвечает за отрисовку элементов на странице.
 * @constructor
 * @param {Array<{id:string, label: string, counter: number}>} items - Массив данных, которые нужно добавить на страницу при инициализации класса.
 * @param {number} totals - Кол-во элементов в пункте "All"
 * @param {(id: string) => void} callback - Функция, которая вызывается при выборе фильтра
 * @param {string} selector - Cелектор контейнера, в который нужно добавлять созданные элементы.
 * @param {string} templateSelector - Cелектор шаблона для создания вкладок
 */

class Filter {
  constructor(
    items,
    totals,
    callback,
    selector = ".filters",
    templateSelector = "#filter-template",
  ) {
    this._initialArray = items;
    this.totals = totals;
    this._callback = callback;
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
    filter.querySelector("input").addEventListener("change", () => {
      this._callback(item.id);
    });

    return filter;
  }

  renderItems() {
    this._container.querySelector(".filter-button__counter").textContent =
      this.totals;
    this._container.querySelector("input").addEventListener("change", () => {
      this._callback("all");
    });
    this._initialArray.forEach((item) => {
      this._container.append(this._render(item));
    });
  }
}

export default Filter;
