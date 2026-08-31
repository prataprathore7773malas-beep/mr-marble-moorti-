/* =========================================================
   LUXURY WEBSITE — PREMIUM INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. PRELOADER
     ========================================================= */

  const preloader = document.querySelector(".preloader");

  window.addEventListener("load", () => {
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add("loaded");

        setTimeout(() => {
          preloader.style.display = "none";
        }, 900);

      }, 700);
    }
  });


  /* =========================================================
     2. NAVBAR — SCROLL EFFECT
     ========================================================= */

  const navbar = document.querySelector(".navbar");

  const handleNavbar = () => {
    if (!navbar) return;

    if (window.scrollY > 70) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbar, { passive: true });
  handleNavbar();


  /* =========================================================
     3. MOBILE MENU
     ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }


  /* =========================================================
     4. SMOOTH SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

      const targetID = this.getAttribute("href");

      if (!targetID || targetID === "#") return;

      const target = document.querySelector(targetID);

      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =========================================================
     5. PREMIUM SCROLL REVEAL
     ========================================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-left, .reveal-right, .fade-up, .section-heading, .collection-card, .about-content, .about-image, .contact-content, .contact-form, .service-card, .feature-card, .stat-item"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================================================
     6. STAGGERED COLLECTION ANIMATION
     ========================================================= */

  const collectionCards = document.querySelectorAll(
    ".collection-card"
  );

  collectionCards.forEach((card, index) => {

    card.style.transitionDelay =
      `${Math.min(index * 90, 700)}ms`;

  });


  /* =========================================================
     7. MAGNETIC BUTTON EFFECT
     ========================================================= */

  const magneticElements = document.querySelectorAll(
    ".magnetic, .btn, .magnetic-btn, .cta-button, .whatsapp-float, .call-float"
  );

  magneticElements.forEach(element => {

    element.addEventListener("mousemove", (e) => {

      const rect = element.getBoundingClientRect();

      const x =
        e.clientX -
        rect.left -
        rect.width / 2;

      const y =
        e.clientY -
        rect.top -
        rect.height / 2;

      const strength = 0.18;

      element.style.transform =
        `translate(${x * strength}px, ${y * strength}px)`;

    });

    element.addEventListener("mouseleave", () => {

      element.style.transform =
        "translate(0px, 0px)";

    });

  });


  /* =========================================================
     8. IMAGE HOVER PARALLAX
     ========================================================= */

  const imageCards = document.querySelectorAll(
    ".collection-card, .image-card, .about-image, .gallery-item"
  );

  imageCards.forEach(card => {

    const image = card.querySelector("img");

    if (!image) return;

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (e.clientY - rect.top) /
        rect.height -
        0.5;

      image.style.transform =
        `scale(1.07) translate(${x * 10}px, ${y * 10}px)`;

    });

    card.addEventListener("mouseleave", () => {

      image.style.transform =
        "scale(1) translate(0,0)";

    });

  });


  /* =========================================================
     9. HERO PARALLAX
     ========================================================= */

  const hero = document.querySelector(".hero");
  const heroBackground = document.querySelector(
    ".hero-bg, .hero-background, .hero img"
  );

  if (hero && heroBackground) {

    window.addEventListener("scroll", () => {

      const scrollY = window.scrollY;

      if (scrollY < window.innerHeight) {

        heroBackground.style.transform =
          `translateY(${scrollY * 0.12}px) scale(1.03)`;

      }

    }, { passive: true });

  }


  /* =========================================================
     10. HERO CONTENT REVEAL
     ========================================================= */

  const heroElements = document.querySelectorAll(
    ".hero .hero-content > *, .hero-content > *"
  );

  heroElements.forEach((element, index) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";

    element.style.transition =
      `opacity 1.1s cubic-bezier(.16,1,.3,1) ${index * 160 + 500}ms,
       transform 1.1s cubic-bezier(.16,1,.3,1) ${index * 160 + 500}ms`;

  });

  setTimeout(() => {

    heroElements.forEach(element => {

      element.style.opacity = "1";
      element.style.transform = "translateY(0)";

    });

  }, 400);


  /* =========================================================
     11. COUNTER ANIMATION
     ========================================================= */

  const counters = document.querySelectorAll(
    ".counter, [data-counter]"
  );

  const counterObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target =
          parseInt(
            counter.getAttribute("data-counter") ||
            counter.innerText.replace(/\D/g, ""),
            10
          );

        if (isNaN(target)) return;

        let current = 0;

        const duration = 1800;
        const increment = target / (duration / 16);

        const updateCounter = () => {

          current += increment;

          if (current < target) {

            counter.innerText =
              Math.floor(current).toLocaleString();

            requestAnimationFrame(updateCounter);

          } else {

            counter.innerText =
              target.toLocaleString();

          }

        };

        updateCounter();

        counterObserver.unobserve(counter);

      });

    },
    {
      threshold: 0.5
    }
  );

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });


  /* =========================================================
     12. FAQ ACCORDION
     ========================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const question =
      item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

      const isActive =
        item.classList.contains("active");

      faqItems.forEach(otherItem => {
        otherItem.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }

    });

  });


  /* =========================================================
     13. COLLECTION IMAGE LOAD REVEAL
     ========================================================= */

  const collectionImages =
    document.querySelectorAll(
      ".collection-card img"
    );

  collectionImages.forEach(image => {

    image.addEventListener("load", () => {

      image.classList.add("image-loaded");

    });

  });


  /* =========================================================
     14. LAZY IMAGE REVEAL
     ========================================================= */

  const lazyImages =
    document.querySelectorAll("img[loading='lazy']");

  const imageObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const image = entry.target;

        image.classList.add("visible");

        imageObserver.unobserve(image);

      });

    },
    {
      rootMargin: "100px"
    }
  );

  lazyImages.forEach(image => {
    imageObserver.observe(image);
  });


  /* =========================================================
     15. SECTION ACTIVE NAVIGATION
     ========================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navigationLinks =
    document.querySelectorAll(
      ".nav-links a[href^='#']"
    );

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navigationLinks.forEach(link => {

          link.classList.remove("active");

          if (
            link.getAttribute("href") === `#${id}`
          ) {
            link.classList.add("active");
          }

        });

      });

    },
    {
      threshold: 0.35
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =========================================================
     16. MOUSE LIGHT EFFECT
     ========================================================= */

  const glow =
    document.querySelector(".cursor-glow");

  if (glow && window.matchMedia(
    "(pointer:fine)"
  ).matches) {

    window.addEventListener("mousemove", e => {

      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;

    });

  }


  /* =========================================================
     17. PREMIUM CARD TILT
     ========================================================= */

  const tiltCards =
    document.querySelectorAll(
      ".tilt-card, .service-card, .feature-card"
    );

  if (window.matchMedia("(pointer:fine)").matches) {

    tiltCards.forEach(card => {

      card.addEventListener("mousemove", e => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - 0.5) * -5;

        const rotateY =
          ((x / rect.width) - 0.5) * 5;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;

      });

      card.addEventListener("mouseleave", () => {

        card.style.transform =
          "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

      });

    });

  }


  /* =========================================================
     18. SCROLL PROGRESS
     ========================================================= */

  const progressBar =
    document.querySelector(".scroll-progress");

  if (progressBar) {

    window.addEventListener("scroll", () => {

      const scrollTop =
        window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      progressBar.style.width =
        `${progress}%`;

    }, { passive: true });

  }


  /* =========================================================
     19. BACK TO TOP
     ========================================================= */

  const backTop =
    document.querySelector(
      ".back-to-top"
    );

  if (backTop) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 600) {
        backTop.classList.add("show");
      } else {
        backTop.classList.remove("show");
      }

    }, { passive: true });

    backTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =========================================================
     20. CONTACT FORM → WHATSAPP
     ========================================================= */

  const enquiryForm =
    document.querySelector(
      "#enquiryForm, .enquiry-form, #contactForm"
    );

  if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (e) {

      e.preventDefault();

      const name =
        this.querySelector(
          '[name="name"]'
        )?.value.trim() || "";

      const phone =
        this.querySelector(
          '[name="phone"]'
        )?.value.trim() || "";

      const email =
        this.querySelector(
          '[name="email"]'
        )?.value.trim() || "";

      const message =
        this.querySelector(
          '[name="message"]'
        )?.value.trim() || "";

      const whatsappNumber =
        "918741917946";

      const whatsappMessage =
        `Hello, I would like to make an enquiry.

Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}`;

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`;

      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

    });

  }


  /* =========================================================
     21. PHONE NUMBER CLICK TRACKING
     ========================================================= */

  document.querySelectorAll(
    'a[href^="tel:"]'
  ).forEach(link => {

    link.addEventListener("click", () => {

      console.log(
        "Call initiated:",
        link.getAttribute("href")
      );

    });

  });


  /* =========================================================
     22. WHATSAPP LINKS
     ========================================================= */

  document.querySelectorAll(
    ".whatsapp-link"
  ).forEach(link => {

    link.addEventListener("click", e => {

      const number =
        "918741917946";

      const message =
        "Hello, I would like to know more about your products and services.";

      const url =
        `https://wa.me/${number}?text=${encodeURIComponent(
          message
        )}`;

      link.href = url;

    });

  });


  /* =========================================================
     23. IMAGE MAGNETIC HOVER
     ========================================================= */

  const magneticImages =
    document.querySelectorAll(
      ".magnetic-image"
    );

  magneticImages.forEach(image => {

    image.addEventListener("mousemove", e => {

      const rect =
        image.getBoundingClientRect();

      const x =
        (e.clientX - rect.left - rect.width / 2) *
        0.025;

      const y =
        (e.clientY - rect.top - rect.height / 2) *
        0.025;

      image.style.transform =
        `translate(${x}px, ${y}px) scale(1.03)`;

    });

    image.addEventListener("mouseleave", () => {

      image.style.transform =
        "translate(0,0) scale(1)";

    });

  });


  /* =========================================================
     24. SCROLLING TEXT / MARQUEE PAUSE
     ========================================================= */

  document.querySelectorAll(
    ".marquee, .marquee-track"
  ).forEach(marquee => {

    marquee.addEventListener(
      "mouseenter",
      () => {
        marquee.style.animationPlayState =
          "paused";
      }
    );

    marquee.addEventListener(
      "mouseleave",
      () => {
        marquee.style.animationPlayState =
          "running";
      }
    );

  });


  /* =========================================================
     25. FORM FIELD FOCUS EFFECT
     ========================================================= */

  document.querySelectorAll(
    ".form-group input, .form-group textarea, .form-group select"
  ).forEach(field => {

    field.addEventListener("focus", () => {

      field.parentElement.classList.add(
        "focused"
      );

    });

    field.addEventListener("blur", () => {

      if (!field.value.trim()) {

        field.parentElement.classList.remove(
          "focused"
        );

      }

    });

  });


  /* =========================================================
     26. SCROLL-BASED HERO FADE
     ========================================================= */

  const heroContent =
    document.querySelector(".hero-content");

  if (heroContent) {

    window.addEventListener("scroll", () => {

      const scroll =
        window.scrollY;

      if (scroll < window.innerHeight) {

        const opacity =
          Math.max(
            0,
            1 - scroll / 650
          );

        const translate =
          scroll * 0.12;

        heroContent.style.opacity =
          opacity;

        heroContent.style.transform =
          `translateY(${translate}px)`;

      }

    }, { passive: true });

  }


  /* =========================================================
     27. COLLECTION FILTER
     ========================================================= */

  const filterButtons =
    document.querySelectorAll(
      "[data-filter]"
    );

  const filterItems =
    document.querySelectorAll(
      "[data-category]"
    );

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter =
        button.getAttribute(
          "data-filter"
        );

      filterButtons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      filterItems.forEach(item => {

        const category =
          item.getAttribute(
            "data-category"
          );

        if (
          filter === "all" ||
          category === filter
        ) {

          item.style.display = "";
          
          requestAnimationFrame(() => {
            item.classList.remove("hidden");
            item.classList.add("show");
          });

        } else {

          item.classList.remove("show");
          item.classList.add("hidden");

          setTimeout(() => {
            item.style.display = "none";
          }, 450);

        }

      });

    });

  });


  /* =========================================================
     28. PREVENT IMAGE DRAG
     ========================================================= */

  document.querySelectorAll("img").forEach(img => {

    img.addEventListener("dragstart", e => {
      e.preventDefault();
    });

  });


  /* =========================================================
     29. ESC KEY — CLOSE MOBILE MENU / FAQ
     ========================================================= */

  document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

      if (menuToggle && navLinks) {

        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");

      }

      faqItems.forEach(item => {
        item.classList.remove("active");
      });

    }

  });


  /* =========================================================
     30. REDUCED MOTION ACCESSIBILITY
     ========================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (prefersReducedMotion) {

    document.documentElement.classList.add(
      "reduce-motion"
    );

  }


  /* =========================================================
     COMPLETE
     ========================================================= */

  console.log(
    "Luxury website interactions initialized."
  );

});
