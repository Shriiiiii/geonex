(function ($) {
  "use strict";

  ///////////////////////////////////////////////////////

  /***********
  Preloder js
  ************/

  jQuery(window).on("load", function () {
    $(".preloader").delay(800).fadeOut("slow");
  });

  // Preloader End
  /***********
   Sticky Navbar js
   ************/
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 20) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
  });

  // Menu

  jQuery(document).ready(function ($) {
    if ($.fn.meanmenu) {
      jQuery("header .mainmenu").meanmenu({
        meanScreenWidth: "992",
      });
    }
  });

  document
    .querySelectorAll(".menu-anim > li > a")
    .forEach(
      (button) =>
        (button.innerHTML =
          '<div class="menu-text"><span>' +
          button.textContent.split("").join("</span><span>") +
          "</span></div>")
    );

  setTimeout(() => {
    var menu_text = document.querySelectorAll(".menu-text span");
    menu_text.forEach((item) => {
      var font_sizes = window.getComputedStyle(item, null);
      let font_size = font_sizes.getPropertyValue("font-size");
      let size_in_number = parseInt(font_size.replace("px", ""), 10);
      let new_size = parseInt(size_in_number / 3, 10);
      new_size = new_size + "px";
      if (item.innerHTML === " ") {
        item.style.width = new_size;
      }
    });
  }, 1000);

  // Menu End

  /***********
   mobile menu  js
   ************/
  $(".hamburger").on("click", function (event) {
    $(this).toggleClass("h-active");
    $(".main-nav").toggleClass("slidenav");
  });

  $(".header-home .main-nav ul li  a").on("click", function (event) {
    $(".hamburger").removeClass("h-active");
    $(".main-nav").removeClass("slidenav");
  });

  $(".main-nav .fl").on("click", function (event) {
    var $fl = $(this);
    $(this).parent().siblings().find(".sub-menu").slideUp();
    $(this).parent().siblings().find(".fl").addClass("flaticon-plus").text("+");
    if ($fl.hasClass("flaticon-plus")) {
      $fl.removeClass("flaticon-plus").addClass("flaticon-minus").text("-");
    } else {
      $fl.removeClass("flaticon-minus").addClass("flaticon-plus").text("+");
    }
    $fl.next(".sub-menu").slideToggle();
  });

  // Search Start
  document.addEventListener("click", (event) => {
    const searchToggle = event.target.closest(".search-icon");
    if (searchToggle) {
      searchToggle.classList.toggle("active");
    }
  });
  // Search End

  ///////////////////////////////////////////////////////
  // Sticky Menu
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
      $(".menu-area").addClass("sticky");
    } else {
      $(".menu-area").removeClass("sticky");
    }
  });
  // Sticky Menu End

  ///////////////////////////////////////////////////////
  // Magnific Popup gallery
  $(document).ready(function () {
    if ($.fn.magnificPopup) {
      $(".popup-gallery").magnificPopup({
        delegate: "a",
        gallery: { enabled: true },
        type: "image",
      });

      $(".popup-youtube").magnificPopup({
        type: "iframe",
      });
    }

    if ($.fn.YouTubePopUp) {
      $("a.vid").YouTubePopUp();
    }
  });

  // Magnific Popup gallery End

  /*Trending Slide*/

  var resourcesSlider = new Swiper(".resources-slider", {
    slidesPerView: 3,
    spaceBetween: 15,
    loop: true,
    speed: 1000,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: ".resources-button-next",
      prevEl: ".resources-button-prev",
    },
  });

  /* Testimonial */

  //top
  var testimonial_top_slider = new Swiper(".testimonial-slide-top", {
    spaceBetween: 24,
    centeredSlides: true,
    speed: 8000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView: "auto",
    allowTouchMove: false,
    disableOnInteraction: true,
  });

  // Bottom
  var testimonial_bottom_slider = new Swiper(".testimonial-slide-bottom", {
    spaceBetween: 24,
    centeredSlides: true,
    speed: 8000,
    autoplay: {
      delay: 1,
      reverseDirection: true,
    },
    loop: true,
    slidesPerView: "auto",
    allowTouchMove: false,
    disableOnInteraction: true,
  });

  // Testimonial Image Generator
  var testimonialImg = new Swiper(".testimonial-img-slide", {
    fadeEffect: { crossFade: true },
    effect: "fade",
    loop: true,
    allowTouchMove: false,
  });

  var testimonialInfo = new Swiper(".testimonial-info-slide", {
    spaceBetween: 24,
    slidesPerView: 1,
    loop: true,
    speed: 800,
    allowTouchMove: false,
    navigation: {
      nextEl: ".testimonial-info-button-next",
      prevEl: ".testimonial-info-button-prev",
    },
    pagination: {
      el: ".testimonial-info-pagination",
      clickable: true,
    },
    thumbs: {
      swiper: testimonialImg,
    },
  });

  var cg_testimonialSlider = new Swiper(".cg-testimonial-slide", {
    slidesPerView: 3,
    spaceBetween: 15,
    loop: true,
    speed: 1000,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: ".cg-testimonial-info-button-next",
      prevEl: ".cg-testimonial-info-button-prev",
    },
    pagination: {
      el: ".cg-testimonial-info-pagination",
      clickable: true,
    },
  });

  /* Testimonial 5 Slider */
  var testimonial5Slider = new Swiper(".testimonial-5__slider", {
    loop: true,
    autoplay: {
      delay: 1,
    },
    speed: 2800,
    spaceBetween: 24,
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1400: {
        slidesPerView: 3.5,
        spaceBetween: 24,
      },
    },
  });

  /* Testimonial End */

  /* Brand */

  var brand_slider = new Swiper(".brand-slide-wrap", {
    spaceBetween: 100,
    centeredSlides: true,
    speed: 5000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView: "auto",
    allowTouchMove: false,
    disableOnInteraction: true,
    breakpoints: {
      320: {
        spaceBetween: 50,
      },
      992: {
        spaceBetween: 70,
      },
    },
  });

  // Brand-5 Slider Start
  const brand_five_slider = document.querySelector(".brand-5__slider");
  if (brand_five_slider) {
    var brand_slider = new Swiper(brand_five_slider, {
      spaceBetween: 90,
      centeredSlides: true,
      speed: 5000,
      autoplay: {
        delay: 1,
      },
      loop: true,
      slidesPerView: "auto",
      allowTouchMove: false,
      disableOnInteraction: true,
      breakpoints: {
        320: {
          spaceBetween: 50,
        },
        992: {
          spaceBetween: 70,
        },
      },
    });
  }
  // Brand-5 Slider End

  /*hero slider one*/
  var hero_slider__one = new Swiper(".hero_slider__one", {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    centeredSlides: false,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".hero_pagination__one",
      clickable: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
        centeredSlides: true,
      },
    },
  });

  /* Brand End */

  ///////////////////////////////////////////////////////
  //Mixitup
  if ($.fn.mixItUp) {
    $(".work-mixi").mixItUp();
  }
  ///////////////////////////////////////////////////////
  // Bottom to top start
  $(document).ready(function () {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 100) {
        $("#scroll-top").fadeIn();
      } else {
        $("#scroll-top").fadeOut();
      }
    });
    $("#scroll-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  });
  // Bottom to top End

  ///////////////////////////////////////////////////////
  // Odometer Counter
  $(".counter-item").each(function () {
    $(this).isInViewport(function (status) {
      if (status === "entered") {
        for (
          var i = 0;
          i < document.querySelectorAll(".odometer").length;
          i++
        ) {
          var el = document.querySelectorAll(".odometer")[i];
          el.innerHTML = el.getAttribute("data-odometer-final");
        }
      }
    });
  });

  window.onload = function () {
    // Custom Cursor
    const cursor = document.querySelector(".cursor");

    if (cursor) {
      const editCursor = (e) => {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
      };
      window.addEventListener("mousemove", editCursor);

      document.querySelectorAll("a, .cursor-pointer").forEach((item) => {
        item.addEventListener("mouseover", () => {
          cursor.classList.add("cursor-active");
        });

        item.addEventListener("mouseout", () => {
          cursor.classList.remove("cursor-active");
        });
      });
    }
  };

  // Custom Cursor End

  // Select2
  if ($.fn.select2) {
    $(".select2").select2({
      minimumResultsForSearch: Infinity,
    });
  }

  // Pricing Toggle

  const tableWrapper = document.querySelector(".price_wrapper");
  const switchInputs = document.querySelectorAll(".switch-wrapper input");
  const prices = tableWrapper?.querySelectorAll(".price");
  const toggleClass = "hide";

  for (const switchInput of switchInputs) {
    switchInput.addEventListener("input", function () {
      for (const price of prices) {
        price.classList.add(toggleClass);
      }
      const activePrices = tableWrapper.querySelectorAll(
        `.price.${switchInput.id}`
      );
      for (const activePrice of activePrices) {
        activePrice.classList.remove(toggleClass);
      }
    });
  }

  // Pricing Toggle End

  function initPricingToggle() {
    const switchCheckbox = $(
      '.pricing-5__plans-btns .switch input[type="checkbox"]'
    );
    const yearlyLabel = $(".pricing-5__plans-btns .yearly");
    const monthlyLabel = $(".pricing-5__plans-btns .monthly");
    const monthlyPrices = $(".pricing-5__plan-item .price.monthly");
    const yearlyPrices = $(".pricing-5__plan-item .price.yearly");

    if (
      !switchCheckbox.length ||
      !yearlyLabel.length ||
      !monthlyLabel.length ||
      !monthlyPrices.length ||
      !yearlyPrices.length
    ) {
      return;
    }

    function togglePricing() {
      if (switchCheckbox.is(":checked")) {
        monthlyLabel.addClass("current");
        yearlyLabel.removeClass("current");
        monthlyPrices.removeClass("d-none");
        yearlyPrices.addClass("d-none");
      } else {
        yearlyLabel.addClass("current");
        monthlyLabel.removeClass("current");
        yearlyPrices.removeClass("d-none");
        monthlyPrices.addClass("d-none");
      }
    }

    // Toggle when checkbox changes
    switchCheckbox.on("change", togglePricing);

    // Toggle when labels are clicked
    yearlyLabel.on("click", function () {
      switchCheckbox.prop("checked", false).trigger("change");
    });

    monthlyLabel.on("click", function () {
      switchCheckbox.prop("checked", true).trigger("change");
    });

    // Initialize on load
    togglePricing();
  }

  // Initialize pricing toggle
  initPricingToggle();

  //Text Animation
  if (typeof gsap !== "undefined" && typeof SplitText !== "undefined") {
    let splitTextLines = gsap.utils.toArray(".text-anim");

    splitTextLines.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: "top 90%",
          duration: 2,
          end: "bottom 60%",
          scrub: false,
          markers: false,
          toggleActions: "play none none none",
        },
      });

      const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: "lines" });
      tl.from(itemSplitted.lines, {
        duration: 0.9,
        delay: 0.2,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1,
      });
    });
  }

  // Set Background Images JS
  const setBackgroundImages = () => {
    var elements = document.querySelectorAll("[data-bg-src]");
    if (elements?.length > 0) {
      elements.forEach(function (element) {
        var src = element.getAttribute("data-bg-src");
        element.style.backgroundImage = "url(" + src + ")";
        element.classList.add("background-image");
        element.removeAttribute("data-bg-src");
      });
    }
  };
  setBackgroundImages();

  /*live auction slider*/
  var live_auction_slider__one = new Swiper(".live_auction_slider__one", {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    centeredSlides: false,
    autoplay: {
      delay: 3500,
    },
    navigation: {
      nextEl: ".live_auction__next",
      prevEl: ".live_auction__prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 4,
      },
    },
  });

  /*collection slider one*/
  var collection_slider__one = new Swiper(".collection_slider__one", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    centeredSlides: false,
    autoplay: {
      delay: 3500,
    },
    navigation: {
      nextEl: ".collection__next",
      prevEl: ".collection__prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  /*collection slider two*/
  var collection_slider__two = new Swiper(".collection_slider__two", {
    slidesPerView: 1,
    speed: 1500,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    centeredSlides: false,
    autoplay: {
      delay: 3500,
    },
    navigation: {
      nextEl: ".collection__three_next",
      prevEl: ".collection__three_prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 4,
      },
    },
  });

  /*sellers slider one*/
  var serllers_slider__one = new Swiper(".serllers_slider__one", {
    slidesPerView: 2,
    speed: 1200,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    centeredSlides: false,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".seller__next",
      prevEl: ".seller__prev",
    },
    breakpoints: {
      575: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });

  /*artist slider one*/
  var artist_slider__one = new Swiper(".artist_slider__one", {
    slidesPerView: 2,
    speed: 1200,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    centeredSlides: false,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".artist__next",
      prevEl: ".artist__prev",
    },
    breakpoints: {
      575: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  }); /*artist slider one*/
  var artist_slider__one = new Swiper(".artist_slider__one", {
    slidesPerView: 2,
    speed: 1200,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    centeredSlides: false,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".artist__next",
      prevEl: ".artist__prev",
    },
    breakpoints: {
      575: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });

  /***********
   Wow js Initialization
   ************/
  function wowAnimation() {
    if (typeof WOW !== "undefined") {
      new WOW({
        offset: 100,
        animateClass: "animated",
        mobile: true,
      }).init();
    }
  }

  jQuery(window).on("load", function () {
    wowAnimation();
  });

  /*nice select init*/

  if ($.fn.niceSelect) {
    $(document).ready(function () {
      $(".select__nice").niceSelect();
    });
  }

  /*dark mood custom JS*/
  var toggleSlider = document.getElementById("slider");

  toggleSlider &&
    toggleSlider.addEventListener("change", (e) => {
      if (e.target.checked === true) {
        if (document.body.classList.contains("theme-dark-active")) {
          document.body.classList.add("theme-light-active");
          document.body.classList.remove("theme-dark-active");
          localStorage.setItem("activeTheme", "theme-light-active");
        } else if (document.body.classList.contains("theme-light-active")) {
          document.body.classList.add("theme-dark-active");
          document.body.classList.remove("theme-light-active");
          localStorage.setItem("activeTheme", "theme-dark-active");
        }
      }

      if (e.target.checked === false) {
        if (document.body.classList.contains("theme-dark-active")) {
          document.body.classList.add("theme-light-active");
          document.body.classList.remove("theme-dark-active");
          localStorage.setItem("activeTheme", "theme-light-active");
        } else if (document.body.classList.contains("theme-light-active")) {
          document.body.classList.add("theme-dark-active");
          document.body.classList.remove("theme-light-active");
          localStorage.setItem("activeTheme", "theme-dark-active");
        }
      }
    });

  var activeTheme = localStorage.getItem("activeTheme");
  if (activeTheme == "theme-light-active") {
    document.body.classList.add("theme-light-active");
    document.body.classList.remove("theme-dark-active");
    $("input.check-status").prop("checked", false);
  } else {
    document.body.classList.add("theme-dark-active");
    document.body.classList.remove("theme-light-active");
    $("input.check-status").prop("checked", true);
  }

  /*custom dropdown*/
  $(".has__dropdown").click(function (e) {
    $(this).next().toggleClass("dropdown-active");
    e.stopPropagation();
  });

  $(document).click(function () {
    $(".has__dropdown").next().removeClass("dropdown-active");
  });
  $(".custom__dropdown").click(function (e) {
    e.stopPropagation();
  });

  /*Mobil searchbar custom JS*/
  const searchOpen = document.getElementById("navSearch");
  const closeSearch = document.getElementById("closeSearch");
  searchOpen &&
    searchOpen.addEventListener("click", () => {
      document.getElementById("mobilSearch").classList.add("active-search");
    });
  closeSearch &&
    closeSearch.addEventListener("click", () => {
      if (
        document
          .getElementById("mobilSearch")
          .classList.contains("active-search")
      ) {
        document
          .getElementById("mobilSearch")
          .classList.remove("active-search");
      }
    });

  window.onclick = function (event) {
    if (event.target == document.getElementById("mobilSearch")) {
      document.getElementById("mobilSearch").classList.remove("active-search");
    }
  };

  /*fancybox JS*/
  if ($.fancybox) {
    $("[data-fancybox]").fancybox({
      youtube: {
        controls: 0,
        showinfo: 0,
      },
      vimeo: {
        color: "f00",
      },
    });
  }
})(jQuery);
