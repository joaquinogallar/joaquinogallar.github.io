const URL_PROJECTS = "./assets/data.json";

export default class ProjectService {
  static async fetchProjects() {
    try {
      const response = await fetch(URL_PROJECTS);
      if (!response.ok) {
        throw new Error("Cannot load projects");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }

  static async findById(id) {
    const projects = await this.fetchProjects();
    return projects.find((project) => project.id === id) ?? null;
  }
}
