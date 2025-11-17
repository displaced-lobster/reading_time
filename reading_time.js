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
function create_element(minutes, auto_hide_delay) {
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

  // Auto-hide element after delay if configured (convert seconds to milliseconds)
  if (auto_hide_delay > 0) {
    dissapear_after_delay(element, auto_hide_delay);
  }
}


/*
 * Count words for all instances of a specific element and return
 * the count.
 */
function count_words_by_element_name(element_name) {
  let word_count = 0;
  let elements = document.getElementsByTagName(element_name);

  for (i = 0; i < elements.length; i++) {
    word_count += count_words(elements[i].innerText);
  }

  return word_count;
}

function show_reading_time(reading_speed, popup_when_minutes_over, auto_hide_delay) {
  // Count all words in body of document
  let word_count = count_words(document.body.innerText);

  // Less all words in navigation elements
  word_count -= count_words_by_element_name("nav");

  // Less all words in header elements
  word_count -= count_words_by_element_name("header");

  // Less all words in footer elements
  word_count -= count_words_by_element_name("footer");

  // Estimated reading time
  let reading_time = Math.round(word_count / reading_speed);

  // Spawn reading time element
  if (reading_time >= popup_when_minutes_over) {
    create_element(reading_time, auto_hide_delay);
  }
}

function dissapear_after_delay(element, delay) {
  setTimeout(() => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }, delay);
}

const settings = browser.storage.sync;
Promise.all([
    settings.get("reading_speed"),
    settings.get("popup_when_minutes_over"),
    settings.get("domain_blacklist"),
    settings.get("auto_hide_delay"),
  ])
  .then(r => {
    const reading_speed = r[0]?.reading_speed || 200;
    const popup_when_minutes_over = r[1]?.popup_when_minutes_over || 0;
    const domain_blacklist = r[2]?.domain_blacklist || [];
    const auto_hide_delay = r[3]?.auto_hide_delay || 0;

    if (!domain_blacklist.includes(window.location.hostname)) {
      show_reading_time(reading_speed, popup_when_minutes_over, auto_hide_delay);
    }
  });
