const strip = document.getElementById("strip");

const title = document.getElementById("productTitle");

const text = document.getElementById("productText");

const copy = document.getElementById("copy");

const counter = document.getElementById("counter");

const products = [
  {
    x: -350,
    title: "SEE DIFFERENTLY",
    text: "PRECISION IN MOTION",
  },

  {
    x: -1100,
    title: "BEYOND VISION",
    text: "DESIGNED FOR PERSPECTIVE",
  },

  {
    x: -1750,
    title: "CLARITY IN MOTION",
    text: "FOCUS REDEFINED",
  },
];

let currentIndex = 0;

let isAnimating = false;

let lastTrigger = 0;

function formatCounter(index) {
  return `0${index + 1} / 03`;
}

function moveToProduct(index) {
  if (isAnimating) return;

  isAnimating = true;

  copy.classList.add("is-hidden");

  strip.classList.add("is-moving");

  setTimeout(() => {
    strip.style.transform = `translateX(${products[index].x}px)`;
  }, 180);

  setTimeout(() => {
    title.textContent = products[index].title;

    text.textContent = products[index].text;

    counter.textContent = formatCounter(index);
  }, 900);

  setTimeout(() => {
    strip.classList.remove("is-moving");

    copy.classList.remove("is-hidden");

    isAnimating = false;
  }, 1700);
}

function triggerNext() {
  const now = Date.now();

  if (now - lastTrigger < 1400) return;

  lastTrigger = now;

  currentIndex = (currentIndex + 1) % products.length;

  moveToProduct(currentIndex);
}

window.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaY) > 20) {
    triggerNext();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === " ") {
    triggerNext();
  }
});
