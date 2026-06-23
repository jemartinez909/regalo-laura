const birthdayCard = document.getElementById("birthdayCard");
const music = document.getElementById("backgroundMusic");

let musicStarted = false;

birthdayCard.addEventListener("click", () => {
  birthdayCard.classList.toggle("open");

  // La música empieza con el primer clic dentro de la página
  if (!musicStarted) {
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
});