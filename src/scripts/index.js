import Card from "./card.js";
import CardsList from "./cardsList.js";
import Filter from "./filters.js";

import { coursesData, coursesCategories } from "../data.js";

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
  cardsList.renderItems();
  filter.renderItems();
});
