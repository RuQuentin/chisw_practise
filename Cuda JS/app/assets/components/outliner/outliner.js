/* elem.classList.add(cls) - добавляет класс
elem.classList.remove(cls) - удаляет класс
elem.classList.toggle(cls)
*/

const outlinerFormHTML = `
<style>
.outliner__form {
  padding: 5px;
  opacity: 0.9;
  background-color: palegoldenrod;
  border-radius: 3px;
  position: fixed;
  right: 50px;
  top: 50px;
}

.outliner__element-name {
  width: 187px;
  height: 20px;
  font-size: 10px;
  padding-left: 5px;
  padding-right: 5px;
}

.outliner__button {
  width: 60px;
  height: 20px;
  font-size: 10px;
  text-transform: uppercase;
}

.outliner__button-search {
}

.outlined-element {
  outline: 2px solid red;
}
</style>

  <form class="outliner__form" action="" dragable="true">
    <input
      type="text"
      name="element_name"
      placeholder=""
      class="outliner__element-name"
    />

    <button id="btn-search" class="outliner__button outliner__button-search" type="button">Search</button>

    <nav class="outliner__navigation">
      <button id="btn-previous" class="outliner__button outliner__button-previous" type="button">
        Previous
      </button>

      <button id="btn-next" class="outliner__button outliner__button-next" type="button">Next</button>

      <button id="btn-parent" class="outliner__button outliner__button-parent" type="button">Parent</button>

      <button id="btn-children" class="outliner__button outliner__button-children" type="button">
        Children
      </button>
    </nav>
  </form>
  `;

const body = document.body;

body.insertAdjacentHTML("beforeend", outlinerFormHTML);

// ============ CLICK PROCESSING ===============

let currentElement = body;
const outlinerForm = document.querySelector(".outliner__form");

outlinerForm.addEventListener("click", handleClick);

const directionPrevious = "previousElementSibling";
const directionNext = "nextElementSibling";
const directionParent = "parentNode";
const directionChildren = "firstElementChild";

const buttonIdSearch = "btn-search";
const buttonIdPrevious = "btn-previous";
const buttonIdNext = "btn-next";
const buttonIdParent = "btn-parent";
const buttonIdChildren = "btn-children";

function handleClick() {
  switch (event.target.id) {
    case buttonIdSearch:
      changeElement(findByName);
      break;
    case buttonIdPrevious:
      changeElement(findNeighbour, directionPrevious);
      break;
    case buttonIdNext:
      changeElement(findNeighbour, directionNext);
      break;
    case buttonIdParent:
      changeElement(findNeighbour, directionParent);
      break;
    case buttonIdChildren:
      changeElement(findNeighbour, directionChildren);
  }
}

// ============== MAIN FUNCTION ================

function changeElement(newElement, direction) {
  removeOutline();
  currentElement = newElement(direction);
  addOutline();
  manageButtons();
  console.log(currentElement);
}

// ============== COMMON FUNCTIONS ================

function findNeighbour(direction) {
  return currentElement[direction];
}

function addOutline() {
  currentElement.classList.add("outlined-element");
}

function removeOutline() {
  const element = document.querySelector(".outlined-element");
  if (element) element.classList.remove("outlined-element");
}

function manageButtons() {
  manageButton(directionPrevious, buttonIdPrevious);
  manageButton(directionNext, buttonIdNext);
  manageButton(directionParent, buttonIdParent);
  manageButton(directionChildren, buttonIdChildren);
}

function manageButton(direction, buttonId) {
  if (currentElement[direction]) {
    document.getElementById(buttonId).disabled = false;
  } else {
    document.getElementById(buttonId).disabled = true;
  }
}

// ============== SEARCHING BY NAME ================

function findByName() {
  outlinerForm.addEventListener("click", returnSearchKey);
  const newElement = changeElementByKey();
  return newElement;
}

function returnSearchKey() {
  const inputField = outlinerForm.querySelector(".outliner__element-name");
  return inputField.value;
}

function changeElementByKey() {
  const key = returnSearchKey();
  return document.querySelector(key);
}
