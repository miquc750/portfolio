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

//MOBILE MENU
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
});

const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.remove('open');
    });
});


// ADD PROJECTS TO DOM
    function addProjects(projects, container) {
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project', 'project-card');

            projectElement.innerHTML = `
                <a href="${project.url}" class="block">
                    <div class="project-card">
                        <img src="${project.cover__img}" alt="${project.title}">
                        <section class="project-description">
                            <h3>${project.title}</h3>
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
        const quotes = document.querySelectorAll('.testimonial-quote');
    const navItems = document.querySelectorAll('.nav-item');
    const dividers = document.querySelectorAll('.divider');

    function updateDividers(index) {
        // Oculta todos los divisores
        dividers.forEach(divider => divider.style.display = 'none');

        // Muestra los divisores según el índice activo
        if (index > 1 && index <= dividers.length + 1) {
            dividers[index - 2].style.display = 'block';
        }
        if (index > 1 && index < dividers.length + 1) {
            dividers[index - 1].style.display = 'block';
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const index = this.getAttribute('data-index');

            // Remove active class from all quotes and nav items
            quotes.forEach(quote => quote.classList.remove('active'));
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to the selected quote and nav item
            quotes[index - 1].classList.add('active');
            this.classList.add('active');

            // Update dividers
            updateDividers(Number(index));
        });
    });

    // Initialize dividers on page load
    updateDividers(1);


// INITIATE INTERSECTION OBSERVER
    function initIntersectionObserver() {
        const blocks = document.querySelectorAll('.block');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
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


// IMG MODAL

var modal = document.getElementById("modal");

var images = document.querySelectorAll('#photography .gallery img');
var modalImg = document.getElementById("modal-img");
var captionText = document.getElementById("caption");

images.forEach(image => {
    image.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
});

var span = document.getElementById("close");
span.onclick = function() {
    modal.style.display = "none";
}


//VIDEO MODAL
var videoModal = document.getElementById("videoModal");
    var slides = document.querySelectorAll('#filmmaking .slide');
    var videoFrame = document.getElementById("video-frame");
    var closeVideo = document.getElementById("closeVideo");

    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            var videoUrl = this.getAttribute('data-video-url');
            videoModal.style.display = "block";
            videoFrame.src = videoUrl;
        });
    });

    closeVideo.onclick = function() {
        videoModal.style.display = "none";
        videoFrame.src = "";
    }

    window.onclick = function(event) {
        if (event.target == videoModal) {
            videoModal.style.display = "none";
            videoFrame.src = "";
        }
    }



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
 const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;
    let currentIndex = 0;

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
        updateIndicators(index);
    };

    const updateIndicators = (index) => {
        const dots = document.querySelectorAll('.carousel-indicators .dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    };

    document.querySelector('.next').addEventListener('click', nextImage);
    document.querySelector('.prev').addEventListener('click', prevImage);

    // Auto-slide every 5 seconds
    setInterval(nextImage, 5000);

    // Indicators click event
    document.querySelectorAll('.carousel-indicators .dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showImage(index);
        });
    });

    // Initial display
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



