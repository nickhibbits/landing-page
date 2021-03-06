// Global Variables

const container = document.getElementById('navbar__list');

let section = document.querySelectorAll('section');

let linkTo = Array.from(section);

// Grab section ids to link with corresponding anchors

const sectionId = linkTo.map(function(item) {
  return item.id;
});

// Grab data-nav attributes for naming the nav items

const names = linkTo.map(function(name) {
  return name.getAttribute('data-nav');
});

// Create nav bar with links to each section

function makeNav () {
  for (let i = 0; i < names.length; i++) {
    let sectionName = names[i];
    let link = document.createElement('a');
    let listItem = document.createElement('li');
    link.href = `#${sectionId[i]}`;
    link.textContent = sectionName;
    link.classList.add('menu__link');
    listItem.appendChild(link);
    container.appendChild(listItem);
  }
}

makeNav();

// Distinguishes sections in the top of the viewport

function highlight() {
    for (let section of linkTo) {
        const coordinates = section.getBoundingClientRect();
        if (coordinates.top <= 150 && coordinates.bottom >= 150) {
            section.classList.add("your-active-class");
        } else if (section.classList.contains('your-active-class')) {
            section.classList.remove("your-active-class");
        }
    }
}

// Adds smooth scroll effect when clicking between sections via the nav bar

function scrollToSection() {
        // Call highlight function when section is scrolled to
    window.addEventListener('scroll', function() {
        highlight();
        document.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(link.getAttribute('href')).scrollIntoView({
                    block: 'center', behavior: 'smooth'
                });

            });

        });
    });
}

scrollToSection();
