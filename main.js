var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.querySelector('.projects');
            const caseStudiesContainer = document.querySelector('.case__study'); // Asegúrate de que este selector esté correctamente asignado

            // Load "case-study"
            data['case-study'].forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('case__study');
            
                projectElement.innerHTML = `
                    <a href="${project.url}">
                    <div class="project-card">
                        <img src="${project.cover__img}" alt="${project.title}">
                        <section class="project-description">
                            <h2>${project.title}</h2>
                            <time datetime="${project.date}">${project.date}</time>
                            <p>${project.briefing}</p>
                            <section class="pills">
                                <div>${project.tag1}</div>
                                <div>${project.tag2}</div>
                            </section>
                        </section>
                    </div>
                    </a>
                `;
            
                caseStudiesContainer.appendChild(projectElement); // Cambiado de projectsContainer a caseStudiesContainer
            });
            
            // Load "project"
            data['project'].forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');
            
                projectElement.innerHTML = `
                    <a href="${project.url}">
                    <div class="project-card">
                        <img src="${project.cover__img}" alt="${project.title}">
                        <section class="project-description">
                            <h2>${project.title}</h2>
                            <time datetime="${project.date}">${project.date}</time>
                            <p>${project.briefing}</p>
                            <section class="pills">
                                <div>${project.tag1}</div>
                                <div>${project.tag2}</div>
                            </section>
                        </section>
                    </div>
                    </a>
                `;
            
                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error loading the projects:', error));
});