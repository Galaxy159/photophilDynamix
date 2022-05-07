/////////////////////////////////////////////////
// Navigation toggle
const navLink = document.getElementById("btnNav");
const navBackground = document.getElementById("backgroundNav");
const btnNav = document.querySelector(".navigation__button");
const naviToggle = document.getElementById("navi-toggle");

btnNav.addEventListener("click", function () {
  navLink.classList.toggle("navigation__nav--toggle");
  navBackground.classList.remove("navigation__background--hide");
  navLink.classList.remove("navigation__nav--hide");
});

navLink.addEventListener("click", function () {
  navLink.classList.toggle("navigation__nav--toggle");
  navLink.classList.add("navigation__nav--hide");
  navBackground.classList.add("navigation__background--hide");
  naviToggle.checked = false;
});

//////////////////////////////////////////////////
// Building a Slider Component
// Slider

const slider = function () {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  const sliderBtnLeft = document.getElementById("sliderBtnLeft");
  const sliderBtnRight = document.getElementById("sliderBtnRight");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  // FULL SCREEN MODE
  const imgs = document.querySelectorAll(".slide img");
  // const fullPage = document.querySelector("fullpage");

  imgs.forEach((img) => {
    img.addEventListener("click", function () {
      slider.classList.toggle("fullpage");
      sliderBtnLeft.classList.toggle("hidden");
      sliderBtnRight.classList.toggle("hidden");
    });
  });

  // TOUCH SURFACE MECHANISM
  const slidesTouchArea = document.getElementById("slidesTouchArea");

  // slidesTouchArea.addEventListener(
  //   "touchmove",
  //   function (e) {
  //     e.preventDefault(); // prevent scrolling when inside DIV
  //   },
  //   false
  // );

  let touchstartX = 0;
  let touchendX = 0;

  function handleGesture() {
    if (touchendX < touchstartX) nextSlide();
    if (touchendX > touchstartX) prevSlide();
  }

  slidesTouchArea.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  slidesTouchArea.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  });

  // SLIDE MECHANISM

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
