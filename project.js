import ProjectService from "./main.js";

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");

const title = document.getElementById("project-title");
const pTitle = document.getElementById("p-title");

const pImg = document.getElementById("p-img");

const pDescription = document.getElementById("p-description");

(async () => {
  const proj = await ProjectService.findById(parseInt(id)); // id came as a string, so I need to parse it to an integer for the method to work

  title.textContent += ` - ${proj.title}`;
  pTitle.textContent = proj.title;
  pDescription.textContent = proj.description;

  const stepsList = document.getElementById("p-steps-list");
  proj.details.steps.forEach((step) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="p-s-list-title">${step.stepTitle}</span>: <span class="p-s-list-text">${step.stepDesc}</span>`;
    stepsList.appendChild(li);
  });
})();
