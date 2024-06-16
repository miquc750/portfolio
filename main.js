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
            initIntersectionObserver(); // Inicializa el IntersectionObserver aquí
        })
        .catch(error => console.error('Error loading the projects:', error));

    updateActiveNav();

    // ACCORDION
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

    // UNIFYING SCROLL EVENTS
    window.onscroll = () => {
        updateActiveNav();
        handleNavColor();
    };

    // CAROUSEL
    document.querySelector('.next').addEventListener('click', function() {
        scrollCarousel(1);
    });

    document.querySelector('.prev').addEventListener('click', function() {
        scrollCarousel(-1);
    });

    let currentImageIndex = 0;
    const imagesCount = document.querySelectorAll('.carousel-images img').length;

    function scrollCarousel(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = imagesCount - 1;
        } else if (currentImageIndex >= imagesCount) {
            currentImageIndex = 0;
        }
        const carouselImages = document.querySelector('.carousel-images');
        const imageWidth = carouselImages.querySelector('img').clientWidth;
        carouselImages.style.transform = `translateX(-${currentImageIndex * imageWidth}px)`;
    }

    // FADE-IN ANIMATION
    const blocks = document.querySelectorAll('.block');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar una vez que se hace visible
            }
        });
    }, {
        threshold: 0.3 // Cambia este valor según necesites
    });

    blocks.forEach(block => {
        observer.observe(block);
    });

    // ACTIVE NAV
    function updateActiveNav() {
        let scrollPosition = window.scrollY + window.innerHeight * (-0.1);
        let sections = document.querySelectorAll('main > section');
        let navLinks = document.querySelectorAll('header ul li');
        let foundActive = false;

        sections.forEach(sec => {
            let rect = sec.getBoundingClientRect();
            let offset = window.scrollY + rect.top - 150;
            let height = rect.height;

            if (scrollPosition >= offset && scrollPosition < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    let targetLink = document.querySelector(`header ul li a[href="#${sec.id}"]`);
                    if (targetLink) {
                        targetLink.parentElement.classList.add('active');
                        foundActive = true;
                    }
                });
            }
        });

        if (!foundActive && window.scrollY < 10) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                let homeLink = document.querySelector('header ul li a[href="#home"]');
                if (homeLink) {
                    homeLink.parentElement.classList.add('active');
                }
            });
        }
    }

    // DARK-LIGHT MODE NAV
    function handleNavColor() {
        const sectionsDark = document.querySelectorAll('.dark-section');
        let isDark = false;

        sectionsDark.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 8 && rect.bottom >= window.innerHeight / 8) {
                isDark = true;
            }
        });

        const navElements = document.querySelectorAll('.nav-top, .nav-bottom');
        navElements.forEach(element => {
            if (isDark) {
                element.classList.add('light-mode');
            } else {
                element.classList.remove('light-mode');
            }
        });
    }

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
                        </div>
                    </a>
                `;
            container.appendChild(projectElement);
        });
    }
});