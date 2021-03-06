// Global Variables

const container = document.getElementById('navbar__list');

let section = document.querySelectorAll('section');

let linkTo = Array.from(section);

// Grab section ids to link with corresponding anchors

const sectionId = linkTo.map(function(item) {
    return item.id;
});

// Grab data-nav attribute for naming the nav items

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

// Distinguishes sections in top of the viewport

// Create event listener (what event target and what kind of event?)
// Run function (How to judge if section I want hightlighted is sufficiently in viewport? Do I need more than one conditional?)

function highlight() {
    for (let section of linkTo) {
        const coordinates = section.getBoundingClientRect();
        /** I tried keep 'links' in the for loop like you had it, but it didn't want to work for me that way,
         *  so I just changed it to section and that worked. for some reason links would set every section to
         *  active class. The numbers represent the width and height when comparing in the condition, these can
         *  be negative values too, the documentation I linked in the email explains this better.
         *  */
        if (coordinates.top <= 150 && coordinates.bottom >= 150) {
            // If the above condition is met then 'your-active-class' gets added to section in viewport
            section.classList.add("your-active-class");
        } else if (section.id != linkTo.id && section.classList.contains('your-active-class')) {
            // If the above condition is met then 'your-active-class' gets removed from previous section it was on.
            section.classList.remove("your-active-class");
        }
    }
}

function scrollToSection() {
    window.addEventListener('scroll', function() {
        // Call highlight function when section is scrolled to
        highlight();
        /** If you comment out the code below, the section that is in view will be offset,
         *  so you will slightly see the section below it in the viewport as well.
         *  Test it out so you can understand why I am doing it, but I add it, so that only
         *  the section that is highlighted in the viewport is centered and shown on the page.
         *  If you are doing it this way, you don't have to add smooth scroll in CSS like you
         *  did previously. I see that you did try something similar at the bottom of this document.
         *  Does that make sense?
         */
        // Grabs link to each section
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            // Adds click event to anchor tag
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Get the href attribute and sets scroll behavior to smooth
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    block: 'center', behavior: 'smooth'
                });

            });

        });
    })
}

scrollToSection();

/*
    function highlight () {
        for (link of linkTo) {
            linkTo[i].addEventListener('scroll', function() {
                let coordinates = linkTo[i].getBoundingClientRect();
                    if (coordinates.y = window.scrollY) {
                        linkTo[i].classList.add('your-active-class');
                    } else if (coordinates.y < window.scrollY && linkTo[i].classlist.contains('your-active-class')) {
                        linkTo[i].classList.remove('your-active-class');
                }
        });
    }
}*/

// Make smooth scroll

// let anchors = document.querySelectorAll('a');
// anchors = Array.from(anchors);

// anchors.forEach(function(anchor){
//   anchor.addEventListener('click', function(){
//   console.log('clicked');
//   });
//                           });

// for (let i = 0; i < linkTo.length; i++) {
//   function getLocation(i) {
//     anchors[i].addEventListener('click', function() {
//       coordinates = linkTo[i].getBoundingClientRect();
//       anchors.preventDefault();
//       widow.scrollTo({
//         top: coordinates.x,
//         left: coordinates.y,
//         behavior: 'smooth'
//       });
//     });
//   };
// }

// anchors.forEach(function(anchor){
//   anchor.addEventListener('click', function() {
//     coordinates = linkTo.getBoundingClientRect();
//     anchor.preventDefault();
//     const scrollBehavior = {
//       // top: ,
//       // left: ,
//       behavior: 'smooth'
//     }
//     widow.scrollTo(scrollBehavior);
//   });
// });
