import Card from "./card.js";
import CardsList from "./cardsList.js";
import Filter from "./filters.js";

import { coursesData, coursesCategories } from "../data.js";
import { debounce } from "./debounce.js";

const courseGroups = Object.groupBy(coursesData, ({ category }) => category);
const courseCounts = Object.entries(courseGroups).map(([key, array]) => ({
  id: key,
  label: coursesCategories.get(key).label,
  count: array.length,
}));
const courseTotal = coursesData.length;

function createCard(course) {
  const cardElement = new Card(course);
  return cardElement.generateCard();
}

function applyFilter(type) {
  if (type === "all") {
    cardsList.resetFilter();
  } else {
    cardsList.filterItems((item) => item.category === type);
  }
}

function search(event) {
  const query = event.target.value.toLowerCase();
  if (query === "") {
    cardsList.resetFilter();
  } else {
    cardsList.filterItems(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query),
    );
  }
}

const debouncedSearch = debounce(search, 400);

const cardsList = new CardsList(
  {
    items: coursesData,
    renderer: createCard,
  },
  ".courses",
);

const filter = new Filter(
  courseCounts,
  courseTotal,
  applyFilter,
  ".filters__list",
);

window.addEventListener("load", (event) => {
  document
    .querySelector(".search__input")
    .addEventListener("input", debouncedSearch);

  cardsList.renderItems();
  filter.renderItems();
});
