/* =========================================================
   M.R. MOORTI ART
   PREMIUM LUXURY JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     GLOBAL SELECTORS
  ======================================================= */

  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  const loader = document.querySelector(".page-loader");



  /* =======================================================
     PAGE LOADER
  ======================================================= */

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loader) {
        loader.classList.add("loaded");
      }

      document.body.classList.add("page-loaded");

    }, 500);

  });



  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  let lastScroll = 0;

  function handleHeader() {

    const currentScroll = window.scrollY;

    if (!header) return;

    if (currentScroll > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    /*
      Optional hide/show effect on mobile
    */

    if (window.innerWidth <= 700) {

      if (
        currentScroll > lastScroll &&
        currentScroll > 180
      ) {

        header.style.transform = "translateY(-100%)";

      } else {

        header.style.transform = "translateY(0)";

      }

    }

    lastScroll = currentScroll;

  }

  window.addEventListener(
    "scroll",
    handleHeader,
    { passive: true }
  );

  handleHeader();



  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("open");

      menuToggle.classList.toggle(
        "active",
        isOpen
      );

      body.classList.toggle(
        "no-scroll",
        isOpen
      );

    });


    /*
      Close menu after clicking navigation
    */

    const menuItems =
      navLinks.querySelectorAll("a");

    menuItems.forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

        body.classList.remove("no-scroll");

      });

    });

  }



  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) return;

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header
          ? header.offsetHeight
          : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({

        top: targetPosition,

        behavior: "smooth"

      });

    });

  });



  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal-up, .reveal-left, .reveal-right"
    );


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -60px 0px"
        }
      );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("active");

    });

  }



  /* =======================================================
     STAGGERED REVEALS
  ======================================================= */

  const staggerGroups = [
    ".service-item",
    ".collection-card",
    ".contact-detail",
    ".form-field"
  ];


  staggerGroups.forEach(selector => {

    const elements =
      document.querySelectorAll(selector);

    elements.forEach((element, index) => {

      element.style.transitionDelay =
        `${Math.min(index * 0.08, 0.5)}s`;

    });

  });



  /* =======================================================
     MAGNETIC EFFECT
  ======================================================= */

  const magneticElements =
    document.querySelectorAll(
      ".magnetic, .luxury-btn, .circle-link, .slider-btn, .social-btn, .floating-btn"
    );


  /*
    Disable magnetic movement on touch/mobile.
  */

  if (
    window.matchMedia("(pointer:fine)").matches
  ) {

    magneticElements.forEach(element => {

      element.addEventListener(
        "mousemove",
        event => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          const strength =
            element.classList.contains(
              "luxury-btn"
            )
              ? 0.18
              : 0.28;

          element.style.transform =
            `translate(${x * strength}px, ${y * strength}px)`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform =
            "translate(0,0)";

        }
      );

    });

  }



  /* =======================================================
     CUSTOM CURSOR
  ======================================================= */

  if (
    cursorDot &&
    cursorRing &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    document.addEventListener(
      "mousemove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left =
          `${mouseX}px`;

        cursorDot.style.top =
          `${mouseY}px`;

      }
    );


    function animateCursor() {

      ringX +=
        (mouseX - ringX) * 0.12;

      ringY +=
        (mouseY - ringY) * 0.12;

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

      requestAnimationFrame(
        animateCursor
      );

    }

    animateCursor();


    /*
      Cursor hover interaction
    */

    const cursorTargets =
      document.querySelectorAll(
        "a, button, .collection-card, .service-item, input, textarea, select"
      );


    cursorTargets.forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {
          body.classList.add("cursor-hover");
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          body.classList.remove("cursor-hover");
        }
      );

    });

  }



  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const hero =
    document.querySelector(".hero");

  const heroImage =
    document.querySelector(".hero-image");


  if (
    hero &&
    heroImage &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    hero.addEventListener(
      "mousemove",
      event => {

        const rect =
          hero.getBoundingClientRect();

        const x =
          (event.clientX -
            rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY -
            rect.top) /
          rect.height -
          0.5;

        heroImage.style.transform =
          `scale(1.04) translate(${x * -12}px, ${y * -12}px)`;

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        heroImage.style.transform =
          "scale(1.04) translate(0,0)";

      }
    );

  }



  /* =======================================================
     HERO SCROLL PARALLAX
  ======================================================= */

  function heroScrollEffect() {

    if (!heroImage || !hero) return;

    if (window.innerWidth <= 600) return;

    const scroll =
      window.scrollY;

    const heroHeight =
      hero.offsetHeight;

    if (scroll <= heroHeight) {

      heroImage.style.transform =
        `scale(1.04) translateY(${scroll * 0.08}px)`;

    }

  }

  window.addEventListener(
    "scroll",
    heroScrollEffect,
    { passive: true }
  );



  /* =======================================================
     COLLECTION SLIDER
  ======================================================= */

  const slider =
    document.querySelector(
      ".collection-slider"
    );

  const track =
    document.querySelector(
      ".collection-track"
    );

  const cards =
    document.querySelectorAll(
      ".collection-card"
    );

  const prevBtn =
    document.querySelector(
      ".slider-prev"
    );

  const nextBtn =
    document.querySelector(
      ".slider-next"
    );

  const progress =
    document.querySelector(
      ".collection-progress span"
    );

  const currentCount =
    document.querySelector(
      ".current-count"
    );

  const totalCount =
    document.querySelector(
      ".total-count"
    );


  let currentSlide = 0;

  let cardsPerView = 3;

  let maxSlide = 0;


  function calculateSlider() {

    if (!track || !slider) return;

    const width =
      window.innerWidth;


    if (width <= 600) {

      cardsPerView = 1;

    } else if (width <= 900) {

      cardsPerView = 1.5;

    } else if (width <= 1200) {

      cardsPerView = 2;

    } else {

      cardsPerView = 3;

    }


    maxSlide =
      Math.max(
        0,
        cards.length -
        Math.floor(cardsPerView)
      );


    if (currentSlide > maxSlide) {

      currentSlide = maxSlide;

    }


    updateSlider(false);

  }



  function getCardWidth() {

    if (!cards.length) return 0;

    const card =
      cards[0];

    const style =
      window.getComputedStyle(
        track
      );

    const gap =
      parseFloat(
        style.columnGap ||
        style.gap ||
        0
      );

    return (
      card.getBoundingClientRect().width +
      gap
    );

  }



  function updateSlider(animate = true) {

    if (!track) return;

    const cardWidth =
      getCardWidth();

    if (!cardWidth) return;

    if (!animate) {

      track.style.transition =
        "none";

    } else {

      track.style.transition =
        "transform .85s cubic-bezier(.22,.61,.36,1)";

    }


    const offset =
      currentSlide * cardWidth;

    track.style.transform =
      `translate3d(-${offset}px,0,0)`;


    /*
      Counter
    */

    if (currentCount) {

      currentCount.textContent =
        String(currentSlide + 1)
          .padStart(2, "0");

    }


    if (totalCount) {

      totalCount.textContent =
        String(
          Math.max(1, maxSlide + 1)
        ).padStart(2, "0");

    }


    /*
      Progress
    */

    if (progress) {

      const percentage =
        maxSlide === 0
          ? 100
          : ((currentSlide + 1) /
             (maxSlide + 1)) *
            100;

      progress.style.width =
        `${percentage}%`;

    }


    /*
      Buttons
    */

    if (prevBtn) {

      prevBtn.disabled =
        currentSlide <= 0;

      prevBtn.style.opacity =
        currentSlide <= 0
          ? ".35"
          : "1";

    }


    if (nextBtn) {

      nextBtn.disabled =
        currentSlide >= maxSlide;

      nextBtn.style.opacity =
        currentSlide >= maxSlide
          ? ".35"
          : "1";

    }


    requestAnimationFrame(() => {

      track.style.transition =
        "transform .85s cubic-bezier(.22,.61,.36,1)";

    });

  }



  if (nextBtn) {

    nextBtn.addEventListener(
      "click",
      () => {

        if (
          currentSlide <
          maxSlide
        ) {

          currentSlide++;

          updateSlider();

        }

      }
    );

  }


  if (prevBtn) {

    prevBtn.addEventListener(
      "click",
      () => {

        if (
          currentSlide > 0
        ) {

          currentSlide--;

          updateSlider();

        }

      }
    );

  }


  /*
    Keyboard control
  */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "ArrowRight" &&
        currentSlide < maxSlide
      ) {

        currentSlide++;

        updateSlider();

      }

      if (
        event.key === "ArrowLeft" &&
        currentSlide > 0
      ) {

        currentSlide--;

        updateSlider();

      }

    }
  );


  /*
    Touch / Swipe
  */

  if (slider) {

    let startX = 0;
    let startY = 0;

    let isDragging = false;


    slider.addEventListener(
      "pointerdown",
      event => {

        startX =
          event.clientX;

        startY =
          event.clientY;

        isDragging = true;

        slider.setPointerCapture(
          event.pointerId
        );

      }
    );


    slider.addEventListener(
      "pointerup",
      event => {

        if (!isDragging) return;

        const endX =
          event.clientX;

        const endY =
          event.clientY;

        const diffX =
          endX - startX;

        const diffY =
          endY - startY;


        isDragging = false;


        /*
          Only horizontal gestures
        */

        if (
          Math.abs(diffX) >
          45 &&
          Math.abs(diffX) >
          Math.abs(diffY)
        ) {

          if (
            diffX < 0 &&
            currentSlide < maxSlide
          ) {

            currentSlide++;

          } else if (
            diffX > 0 &&
            currentSlide > 0
          ) {

            currentSlide--;

          }

          updateSlider();

        }

      }
    );


    slider.addEventListener(
      "pointercancel",
      () => {

        isDragging = false;

      }
    );

  }


  window.addEventListener(
    "resize",
    calculateSlider
  );


  calculateSlider();



  /* =======================================================
     IMAGE REVEAL
  ======================================================= */

  const lazyImages =
    document.querySelectorAll(
      "img"
    );


  lazyImages.forEach(image => {

    image.addEventListener(
      "load",
      () => {

        image.classList.add(
          "image-loaded"
        );

      }
    );

  });



  /* =======================================================
     IMAGE TILT EFFECT
  ======================================================= */

  const tiltElements =
    document.querySelectorAll(
      ".about-visual, .collection-card"
    );


  if (
    window.matchMedia("(pointer:fine)").matches
  ) {

    tiltElements.forEach(element => {

      element.addEventListener(
        "mousemove",
        event => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const rotateX =
            ((y / rect.height) -
              0.5) *
            -2.5;

          const rotateY =
            ((x / rect.width) -
              0.5) *
            2.5;


          element.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

        }
      );

    });

  }



  /* =======================================================
     FAQ ACCORDION
  ======================================================= */

  const faqItems =
    document.querySelectorAll(
      ".faq-item"
    );


  faqItems.forEach(item => {

    const question =
      item.querySelector(
        ".faq-question"
      );

    const answer =
      item.querySelector(
        ".faq-answer"
      );


    if (!question || !answer) return;


    question.addEventListener(
      "click",
      () => {

        const isActive =
          item.classList.contains(
            "active"
          );


        /*
          Close all
        */

        faqItems.forEach(other => {

          other.classList.remove(
            "active"
          );

          const otherAnswer =
            other.querySelector(
              ".faq-answer"
            );

          if (otherAnswer) {

            otherAnswer.style.maxHeight =
              null;

          }

        });


        /*
          Open clicked
        */

        if (!isActive) {

          item.classList.add(
            "active"
          );

          answer.style.maxHeight =
            answer.scrollHeight +
            "px";

        }

      }
    );

  });



  /* =======================================================
     CONTACT FORM → WHATSAPP
  ======================================================= */

  const contactForm =
    document.querySelector(
      ".contact-form"
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const name =
          contactForm.querySelector(
            '[name="name"]'
          )?.value.trim() || "";


        const phone =
          contactForm.querySelector(
            '[name="phone"]'
          )?.value.trim() || "";


        const email =
          contactForm.querySelector(
            '[name="email"]'
          )?.value.trim() || "";


        const message =
          contactForm.querySelector(
            '[name="message"]'
          )?.value.trim() || "";


        const project =
          contactForm.querySelector(
            '[name="project"]'
          )?.value.trim() || "";


        /*
          Basic validation
        */

        if (!name) {

          alert(
            "Please enter your name."
          );

          return;

        }


        if (!phone) {

          alert(
            "Please enter your phone number."
          );

          return;

        }


        /*
          WhatsApp number
          Replace if required.
        */

        const whatsappNumber =
          "91XXXXXXXXXX";


        const whatsappMessage =

`Hello M.R. Moorti Art,

I would like to enquire about your work.

Name: ${name}
Phone: ${phone}
Email: ${email}
Project: ${project}

Message:
${message}`;


        const whatsappURL =
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`;


        window.open(
          whatsappURL,
          "_blank"
        );


      }
    );

  }



  /* =======================================================
     PHONE / WHATSAPP FLOATING BUTTONS
  ======================================================= */

  const floatingButtons =
    document.querySelectorAll(
      ".floating-btn"
    );


  floatingButtons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        /*
          Allows normal href behaviour.
        */

        if (
          button.getAttribute("href")
        ) {

          return;

        }

      }
    );

  });



  /* =======================================================
     SCROLL TO TOP
  ======================================================= */

  const topButtons =
    document.querySelectorAll(
      ".back-to-top"
    );


  topButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        window.scrollTo({

          top:0,

          behavior:"smooth"

        });

      }
    );

  });



  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navigationLinks =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );


  if (
    sections.length &&
    navigationLinks.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) return;


            const id =
              entry.target.id;


            navigationLinks.forEach(link => {

              link.classList.remove(
                "active"
              );


              if (
                link.getAttribute("href") ===
                `#${id}`
              ) {

                link.classList.add(
                  "active"
                );

              }

            });

          });

        },
        {
          threshold:.25
        }
      );


    sections.forEach(section => {

      sectionObserver.observe(
        section
      );

    });

  }



  /* =======================================================
     NUMBER COUNTER
  ======================================================= */

  const counters =
    document.querySelectorAll(
      "[data-counter]"
    );


  if (
    counters.length &&
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) return;


            const element =
              entry.target;


            const target =
              parseInt(
                element.dataset.counter,
                10
              );


            if (
              Number.isNaN(target)
            ) return;


            let current = 0;


            const duration =
              1500;


            const startTime =
              performance.now();


            function animateCounter(
              currentTime
            ) {

              const progress =
                Math.min(
                  (currentTime -
                    startTime) /
                  duration,
                  1
                );


              const eased =
                1 -
                Math.pow(
                  1 - progress,
                  4
                );


              current =
                Math.floor(
                  eased * target
                );


              element.textContent =
                current.toLocaleString();


              if (
                progress < 1
              ) {

                requestAnimationFrame(
                  animateCounter
                );

              } else {

                element.textContent =
                  target.toLocaleString();

              }

            }


            requestAnimationFrame(
              animateCounter
            );


            counterObserver.unobserve(
              element
            );

          });

        },
        {
          threshold:.7
        }
      );


    counters.forEach(counter => {

      counterObserver.observe(
        counter
      );

    });

  }



  /* =======================================================
     HORIZONTAL LINE ANIMATION
  ======================================================= */

  const lines =
    document.querySelectorAll(
      ".gold-line, .label-line"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const lineObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "line-visible"
              );

              lineObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold:.5
        }
      );


    lines.forEach(line => {

      lineObserver.observe(
        line
      );

    });

  }



  /* =======================================================
     MOUSE FOLLOW GLOW
  ======================================================= */

  const glowSections =
    document.querySelectorAll(
      ".collection-section, .worldwide-section"
    );


  if (
    window.matchMedia("(pointer:fine)").matches
  ) {

    glowSections.forEach(section => {

      section.addEventListener(
        "mousemove",
        event => {

          const rect =
            section.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;


          section.style.setProperty(
            "--mouse-x",
            `${x}px`
          );

          section.style.setProperty(
            "--mouse-y",
            `${y}px`
          );

        }
      );

    });

  }



  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        if (navLinks) {

          navLinks.classList.remove(
            "open"
          );

        }

        if (menuToggle) {

          menuToggle.classList.remove(
            "active"
          );

        }

        body.classList.remove(
          "no-scroll"
        );

      }

    }
  );



  /* =======================================================
     PREVENT IMAGE DRAGGING
  ======================================================= */

  document.querySelectorAll(
    "img"
  ).forEach(image => {

    image.setAttribute(
      "draggable",
      "false"
    );

    image.addEventListener(
      "dragstart",
      event => {

        event.preventDefault();

      }
    );

  });



  /* =======================================================
     COLLECTION CARD CLICK
  ======================================================= */

  cards.forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const link =
          card.dataset.link;

        if (link) {

          window.location.href =
            link;

        }

      }
    );

  });



  /* =======================================================
     PAGE VISIBILITY
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden
      ) {

        body.classList.add(
          "page-hidden"
        );

      } else {

        body.classList.remove(
          "page-hidden"
        );

      }

    }
  );



  /* =======================================================
     FINAL INITIALIZATION
  ======================================================= */

  setTimeout(() => {

    document.body.classList.add(
      "js-ready"
    );

  }, 100);


});
