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

var rotatingC = document.querySelector(".rotatingC");
var [red, green, blue] = [55, 2, 74];
//const [red, green, blue] = [69, 111, 225];
// [48, 5, 41]
// [30, 5, 40]

// to use the script *without* anti-jank, set the event to "scroll" and remove the anonymous function.

window.addEventListener("optimizedScroll", function () {
  rotatingC.style.transform = "rotate(" + window.pageYOffset / 2.002 + "deg)";
  var a = ((((window.scrollY || window.pageYOffset) *2) / 2500)** -2) +9.5;
  var c = ((((window.scrollY || window.pageYOffset) * 4) / 3500) ** -2) +2;
  var [r, g, b] = [red -(Math.abs(red / a)), green, blue - (Math.abs(blue / c))].map(
    Math.round
  );
  rotatingC.style.fill = `rgb(${r},${g},${b})`;
});

var img2overlay;


// Load logo animation
if (document.referrer.indexOf(window.location.hostname) == -1) {
  console.log("Page has been opened/loaded!");
  document.getElementById("indexBod").style.overflowY = "hidden";
  document.getElementById("logoAnimation").style.display = "flex";
  //startTimer();
}

function logoAnimEnd() {
  document.getElementById("logoAnimation").style.display = "none";
  document.getElementById("indexBod").style.overflowY = "scroll";
  console.log("video ended 3");
}


document.getElementById("logoAnimationVid").addEventListener("play", startTimer);

function startTimer() {
  console.log("Timer started, waiting for 6 seconds...");

  setTimeout(() => {
    fadeOutVideo();
  }, 6700);

  setTimeout(() => {
    loadIndexBody();
  }, 6000);
}



function fadeOutVideo() {
  console.log("6 seconds passed! Function triggered.");
  const logoAnim = document.getElementById("logoAnimation");
  if (logoAnim) {
    let opacity = 1;
    const fadeEffect = setInterval(() => {
      if (opacity > 0) {
        opacity -= 0.05;
        logoAnim.style.opacity = opacity;
      } else {
        clearInterval(fadeEffect);
      }
    }, 100);
  }
}




function on(image) {
  document.getElementById('indexBod').style.overflowY = "hidden";
  img2overlay = image;
  document.getElementById(img2overlay).style.display = "flex";
}

function off() {
  document.getElementById("indexBod").style.overflowY = "scroll";
  document.getElementById(img2overlay).style.display = "none";
}


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


