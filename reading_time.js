// Constants
// Estimated reading speed of 200 words per minute.
const reading_speed = 200;
const background_color = "black";
const font_color = "white";


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
  element.style.zIndex = "99999";
  element.style.backgroundColor = background_color;
  element.style.color = font_color;
  element.style.position = "fixed";
  element.style.right = "15pt";
  element.style.bottom = "15pt";
  element.style.textAlign = "center";
  element.style.fontSize = "25pt";
  element.style.padding = "12pt";
  element.style.opacity = "0.85";
  element.style.boxShadow = "0pt 0pt 15pt black";
  element.style.fontFamily = "Arial";
  element.style.cursor = "pointer";

  let exit = document.createElement("div");
  exit.style.position = "absolute";
  exit.style.right = "4pt";
  exit.style.top = "1pt";
  exit.style.fontSize = "12pt";
  exit.style.fontWeight = "bold";

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
window.addEventListener("load", function(event) {
  let word_count = count_words(document.body.innerText);
  let reading_time = Math.round(word_count / reading_speed) - 1;

  if (reading_time > 0) {
    create_element(reading_time);
  }
});
