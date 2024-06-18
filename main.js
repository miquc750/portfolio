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

// ACCORDION FUNCTIONALITY
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        var indicator = this.querySelector('.accordion-indicator');

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


 // CAROUSEL FUNCTIONALITY
 const carouselImages = document.querySelectorAll('.carousel-images img');
 const prevButton = document.querySelector('.prev');
 const nextButton = document.querySelector('.next');
 let currentIndex = 0;

 function showImage(index) {
     carouselImages.forEach((img, i) => {
         img.style.display = i === index ? 'block' : 'none';
     });
 }

 function showNextImage() {
     currentIndex = (currentIndex + 1) % carouselImages.length;
     showImage(currentIndex);
 }

 function showPrevImage() {
     currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
     showImage(currentIndex);
 }

 nextButton.addEventListener('click', showNextImage);
 prevButton.addEventListener('click', showPrevImage);

 showImage(currentIndex);


// INTERSECTION OBSERVER FOR NAVIGATION
function updateNav() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.projectnav a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.1 
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateNav();

});
    