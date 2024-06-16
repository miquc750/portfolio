document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }, 2000);

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.querySelector('.projects');
            const caseStudiesContainer = document.querySelector('.case__study');
            addProjects(data['case__study'], caseStudiesContainer);
            addProjects(data['project'], projectsContainer);
            initIntersectionObserver(); 
        })
        .catch(error => console.error('Error loading the projects:', error));

    // ADD PROJECTS TO DOM
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

    // INITIATE INTERSECTION OBSERVER
    function initIntersectionObserver() {
        const blocks = document.querySelectorAll('.block');
        /*const sections = document.querySelectorAll('#exploration, #lowfi, #midfi, #highfi, #reflection');*/

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        blocks.forEach(block => {
            observer.observe(block);
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }
});
