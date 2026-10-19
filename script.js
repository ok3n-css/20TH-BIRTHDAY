
const cakeBtn = document.getElementById("cakeBtn");
const candles = document.getElementById("candles");
const wishMessage = document.getElementById("wishMessage");
const relightBtn = document.getElementById("relightBtn");
const confettiBox = document.getElementById("confetti");

const musicBtn = document.getElementById("musicBtn");
const ourSong = document.getElementById("ourSong");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

const photos = [
  { src: "naomi1.jpg", caption: "Your beautiful smile ♡" },
  { src: "naomi2.jpg", caption: "One of my favorite days" },
  { src: "naomi3.jpg", caption: "A moment to remember ♡" }
];

let currentPhoto = 0;
let candlesBlown = false;
let touchStartX = 0;

// Generate exactly 20 candles.
for (let i = 0; i < 20; i++) {
  const candle = document.createElement("span");
  candle.className = "candle";
  candles.appendChild(candle);
}

// Background music: starts only after she taps the button.
musicBtn.addEventListener("click", async () => {
  if (ourSong.paused) {
    try {
      await ourSong.play();
      musicBtn.textContent = "♫ Pause our song";
    } catch (error) {
      alert(
        "Add your music file at assets/our-song.mp3, then try again."
      );
    }
  } else {
    ourSong.pause();
    musicBtn.textContent = "♫ Play our song";
  }
});

// Birthday cake interaction.
cakeBtn.addEventListener("click", () => {
  if (candlesBlown) return;

  candlesBlown = true;
  candles.classList.add("blown-out");

  wishMessage.innerHTML =
    "Your wish is on its way, Naomi! ♡" +
    "<small>Happy 20th birthday, baby! You deserve the world.</small>";

  relightBtn.hidden = false;
  launchConfetti();
});

relightBtn.addEventListener("click", () => {
  candlesBlown = false;
  candles.classList.remove("blown-out");

  wishMessage.innerHTML =
    'Close your eyes and make a wish, baby ♡' +
    '<small>Tap the cake to blow out the candles!</small>';

  relightBtn.hidden = true;
});

// Confetti animation.
function launchConfetti() {
  const colors = [
    "#e66b9f", "#f8c4da", "#fff0f6",
    "#d8a8e8", "#ffd16e", "#ffffff"
  ];

  for (let i = 0; i < 110; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";

    piece.style.left = Math.random() * 100 + "%";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty(
      "--drift",
      (Math.random() * 240 - 120) + "px"
    );

    piece.style.setProperty(
      "--spin",
      (Math.random() * 720 - 360) + "deg"
    );

    piece.style.animationDelay = Math.random() * 0.7 + "s";
    piece.style.animationDuration =
      (2.5 + Math.random() * 1.5) + "s";

    if (Math.random() > 0.5) {
      piece.style.borderRadius = "50%";
    }

    confettiBox.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    }, { once: true });
  }
}

// Photo gallery and lightbox.
const photoCards = document.querySelectorAll(".photo-card");

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;

  lightboxImg.src = photos[currentPhoto].src;
  lightboxImg.alt = photos[currentPhoto].caption;
  lightboxCaption.textContent = photos[currentPhoto].caption;

  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closePhoto() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

photoCards.forEach((card, index) => {
  card.addEventListener("click", () => showPhoto(index));
});

document.getElementById("closeLightbox")
  .addEventListener("click", closePhoto);

document.getElementById("prevPhoto")
  .addEventListener("click", () => showPhoto(currentPhoto - 1));

document.getElementById("nextPhoto")
  .addEventListener("click", () => showPhoto(currentPhoto + 1));

// Close when tapping the dark area outside the photo.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closePhoto();
});

// Keyboard controls on computers.
document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;

  if (event.key === "Escape") closePhoto();
  if (event.key === "ArrowRight") showPhoto(currentPhoto + 1);
  if (event.key === "ArrowLeft") showPhoto(currentPhoto - 1);
});

// Swipe left/right on phones and tablets.
lightbox.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) < 45) return;

  if (distance < 0) {
    showPhoto(currentPhoto + 1);
  } else {
    showPhoto(currentPhoto - 1);
  }
}, { passive: true });
