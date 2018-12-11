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
  outline: 1px solid red;
}
</style>

  <form class="outliner__form" action="">
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

function handleClick(event) {
  const target = event.target;
  switch (target.id) {
    case "btn-search":
      findByName();
      break;

    case "btn-previous":
      findPrevious();
      break;

    case "btn-next":
      findNext();
      break;

    case "btn-parent":
      findParent();
      break;

    case "btn-children":
      findChildren();
  }
}

// ============== COMMON FUNCTIONS ================

function changeElement(newElement) {
  removeOutline();
  currentElement = newElement;
  addOutline(currentElement);
}

function addOutline(element) {
  element.classList.add("outlined-element");
}

function removeOutline() {
  const element = document.querySelector(".outlined-element");
  if (element) element.classList.remove("outlined-element");
}

// ==================

function findByName() {
  outlinerForm.addEventListener("click", returnSearchKey);
  const newElement = changeElementByKey();
  changeElement(newElement);
}

function returnSearchKey() {
  const inputField = outlinerForm.querySelector(".outliner__element-name");
  return inputField.value;
}

function changeElementByKey() {
  const key = returnSearchKey();
  return document.querySelector(key);
}

// ==================

function findPrevious() {
  changeElement(currentElement.previousElementSibling);
}

// ==================

function findNext() {
  changeElement(currentElement.nextElementSibling);
}

// ==================

function findParent() {
  changeElement(currentElement.parentNode);
}

// ==================

function findChildren() {
  changeElement(currentElement.firstElementChild);
}
