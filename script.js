const giftBox = document.getElementById("giftBox");

let clicks = 0;

giftBox.addEventListener("click", () => {
  clicks++;

  giftBox.classList.add("clicked");

  setTimeout(() => {
    giftBox.classList.remove("clicked");
  }, 300);

  // La cajita se abre hasta el cuarto clic
  if (clicks >= 4) {
    giftBox.classList.add("open");
  }
});