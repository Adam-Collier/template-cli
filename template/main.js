document.addEventListener("DOMContentLoaded", function(event) {
  let includes = document.querySelectorAll("[data-include]");
  if (includes) {
    includes.forEach(x => {
      let file = `views/${x.dataset.include}.html`;
      fetch(file)
        .then(response => response.text())
        .then(data => (x.innerHTML = data));
    });
  } else {
    console.log("there are no includes on the page");
  }
});
