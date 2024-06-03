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

            // Load "case-study"
            data['case-study'].forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');

                projectElement.innerHTML = `
                    <a href="${url}" class="project-card">
                        <img src="${project.cover__img}" alt="${project.title}">
                        <section class="project-description">
                            <h2>${project.title}</h2>
                            <p>${project.briefing}</p>
                            <time datetime="${project.date}">${project.date}</time>
                        </section>
                    </a>
                `;

                projectsContainer.appendChild(projectElement);
            });

            // Cargar "project"
            data['project'].forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');

                projectElement.innerHTML = `
                    <a href="${url}" class="project-card">
                        <img src="${project.cover__img}" alt="${project.title}">
                        <section class="project-description">
                            <h2>${project.title}</h2>
                            <p>${project.briefing}</p>
                            <time datetime="${project.date}">${project.date}</time>
                        </section>
                    </a>
                `;

                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error loading the projects:', error));
});