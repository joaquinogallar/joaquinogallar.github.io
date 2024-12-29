import ProjectService from "./main.js";

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");

const title = document.getElementById("project-title");
const pTitle = document.getElementById("p-title");

const pImg = document.getElementById("p-img");

const pDescription = document.getElementById("p-description");

(async () => {
  const proj = await ProjectService.findById(parseInt(id)); // id came as a a string, so I need to parse it to an integer for the method to work

  title.textContent += ` - ${proj.title}`;
  pTitle.textContent = proj.title
  
  pDescription.textContent = proj.description
})();
