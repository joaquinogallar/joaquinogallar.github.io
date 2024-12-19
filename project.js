import ProjectService from "./main.js";

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");
console.log(id);

const title = document.getElementById("project-title");

(async () => {
  const proj = await ProjectService.findById(parseInt(id)); // id came as a a string, so I need to parse it to an integer for the method to work

  title.textContent += ` - ${proj.title}`;
})();
