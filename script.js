
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if(window.innerWidth > 768){
    const currentScroll = window.pageYOffset;

    if(currentScroll > lastScroll && currentScroll > 120){
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }

    lastScroll = currentScroll;
  }
});

const featureSlideshowImage = document.getElementById('feature-slideshow-image');

const featureSlideshowImages = [
'https://raw.githubusercontent.com/pickledchicken/MorenoMix/main/images/image000000%20(2).jpg',
'https://raw.githubusercontent.com/pickledchicken/MorenoMix/main/images/image000000%20(3).jpg',
'https://raw.githubusercontent.com/pickledchicken/MorenoMix/main/images/image000000%20(4).jpg',
'https://raw.githubusercontent.com/pickledchicken/MorenoMix/main/images/image000000%20(5).jpg',
'https://raw.githubusercontent.com/pickledchicken/MorenoMix/main/images/image000000%20(6).jpg'
];

let featureImageIndex = 0;

window.setInterval(() => {
featureImageIndex = (featureImageIndex + 1) % featureSlideshowImages.length;
featureSlideshowImage.src = featureSlideshowImages[featureImageIndex];
}, 1500);
