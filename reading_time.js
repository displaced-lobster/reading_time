// Estimated reading speed of 200 words per minute.
const reading_speed = 200;
const background_color = "black";
const font_color = "white";


function count_words(str) {
  let matches = str.match(/[\w\d]+/gi);
  return matches ? matches.length : 0;
}


function remove_element() {
  console.log("function called");
  let element = document.getElementById("reading_time_element");
  element.parentNode.removeChild(element);
}


function create_element(minutes) {
  let element = document.createElement("div");
  element.style.zIndex = "99999";
  element.style.backgroundColor = background_color;
  element.style.color = font_color;
  element.style.position = "fixed";
  element.style.right = "5vh";
  element.style.bottom = "5vh";
  element.style.textAlign = "center";
  element.style.fontSize = "4vh";
  element.style.padding = "3vh";
  element.style.opacity = "0.85";

  let exit = document.createElement("div");
  exit.style.position = "absolute";
  exit.style.right = "1vh";
  exit.style.top = "1vh";
  exit.style.fontSize = "2vh";
  exit.style.cursor = "pointer";

  element.innerText = minutes + " min";
  exit.innerText = "x";

  element.id = "reading_time_element";
  exit.id = "reading_time_exit";

  exit.addEventListener("click", remove_element);

  element.appendChild(exit);
  document.body.appendChild(element);
}


window.onload = function() {
  let word_count = count_words(document.body.innerText);
  let reading_time = Math.round(word_count / reading_speed);

  console.log(word_count);
  console.log(reading_time);

  if (reading_time > 4) {
    create_element(reading_time);
  }
};
