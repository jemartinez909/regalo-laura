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

// --- CONTROL DE AUDIO ---
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

// --- EFECTOS MÁGICOS (ESTRELLAS) ---
function createStars() {
  if (!starsContainer) return;

  starsContainer.innerHTML = "";

  for (let i = 0; i < 90; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.innerHTML = Math.random() > 0.5 ? "✦" : "✧";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

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

// --- EVENTOS DE CARTA Y DESEO ---
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

    if (videoOverlay) videoOverlay.classList.add("magic");

    if (shootingStar) {
      shootingStar.classList.remove("active");
      void shootingStar.offsetWidth;
      shootingStar.classList.add("active");
    }

    setTimeout(() => {
      changeMessage(magicMessage);
    }, 700);

    setTimeout(() => {
      changeMessage(originalMessage);
    }, 6500);

    setTimeout(() => {
      if (videoOverlay) videoOverlay.classList.remove("magic");
      button.disabled = false;
      button.textContent = "✨ Haz un deseo ✨";
      wishActive = false;
    }, 8500);
  });
}

// --- REVELACIÓN AL HACER SCROLL ---
const observerOptions = {
  root: null,
  threshold: 0.25
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active-scroll");
    }
  });
}, observerOptions);

document.querySelectorAll(".story-section").forEach(section => {
  sectionObserver.observe(section);
});

// --- INTERACTIVIDAD Y CATEGORÍAS ---
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Tarjetas de historias (sección aventura)
  const section = document.querySelector(".section-aventura-1");
  if (section) {
    const cards = section.querySelectorAll(".card");
    const descriptions = section.querySelectorAll(".description-item");

    cards.forEach((card) => {
      card.addEventListener("click", function () {
        if (this.classList.contains("active")) return;

        const index = this.getAttribute("data-index");

        cards.forEach((c) => {
          c.classList.remove("active");
          const origIndex = c.getAttribute("data-index");
          c.style.zIndex = parseInt(origIndex) + 1;
        });

        this.classList.add("active");
        this.style.zIndex = "10";

        descriptions.forEach((desc) => {
          desc.classList.remove("active");
          if (desc.getAttribute("data-index") === index) {
            setTimeout(() => {
              desc.classList.add("active");
            }, 50);
          }
        });
      });
    });
  }

  // 2. Navegación por Categorías
  const categoryButtons = document.querySelectorAll(".category-btn");
  const categoryWrappers = document.querySelectorAll(".category-wrapper");

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("btn-plus")) return;

      const targetId = btn.getAttribute("data-target");

      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      categoryWrappers.forEach(wrapper => {
        wrapper.classList.remove("active");
        if (wrapper.id === targetId) {
          wrapper.classList.add("active");

          const firstRadio = wrapper.querySelector('input[type="radio"]');
          if (firstRadio) firstRadio.checked = true;
        }
      });
    });
  });

  // 3. Modal Lightbox (Zoom Fotográfico)
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-img")) {
      const img = e.target;
      const cardItem = img.closest(".card-item");
      if (!cardItem) return;

      const inputAsociado = cardItem.previousElementSibling;

      // Abre el modal solo si es la tarjeta activa en la pila
      if (inputAsociado && inputAsociado.checked && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
      }
    }
  });

  if (lightbox) {
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }
});