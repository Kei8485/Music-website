const menuIcon = document.getElementById("menuIcon");
const navMenu = document.querySelector(".main__nav-menu-container");
const searchIcon = document.getElementById("searchIcon");
const views = document.querySelectorAll(".fade-in");
const navItems = document.querySelectorAll(".main__list-item");

menuIcon.addEventListener("click", (e) => {
  navMenu.classList.toggle("main__nav--active");
  navMenu.style.transitionDuration = "1s";
  e.stopPropagation();
});

navMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", () => {
  if (navMenu.classList.contains("main__nav--active")) {
    navMenu.classList.remove("main__nav--active");
    removeSearch();
  }
});

searchIcon.addEventListener("click", () => {
  const searchContainer = document.querySelector(".main__explore-container");

  views.forEach((view) => {
    view.classList.remove("active");
  });

  searchContainer.classList.add("active");
});

// // search function
const headerInput = document.querySelector(".header__input");
const inputWrap = document.querySelector(".header__input-wrapper");
const headerIcons = document.querySelectorAll(".header__icon");

headerInput.addEventListener("click", () => {
  inputWrap.style.filter = "brightness(1.5)";
});

document.addEventListener("click", (e) => {
  if (!inputWrap.contains(e.target)) {
    inputWrap.style.filter = "";
  }
});

// handle nav item clicks
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.dataset.target;

    views.forEach((view) => {
      view.classList.remove("active");
    });

    const mainExploreContainer = document.querySelector(
      ".main__explore-container"
    );
    const selectedView = document.querySelector(`.main__${target}-container`);

    if (selectedView) {
      selectedView.classList.add("active");
    }

    if (navMenu.classList.contains("main__nav--active")) {
      navMenu.classList.remove("main__nav--active");
      navMenu.style.transitionDuration = "2.5s";
    }
  });
});

// home controls
const playlistCards = document.querySelectorAll(".main__recent-card");
const playlistHover = document.querySelector(".main__recent-play--hover");

playlistCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    playlistHover.style.display = "block";
  });

  card.addEventListener("mouseleave", () => {
    playlistHover.style.display = "none";
  });
});

// made for you controls
const icon = document.querySelector(".main__MFY-icon");
const savedIcon = document.querySelector(".main__saved"); // your SVG

icon.addEventListener("click", () => {
  icon.classList.remove("animate-border-green", "animate-border-red");

  const line1 = icon.querySelector(".line1");
  const line2 = icon.querySelector(".line2");

  if (!icon.classList.contains("active")) {
    icon.classList.add("animate-border-green");
    icon.classList.add("active");

    savedIcon.style.display = "none";
    setTimeout(() => {
      line1.style.opacity = "0";
      line2.style.opacity = "0";
    }, 600);

    // fade in SVG
    setTimeout(() => {
      savedIcon.style.display = "block";
      savedIcon.style.opacity = "0";
      savedIcon.style.transition = "opacity 0.4s ease";
      requestAnimationFrame(() => (savedIcon.style.opacity = "1"));
    }, 900);
  } else {
    icon.classList.add("animate-border-red");
    icon.classList.remove("active");

    line1.style.opacity = "1";
    line2.style.opacity = "1";

    savedIcon.style.opacity = "0";
    setTimeout(() => {
      savedIcon.style.display = "none";
    }, 400);
  }

  setTimeout(() => {
    icon.classList.remove("animate-border-green", "animate-border-red");
  }, 800);
});

// audio controls
const footerAudio = document.querySelector(".footer__audio");
const footerBtnBack = document.querySelector(".footer__btn--back");
const footerBtnPausePlay = document.querySelector(".footer__btn--play");
const footerBtnForward = document.querySelector(".footer__btn--forward");

const playIconPath = footerBtnPausePlay.querySelector("path");

let isPlaying = false;
footerBtnPausePlay.addEventListener("click", () => {
  if (!isPlaying) {
    footerAudio.play();
    isPlaying = true;
    playIconPath.setAttribute(
      "d",
      "M176 96C149.5 96 128 117.5 128 144L128 496C128 522.5 149.5 544 176 544L240 544C266.5 544 288 522.5 288 496L288 144C288 117.5 266.5 96 240 96L176 96zM400 96C373.5 96 352 117.5 352 144L352 496C352 522.5 373.5 544 400 544L464 544C490.5 544 512 522.5 512 496L512 144C512 117.5 490.5 96 464 96L400 96z"
    );
  } else {
    footerAudio.pause();
    isPlaying = false;
    playIconPath.setAttribute(
      "d",
      "M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"
    );
  }
});

// progress bar
const footerAudioProgressContainer = document.querySelector(
  ".footer__audio-progress"
);
const footerAudioProgress = document.querySelector(".footer__progress-fill");
const footerAudioProgTime = document.querySelector(".footer__audio-prog-time");
const footerAudioProgTimeDuration = document.querySelector(
  ".footer__audio-prog-time-duration"
);
const footerAudioProgDurationEnd = document.querySelector(
  ".footer__audio-prog-time-end"
);

const footerAudioProgWrap = document.querySelector(
  ".footer__audio-prog-wrapper"
);

const footerAudioProgCircle = document.querySelector(
  ".footer__progress-circle"
);

footerAudio.addEventListener("timeupdate", () => {
  const percent = (footerAudio.currentTime / footerAudio.duration) * 100;
  const finalMin = Math.floor(footerAudio.duration / 60);
  const finalSec = Math.floor(footerAudio.duration % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(footerAudio.currentTime / 60);
  const seconds = Math.floor(footerAudio.currentTime % 60)
    .toString()
    .padStart(2, "0");

  footerAudioProgress.style.width = `${percent}%`;
  footerAudioProgCircle.style.left = `${percent}% `;

  footerAudioProgTimeDuration.innerText = `${minutes}:${seconds}`;
  footerAudioProgDurationEnd.innerText = `${finalMin}:${finalSec}`;
});

// drag interface
let isDragging = false;
let dragX = 0;
footerAudioProgWrap.addEventListener("click", (e) => {
  const widthOfProgCon = footerAudioProgWrap.clientWidth;
  const XofProgCon = e.offsetX;
  const duration = footerAudio.duration;

  footerAudio.currentTime = (XofProgCon / widthOfProgCon) * duration;
});

footerAudioProgWrap.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = footerAudioProgWrap.getBoundingClientRect();
  dragX = e.clientX - rect.left;
  updateProgressVisual(dragX);
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const rect = footerAudioProgWrap.getBoundingClientRect();
  dragX = e.clientX - rect.left;
  updateProgressVisual(dragX);
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    const width = footerAudioProgWrap.clientWidth;
    footerAudio.currentTime = (dragX / width) * footerAudio.duration;
  }
  isDragging = false;
});

function updateProgressVisual(x) {
  const width = footerAudioProgWrap.clientWidth;
  const percent = Math.min(Math.max((x / width) * 100, 0), 100);
  footerAudioProgress.style.width = percent + "%";
  footerAudioProgCircle.style.left = percent + "%";
}
