//Source rotating: http://thenewcode.com/279/Rotate-Elements-on-Scroll-with-JavaScript//
//Source colors: https://codepen.io/atomiks/pen/dgMNwG

(function () {
  var throttle = function (type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };
  throttle("scroll", "optimizedScroll");
})();

var aboutC = document.getElementById("aboutC");
var [red, green, blue] = [55, 2, 74];
//const [red, green, blue] = [69, 111, 225];
// [48, 5, 41]
// [30, 5, 40]

// to use the script *without* anti-jank, set the event to "scroll" and remove the anonymous function.

window.addEventListener("optimizedScroll", function () {
  aboutC.style.transform = "rotate(" + window.pageYOffset / -17.002 + "deg)";
  var a = ((((window.scrollY || window.pageYOffset) *2) / 2500)** -2) +9.5;
  var c = ((((window.scrollY || window.pageYOffset) * 4) / 3500) ** -2) +2;
  var [r, g, b] = [red -(Math.abs(red / a)), green, blue - (Math.abs(blue / c))].map(
    Math.round
  );
  aboutC.style.fill = `rgb(${r},${g},${b})`;
});

// Simple toggle script
var toggle = true;
var hamburgerMenu = document.getElementsByClassName("hamburger-menu");

function toggleMenu() {
  if(toggle) {
    hamburgerMenu[0].classList.add("open");
    toggle = false;
    openBurguh();
  } else {
    hamburgerMenu[0].classList.remove("open");
    toggle = true;
    closeBurguh();
  }
}

function openBurguh() {
  document.getElementById("mobileNavItems").style.display = "flex";
  //document.getElementById("illusBod").style.overflowY = "hidden";
}

function closeBurguh() {
  //document.getElementById("illusBod").style.overflowY = "scroll";
  document.getElementById("mobileNavItems").style.display = "none";
}

const cursor = document.querySelector(".cursor");

let x = 0,
  y = 0,
  targetX = 0,
  targetY = 0;

// Smooth cursor follow animation
function animate() {
  x += (targetX - x) * 0.2;
  y += (targetY - y) * 0.2;
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
  requestAnimationFrame(animate);
}
animate();

// Track mouse movement
document.addEventListener("mousemove", (event) => {
  targetX = event.clientX;
  targetY = event.clientY;

  const elementUnder = document.elementFromPoint(event.clientX, event.clientY);

  // Hover effect for elements with data-cursor="hover"
  if (elementUnder && elementUnder.closest('[data-cursor="hover"]')) {
    cursor.classList.add("hover");
  } else {
    cursor.classList.remove("hover");
  }

  // Check if the cursor is over any .embedimg sections
  const embedSections = document.querySelectorAll(".embedimg");
  let overEmbed = false;
  embedSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    ) {
      overEmbed = true;
    }
  });

  if (overEmbed && noOverlay) {
    cursor.style.opacity = "0"; // fade out over embed
  } else {
    cursor.style.opacity = "1"; // fade in otherwise
  }
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0"; // fade out
});

// Show cursor when re-entering window
document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1"; // fade in
});