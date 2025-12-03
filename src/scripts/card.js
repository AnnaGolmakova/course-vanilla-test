import { coursesCategories } from "../data.js";

/**
 * Card for some course.
 * @typedef Course
 * @property {string | number} id - Course id
 * @property {string} title - Name of the place on card.
 * @property {Category} category - Name of the place on card.
 * @property {string} price - Name of the place on card.
 * @property {string} author - Name of the place on card.
 * @property {string} imageUrl - URL for the image.
 * @property {string} templateSelector - Selector for html template.
 */

/**
 * Course category props
 * @typedef Category
 * @property {string} label - Category title
 * @property {string} color - Background color for badge
 */

/**
 * Card for some course.
 * @constructor
 * @param {Course} course - Name of the place on card.
 * @param {string} templateSelector - Selector for html template.
 */

class Card {
  constructor(course, templateSelector = "#card-template") {
    this._cardID = course.id;
    this._title = course.title;
    this._category = coursesCategories.get(course.category);
    this._price = course.price;
    this._author = course.author;
    this._imageUrl = course.imageUrl;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector(".card__image");
    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._title;

    this._card.querySelector(".card__category").textContent =
      this._category.label;
    this._card.querySelector(".card__category").style =
      `--category-color: ${this._category.color}`;

    this._card.querySelector(".card__title").textContent = this._title;
    this._card.querySelector(".card__meta-price").textContent = this._price;
    this._card.querySelector(".card__meta-author").textContent =
      `by ${this._author}`;

    return this._card;
  }

  delete() {
    this._card.remove();
  }
}

export default Card;
