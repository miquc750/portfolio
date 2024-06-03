//LOADING OVERLAY

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }, 2000);
});


//ACCORDION

var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        var indicator = this.querySelector('.accordion-indicator');

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
            indicator.src = 'assets/plus.png';
            indicator.alt = 'Expand';
        } else {
            panel.style.display = "block";
            indicator.src = 'assets/minus.png';
            indicator.alt = 'Collapse';
        }
    });
}


//PROJECT CARDS

document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.querySelector('.projects');
        const caseStudiesContainer = document.querySelector('.case__study');

        function addProjects(projects, container) {
            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project', 'project-card');

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

                container.appendChild(projectElement);
            });
        }

        addProjects(data['case__study'], caseStudiesContainer);
        addProjects(data['project'], projectsContainer);

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    })
    .catch(error => console.error('Error loading the projects:', error));
});