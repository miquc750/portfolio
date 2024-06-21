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
            updateNav();
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

        // REVIEWS CAROUSEL
        const quotesContainer = document.querySelector('.testimonial-quotes');
        const quotes = document.querySelectorAll('.testimonial-quote');
        const navContainer = document.querySelector('.testimonial-nav');
    
        let currentIndex = 0;
        const totalQuotes = quotes.length;
        const quotesPerView = 3;

        for (let i = 0; i < Math.ceil(totalQuotes / quotesPerView); i++) {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = i * quotesPerView;
                updateCarousel();
            });
            navContainer.appendChild(dot);
        }
    
        const dots = document.querySelectorAll('.testimonial-dot');
    
        function updateCarousel() {
            const offset = -currentIndex * (100 / quotesPerView);
            quotesContainer.style.transform = `translateX(${offset}%)`;
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === Math.floor(currentIndex / quotesPerView)) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        updateCarousel();


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
/*});*/

// SCROLL FUNCTIONALITY FOR DARK SECTIONS
var navTop = document.querySelector('.nav-top');
var navBottom = document.querySelector('.nav-bottom');
var darkSections = document.querySelectorAll('.dark-section');

function checkDarkSections() {
    let isDarkSectionInView = false;

    darkSections.forEach(function(section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            isDarkSectionInView = true;
        }
    });

    if (isDarkSectionInView) {
        navTop.classList.add('light-mode');
        navBottom.classList.add('light-mode');
    } else {
        navTop.classList.remove('light-mode');
        navBottom.classList.remove('light-mode');
    }
}

window.addEventListener('scroll', checkDarkSections);
window.addEventListener('resize', checkDarkSections);
checkDarkSections();


// NAVIGATION ACTIVE CLASS FUNCTIONALITY
let sections = document.querySelectorAll('main > section');
let navLinks = document.querySelectorAll('header ul li');

window.onscroll = () => {
    let scrollPosition = window.scrollY + window.innerHeight * 0.1;

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
};

window.onload = () => {
    updateActiveNav();
};

function updateActiveNav() {
    let scrollPosition = window.scrollY + window.innerHeight * 0.05;

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
                }
            });
        }
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


//MOBILE MENU
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
    });
});