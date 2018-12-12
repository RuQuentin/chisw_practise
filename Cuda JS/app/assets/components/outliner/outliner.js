const outlinerFormHTML = `
<style>
.outliner__form-wrapper {
  padding: 5px;
  opacity: 0.9;
  background-color: palegoldenrod;
  border-radius: 3px;
  position: fixed;
  left: 70%;
  top: 50px;

  display: flex;
  flex-flow: column;
}

.outliner__form {
  // background-color: palegoldenrod;
  border-radius: 3px;
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

.outliner__button-close {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: palevioletred;
  border: none;

  align-self: flex-end;
}

.outliner__button-search {
}

.outlined-element {
  outline: 2px solid red;
}
</style>

<div class="outliner__form-wrapper">
  <button id="btn-close" class="outliner__button outliner__button-close" type="button"></button>

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
  </div>
  `;

const body = document.body;

body.insertAdjacentHTML("beforeend", outlinerFormHTML);

// ============ CLICK PROCESSING ===============

let currentElement = body;

const outlinerForm = document.querySelector(".outliner__form-wrapper");

const directionPrevious = "previousElementSibling";
const directionNext = "nextElementSibling";
const directionParent = "parentNode";
const directionChildren = "firstElementChild";

const buttonIdSearch = "btn-search";
const buttonIdPrevious = "btn-previous";
const buttonIdNext = "btn-next";
const buttonIdParent = "btn-parent";
const buttonIdChildren = "btn-children";
const buttonIdClose = "btn-close";

outlinerForm.addEventListener("click", handleClick);

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
    case buttonIdClose:
      closeForm();
      break;
  }
}

// ============== MAIN FUNCTION ================

function changeElement(findElement, direction) {
  removeOutline();
  currentElement = findElement(direction);
  addOutline();
  manageButtons();
  console.log(currentElement);
}

// ============== SEARCH BY NAVIGATION ================

function findNeighbour(direction) {
  return currentElement[direction];
}

// ============== SEARCH BY NAME ================

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

// ============== MANAGE OUTLINE ================

function addOutline() {
  currentElement.classList.add("outlined-element");
}

function removeOutline() {
  const element = document.querySelector(".outlined-element");
  if (element) element.classList.remove("outlined-element");
}

// ============== MANAGE BUTTONS ================

function manageButtons() {
  manageButton(directionPrevious, buttonIdPrevious);
  manageButton(directionNext, buttonIdNext);
  manageButton(directionParent, buttonIdParent);
  manageButton(directionChildren, buttonIdChildren);
}

function manageButton(direction, buttonId) {
  document.getElementById(buttonId).disabled = !currentElement[direction];
}

// ============== CLOSE FORM ================

function closeForm() {
  outlinerForm.remove();
}

// ============== MOVE FORM ================

outlinerForm.onmousedown = function mouseDown(event) {
  var coords = getCoords(outlinerForm);
  var shiftX = event.pageX - coords.left;
  var shiftY = event.pageY - coords.top;

  outlinerForm.style.position = "absolute";
  outlinerForm.style.zIndex = 1000;

  outlinerForm.ondragstart = function() {
    return false;
  };

  function moveAt(event) {
    outlinerForm.style.left = event.pageX - shiftX + "px";
    outlinerForm.style.top = event.pageY - shiftY + "px";
  }

  moveAt(event);

  document.onmousemove = function(event) {
    moveAt(event);
  };

  outlinerForm.onmouseup = function() {
    document.onmousemove = null;
    outlinerForm.onmouseup = null;
  };
};

outlinerForm.ondragstart = function() {
  return false;
};

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
