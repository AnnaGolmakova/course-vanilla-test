import Card from "./card.js";
import CardsList from "./cardsList.js";

import { coursesData } from "../data.js";

const courseGroups = Object.groupBy(coursesData, ({ category }) => category);
const courseCounts = new Map(
  Object.entries(courseGroups).map(([key, array]) => [key, array.length]),
);
console.log(courseCounts);

function createCard(course) {
  const cardElement = new Card(course);
  return cardElement.generateCard();
}

const cardsList = new CardsList(
  {
    items: coursesData,
    renderer: createCard,
  },
  ".courses",
);

window.addEventListener("load", (event) => {
  cardsList.renderItems();
});
