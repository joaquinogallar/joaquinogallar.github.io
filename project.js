import ProjectService from "./project-service.js";

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");

const title = document.getElementById("project-title");
const pTitle = document.getElementById("p-title");

const pImg = document.getElementById("p-img");

const pDescription = document.getElementById("p-description");

const stepsList = document.getElementById("p-steps-list");

const renderError = (message) => {
  pTitle.textContent = message;
  pDescription.textContent = "The requested project could not be loaded.";
  stepsList.replaceChildren();
  pImg.hidden = true;
};

(async () => {
  const projectId = Number.parseInt(id, 10);
  const proj = Number.isNaN(projectId)
    ? null
    : await ProjectService.findById(projectId);

  if (!proj) {
    renderError("Project not found");
    return;
  }

  title.textContent += ` - ${proj.title}`;
  pTitle.textContent = proj.title;
  pDescription.textContent = proj.details?.intro ?? "";

  if (proj.image) {
    pImg.src = proj.image;
    pImg.alt = `${proj.title} preview`;
    pImg.hidden = false;
  } else {
    pImg.hidden = true;
  }

  const steps = proj.details?.steps ?? [];
  steps.forEach((step) => {
    const li = document.createElement("li");
    const stepTitle = document.createElement("span");
    stepTitle.className = "p-s-list-title";
    stepTitle.textContent = step.stepTitle;

    const stepText = document.createElement("span");
    stepText.className = "p-s-list-text";
    stepText.textContent = step.stepDesc;

    li.append(stepTitle, ": ", stepText);
    stepsList.appendChild(li);
  });
})();
