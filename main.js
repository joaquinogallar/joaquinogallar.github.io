const URL_PROJECTS = "./assets/data.json";
const d = document;

class ProjectService {
  static async fetchProjects() {
    try {
      const response = await fetch(URL_PROJECTS);
      if (!response.ok) {
        throw new Error("Can not load projects");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }
}

// render porjects class
class ProjectRenderer {
  constructor(containerSelector) {
    this.$container = d.querySelector(containerSelector);
  }

  _createProjectImage(imageUrl) {
    const projImg = d.createElement("img");
    projImg.classList.add("me-e-c-img");
    projImg.src = imageUrl;
    return projImg;
  }

  _createTextContainer(title, description) {
    const textContainer = d.createElement("div");
    textContainer.classList.add("me-e-i-text");

    const projTitle = d.createElement("h3");
    projTitle.textContent = title;
    projTitle.classList.add("project-title");

    const projDescription = d.createElement("p");
    projDescription.classList.add("roboto-mono");
    projDescription.textContent = description;

    textContainer.append(projTitle, projDescription);
    return textContainer;
  }

  _createTechContainer(techs) {
    const techContainer = d.createElement("div");
    techContainer.classList.add("me-e-i-techs");

    const techTitle = d.createElement("h3");
    techTitle.classList.add("project-title");
    techTitle.textContent = "Technologies";
    techContainer.appendChild(techTitle);

    const techsContainer = d.createElement("div");
    techsContainer.classList.add("me-e-t-images");

    techs.forEach((tech) => {
      const tImg = d.createElement("img");
      tImg.src = `./assets/img/techs/${tech}.svg`;
      techsContainer.appendChild(tImg);
    });

    techContainer.appendChild(techsContainer);
    return techContainer;
  }

  _createLinksContainer(githubLink, projectId) {
    const linksContainer = d.createElement("div");
    linksContainer.classList.add("me-e-i-links");

    const ghImg = d.createElement("img");
    ghImg.src = "./assets/img/techs/github.svg";

    const ghLink = d.createElement("a");
    ghLink.id = "gh-link";
    ghLink.href = githubLink;
    ghLink.target = "_blank";
    ghLink.append(ghImg, " GitHub");

    const moreLink = d.createElement("a");
    moreLink.id = "more-link";
    moreLink.textContent = "More...";
    moreLink.href = `./project.html/${projectId}`;

    linksContainer.append(ghLink, moreLink);
    return linksContainer;
  }

  renderProject(project) {
    const projContainer = d.createElement("div");
    projContainer.setAttribute("id", project.id);
    projContainer.classList.add("me-e-container");

    if (project.id % 2 !== 0) {
      projContainer.classList.add("odd-project");
    }

    const projImg = this._createProjectImage(project.image);

    const infoContainer = d.createElement("div");
    infoContainer.classList.add("me-e-information");

    const textContainer = this._createTextContainer(
      project.title,
      project.description
    );
    const techContainer = this._createTechContainer(project.techs);
    const linksContainer = this._createLinksContainer(
      project.github,
      project.id
    );

    infoContainer.append(textContainer, techContainer, linksContainer);
    projContainer.append(projImg, infoContainer);

    return projContainer;
  }

  async renderProjects() {
    const projects = await ProjectService.fetchProjects();

    if (projects.length === 0) {
      const emptyMessage = d.createElement("p");
      emptyMessage.id = "no-projects";
      emptyMessage.textContent = "No projects available...";
      this.$container.appendChild(emptyMessage);
    } else {
      const projectElements = projects.map((project) =>
        this.renderProject(project)
      );

      this.$container.append(...projectElements);
    }
  }
}

class ProjectPaginator {
  constructor(
    containerSelector,
    itemsPerInitialLoad = 3,
    itemsPerSubsequentLoad = 2
  ) {
    this.$container = document.querySelector(containerSelector);
    this.projects = [];
    this.itemsPerInitialLoad = itemsPerInitialLoad;
    this.itemsPerSubsequentLoad = itemsPerSubsequentLoad;
    this.currentLoadedProjects = 0;
    this.renderer = new ProjectRenderer(containerSelector);
  }

  async initialize() {
    this.projects = await ProjectService.fetchProjects();

    this.createShowMoreButton();

    this.loadMoreProjects();
  }

  createShowMoreButton() {
    const existingButton = document.getElementById("me-e-btn-more");
    if (existingButton) {
      existingButton.remove();
    }

    this.showMoreButton = document.createElement("button");
    this.showMoreButton.id = "me-e-btn-more";
    this.showMoreButton.textContent = "Show More Projects";
    this.showMoreButton.classList.add("me-e-btn-more");
    this.showMoreButton.addEventListener("click", () =>
      this.loadMoreProjects()
    );

    this.$container.after(this.showMoreButton);

    this.updateShowMoreButtonVisibility();
  }

  loadMoreProjects() {
    const projectsToLoad =
      this.currentLoadedProjects === 0
        ? this.itemsPerInitialLoad
        : this.itemsPerSubsequentLoad;

    const nextProjects = this.projects.slice(
      this.currentLoadedProjects,
      this.currentLoadedProjects + projectsToLoad
    );

    nextProjects.forEach((project) => {
      console.log(project);

      const projectElement = this.renderer.renderProject(project);
      this.$container.appendChild(projectElement);
    });

    this.currentLoadedProjects += nextProjects.length;

    this.updateShowMoreButtonVisibility();
  }

  updateShowMoreButtonVisibility() {
    if (!this.showMoreButton) return;

    if (this.currentLoadedProjects >= this.projects.length) {
      this.showMoreButton.style.display = "none";
    } else {
      this.showMoreButton.style.display = "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const projectPaginator = new ProjectPaginator(".me-experiences-container");
  projectPaginator.initialize();
});
