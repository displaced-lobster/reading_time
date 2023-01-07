const DEBUG = false;

console.log(window.location.hostname)


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

  let content = document.createElement("span");
  content.classList.add("reading_time_element_content");

  if (minutes >= 1) {
    content.innerText = minutes + " min";
  } else {
    content.innerText = "<1 min"
  }

  element.id = "reading_time_element";

  element.addEventListener("click", remove_element);

  element.appendChild(content);
  document.body.appendChild(element);
}


/*
 * Count words for all instances of a specific element and return
 * the count.
 */
function count_words_by_element_name(element_name) {
  let word_count = 0;
  let elements = document.getElementsByTagName(element_name);
  DEBUG && console.log(element_name, "count:", elements.length);

  for (i = 0; i < elements.length; i++) {
    word_count += count_words(elements[i].innerText);
  }

  DEBUG && console.log(element_name, "word count:", word_count);
  return word_count;
}


const settings = browser.storage.sync;
Promise.all([
    settings.get("reading_speed"),
    settings.get("popup_when_minutes_over"),
    settings.get("domain_blacklist"),
  ])
  .then(r => {
    const reading_speed = r[0]?.reading_speed || 200;
    const popup_when_minutes_over = r[1]?.popup_when_minutes_over || 0;
    const domain_blacklist = r[2]?.domain_blacklist || [];

    if (!domain_blacklist.includes(window.location.hostname)) {
      show_reading_time(reading_speed, popup_when_minutes_over);
    }
  });


function show_reading_time(reading_speed, popup_when_minutes_over) {
  DEBUG && console.log("reading_speed", reading_speed);
  DEBUG && console.log("popup_when_minutes_over", popup_when_minutes_over);

  // Count all words in body of document
  let word_count = count_words(document.body.innerText);
  DEBUG && console.log("Body word count:", word_count);

  // Less all words in navigation elements
  word_count -= count_words_by_element_name("nav");

  // Less all words in header elements
  word_count -= count_words_by_element_name("header");

  // Less all words in footer elements
  word_count -= count_words_by_element_name("footer");
  DEBUG && console.log("Word count:", word_count);

  // Estimated reading time
  let reading_time = Math.round(word_count / reading_speed);
  DEBUG && console.log("Reading time:", reading_time);

  // Spawn reading time element
  if (reading_time >= popup_when_minutes_over) {
    create_element(reading_time);
  }
}
