const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const body = document.body;

hamburger.addEventListener('click', () => {
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'flex';
    body.style.overflow = 'hidden';  // Disable scrolling
  } else {
    menu.style.display = 'none';
    body.style.overflow = 'auto';  // Enable scrolling
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   fetch('/api/images')
//     .then(response => response.json())
//     .then(images => {
//       const gallery = document.getElementById('gallery');
//       images.forEach(imgPath => {
//         const img = document.createElement('img');
//         img.src = imgPath;
//         img.loading = 'lazy';  // Lazy load the image

//         const randomPaddingH = Math.floor(Math.random() * 5) + 1; // Horizontal padding
//         const randomPaddingV = Math.floor(Math.random() * 5) + 1; // Vertical padding
//         img.style.padding = `${randomPaddingV}% ${randomPaddingH}%`;

//         gallery.appendChild(img);
//       });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/images')
    .then(response => response.json())
    .then(images => {
      const gallery = document.getElementById('gallery');
      images.forEach(imgPath => {
        const img = document.createElement('img');
        img.src = imgPath;
        img.loading = 'lazy'; // Lazy load the image

        // Randomizing the grid-row-end to make some images take up more vertical space
        const randomRowSpan = Math.floor(Math.random() * 3) + 1;
        img.style.gridRowEnd = `span ${randomRowSpan}`;

        // Random padding for a jumbled effect
        const randomPaddingTop = Math.floor(Math.random() * 10) + 5;
        const randomPaddingRight = Math.floor(Math.random() * 10) + 5;
        img.style.paddingTop = `${randomPaddingTop}px`;
        img.style.paddingRight = `${randomPaddingRight}px`;

        gallery.appendChild(img);
      });
    });
});
