// Estimated reading speed of 200 words per minute.
const reading_speed = 200;


/*
 * Given a string, returns the word-count.
 */
function count_words(str) {
  let matches = str.match(/[\w\d]+/gi);
  return matches ? matches.length : 0;
}


/*
 * Removes the Reading Time element from the page's body.
 */
function remove_element() {
  let element = document.getElementById("reading_time_element");
  element.parentNode.removeChild(element);
}


/*
 * Adds the reading time element to the page's body with the number of minutes.
 * Styling for the element is added here.
 */
function create_element(minutes) {
  let element = document.createElement("div");
  element.classList.add("reading_time_element");

  let exit = document.createElement("div");
  exit.classList.add("reading_time_element_exit");

  element.innerText = minutes + " min";
  exit.innerText = "x";

  element.id = "reading_time_element";
  exit.id = "reading_time_exit";

  element.addEventListener("click", remove_element);

  element.appendChild(exit);
  document.body.appendChild(element);
}


/*
 * Only count words and create the element once given the window.onload.
 * Depending on page, can take awhile for window.onload to be given.
 */
let word_count = count_words(document.body.innerText);
let reading_time = Math.round(word_count / reading_speed);

if (reading_time > 0) {
  create_element(reading_time);
}
