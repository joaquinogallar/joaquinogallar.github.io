const url = "./assets/data.json"
const d = document

const $meExperiencesContainer = d.querySelector(".me-experiences-container")
console.log();


const getProjects = async () => {
    let data = await fetch(url)
    let json = await data.json()
    json.forEach(proj => {
        // main container of the project, it contains all the information
        let projContainer = d.createElement("div")
        projContainer.setAttribute("id", proj.id)
        projContainer.classList.add("me-e-container")

        // image of the project
        let projImg = d.createElement("img")
        projImg.src = proj.image
        
        projContainer.appendChild(projImg)

        // project text and description
        let textContainer = d.createElement("div")
        textContainer.classList.add("me-e-i-text")

        let projTitle = d.createElement("h3")
        projTitle.textContent = proj.title
        projTitle.classList.add("project-title")

        let projDescription = d.createElement("p")
        projDescription.classList.add("roboto-mono")
        projDescription.textContent = proj.description

        textContainer.appendChild(projTitle)
        textContainer.appendChild(projDescription)

        // project technologies
        let techContainer = d.createElement("div")
        techContainer.classList.add("me-e-i-techs")

        let projTechsTitle = d.createElement("h3")
        projTechsTitle.classList.add("project-title")
        projTechsTitle.textContent = "Technologies"

        techContainer.appendChild(projTechsTitle)
        
        let techsContainer = d.createElement("div")
        techsContainer.classList.add("me-e-t-images")
        proj.techs.forEach(t => {
            let tImg = d.createElement("img")
            tImg.src = `./img/techs/${t}.png`
            techsContainer.appendChild(tImg)            
        })
        
        techContainer.appendChild(techsContainer)

        // buttons github and more
        let linksContainer = d.createElement("div");
        linksContainer.classList.add("me-e-i-links")

        let ghLink = d.createElement("a")
        ghLink.id = "gh-link"
        ghLink.textContent = "GitHub"
        ghLink.href = proj.github
        ghLink.target ="_blank"

        let moreLink = d.createElement("a")
        moreLink.id = "more-link"
        moreLink.textContent = "More..."
        moreLink.href = `./project.html/${proj.id}`

        linksContainer.appendChild(ghLink)
        linksContainer.appendChild(moreLink)

        // text, description and technologies container
        let infoContainer = d.createElement("div")
        infoContainer.classList.add("me-e-information")

        infoContainer.appendChild(textContainer)
        infoContainer.appendChild(techContainer)
        infoContainer.appendChild(linksContainer)

        projContainer.appendChild(infoContainer)

        $meExperiencesContainer.appendChild(projContainer)

    })
}

getProjects()