const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const body = document.body;

hamburger.addEventListener('click', () => {
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'flex';
    body.style.overflow = 'hidden';
  } else {
    menu.style.display = 'none';
    body.style.overflow = 'auto';
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/images')
    .then(response => response.json())
    .then(images => {
      const gallery = document.getElementById('gallery');
      images.forEach(imgPath => {
        const folder = imgPath.split('/')[2];

        const container = document.createElement('div');
        container.className = 'image-container';
        container.setAttribute('data-folder', folder);

        const img = document.createElement('img');
        img.src = imgPath;
        img.loading = 'lazy';

        img.onload = () => {
          // Only display the credits div when the image has fully loaded
          const credits = document.createElement('div');
          credits.className = 'credits';
          credits.innerText = 'Loading credits...';
          credits.style.opacity = '0'; // Initially set opacity to 0
          container.appendChild(credits);

          // Fetch the credits text and update the credits div
          fetch(`/projectImages/${folder}/credits.txt`)
            .then(response => response.text())
            .then(creditsText => {
              console.log('Credits:', creditsText);
              credits.innerText = creditsText;
              // credits.style.opacity = '1'; // Set opacity to 1 after credits text has been fetched
            });
        };

        // Randomizing the grid-row-end to make some images take up more vertical space
        const randomRowSpan = Math.floor(Math.random() * 3) + 1;
        img.style.gridRowEnd = `span ${randomRowSpan}`;

        // Random padding
        const randomPaddingTop = Math.floor(Math.random() * 10) + 5;
        const randomPaddingRight = Math.floor(Math.random() * 10) + 5;
        img.style.paddingTop = `${randomPaddingTop}px`;
        img.style.paddingRight = `${randomPaddingRight}px`;

        container.appendChild(img);
        gallery.appendChild(container);
      });
    });
});


$(document).ready(function () {
  $(".logo a").on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });
});

// Assuming you have a structure like /projectImages/shoot1/credits.txt
function loadCreditsFor(folderName) {
  fetch(`/projectImages/${folderName}/credits.txt`)
    .then(response => response.text())
    .then(credits => {
      const container = document.querySelector(`.image-container[data-folder='${folderName}']`);
      const creditsElement = container.querySelector('.credits');
      creditsElement.innerText = credits;
    });
}
