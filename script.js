const birthdayCard = document.getElementById("birthdayCard");
const music = document.getElementById("backgroundMusic");
const button = document.getElementById("wishButton");
const starsContainer = document.getElementById("starsContainer");
const wishMessage = document.getElementById("wishMessage");
const shootingStar = document.getElementById("shootingStar");
const videoOverlay = document.querySelector(".video-overlay");

let musicStarted = false;
let wishActive = false;

const originalMessage =
  "Para mi princesa hermosa que convirtió mis días en los recuerdos más bonitos. Gracias por existir, Laura. 🖤";

const magicMessage =
  "Los deseos más bonitos siempre encuentran el camino hacia las personas correctas...";

function startMusic() {
  if (!music || musicStarted) return;

  music.volume = 0;
  music.play();

  const fade = setInterval(() => {
    if (music.volume < 0.35) {
      music.volume = Math.min(music.volume + 0.01, 0.35);
    } else {
      clearInterval(fade);
    }
  }, 120);

  musicStarted = true;
}

function liftMusic() {
  if (!music) return;

  const normalVolume = 0.35;
  const magicVolume = 0.55;

  let goingUp = setInterval(() => {
    if (music.volume < magicVolume) {
      music.volume = Math.min(music.volume + 0.01, magicVolume);
    } else {
      clearInterval(goingUp);
    }
  }, 80);

  setTimeout(() => {
    let goingDown = setInterval(() => {
      if (music.volume > normalVolume) {
        music.volume = Math.max(music.volume - 0.01, normalVolume);
      } else {
        clearInterval(goingDown);
      }
    }, 90);
  }, 3800);
}

function createStars() {
  for (let i = 0; i < 90; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.innerHTML = Math.random() > 0.5 ? "✦" : "✧";

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";

    star.style.setProperty("--x", Math.random() * 320 - 160 + "px");
    star.style.setProperty("--y", Math.random() * 320 - 160 + "px");

    star.style.animationDelay = Math.random() * 0.7 + "s";

    starsContainer.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 3300);
  }
}

function changeMessage(newText) {
  if (!wishMessage) return;

  wishMessage.classList.add("changing");

  setTimeout(() => {
    wishMessage.textContent = newText;
    wishMessage.classList.remove("changing");
  }, 800);
}

if (birthdayCard) {
  birthdayCard.addEventListener("click", () => {
    birthdayCard.classList.toggle("open");
    startMusic();
  });
}

if (button && starsContainer) {
  button.addEventListener("click", () => {
    if (wishActive) return;

    wishActive = true;
    button.disabled = true;
    button.textContent = "✨ Deseo enviado ✨";

    startMusic();
    liftMusic();
    createStars();

    videoOverlay.classList.add("magic");

    shootingStar.classList.remove("active");
    void shootingStar.offsetWidth;
    shootingStar.classList.add("active");

    setTimeout(() => {
      changeMessage(magicMessage);
    }, 700);

    setTimeout(() => {
      changeMessage(originalMessage);
    }, 6500);

    setTimeout(() => {
      videoOverlay.classList.remove("magic");
      button.disabled = false;
      button.textContent = "✨ Haz un deseo ✨";
      wishActive = false;
    }, 8500);
  });
}