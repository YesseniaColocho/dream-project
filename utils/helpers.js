export function fadeTextLetters(element) {
    element=document.querySelector(element)
  let letters = element.textContent.split("");

  while (element.hasChildNodes()) element.removeChild(element.firstChild);

  for (var i = 0; i < letters.length; i++) {
    let letter = document.createElement("span"),
      style = "opacity " + (Math.random() * 8 + 1) + "s linear";
    letter.appendChild(document.createTextNode(letters[i]));
    letter.style.WebKitTransition =
      letter.style.MozTransition =
      letter.style.MSTransition =
      letter.style.OTransition =
      letter.style.transition =
        style;
    letter.style.opacity = 0;
    element.appendChild(letter);
  }

  setTimeout(function () {
    for (let i = 0; i < element.childNodes.length; i++) {
      element.childNodes[i].style.opacity = 1;
    }
  }, 0);
}
