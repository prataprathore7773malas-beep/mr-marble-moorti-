/* =========================================================
   LUXURY WEBSITE — LIGHTWEIGHT INTERACTIONS
   No heavy libraries / No preloader
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. NAVBAR — SCROLL EFFECT
     ========================================================= */

  const navbar = document.querySelector(".navbar");

  const handleNavbar = () => {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbar, { passive: true });
  handleNavbar();


  /* =========================================================
     2. MOBILE MENU
     ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }


  /* =========================================================
     3. SMOOTH ANCHOR SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

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
     4. SLOW SCROLL REVEAL
     ========================================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale, .section-heading, .collection-card, .about-image, .about-content"
  );

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("revealed");

          observer.unobserve(entry.target);
        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("revealed");
    });

  }


  /* =========================================================
     5. STAGGER COLLECTION CARDS
     ========================================================= */

  const collectionCards = document.querySelectorAll(".collection-card");

  collectionCards.forEach((card, index) => {

    card.style.transitionDelay = `${Math.min(index * 70, 600)}ms`;

  });


  /* =========================================================
     6. MAGNETIC BUTTON EFFECT
     ========================================================= */

  const magneticElements = document.querySelectorAll(
    ".magnetic, .btn, .cta-button, .nav-cta"
  );

  // Magnetic effect only on devices with a real pointer.
  if (window.matchMedia("(pointer: fine)").matches) {

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
          "translate(0, 0)";

      });

    });

  }


  /* =========================================================
     7. COLLECTION IMAGE HOVER PARALLAX
     ========================================================= */

  if (window.matchMedia("(pointer: fine)").matches) {

    document.querySelectorAll(".collection-card").forEach(card => {

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
          `scale(1.06) translate(${x * 7}px, ${y * 7}px)`;

      });

      card.addEventListener("mouseleave", () => {

        image.style.transform =
          "scale(1) translate(0, 0)";

      });

    });

  }


  /* =========================================================
     8. HERO PARALLAX — VERY LIGHT
     ========================================================= */

  const hero = document.querySelector(".hero");
  const heroBackground = document.querySelector(".hero-bg");

  if (
    hero &&
    heroBackground &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    let ticking = false;

    window.addEventListener("scroll", () => {

      if (ticking) return;

      window.requestAnimationFrame(() => {

        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight) {

          heroBackground.style.transform =
            `translate3d(0, ${scrollY * 0.08}px, 0) scale(1.02)`;

        }

        ticking = false;

      });

      ticking = true;

    }, { passive: true });

  }


  /* =========================================================
     9. FAQ ACCORDION
     ========================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {

      const isOpen = item.classList.contains("active");

      // Close all
      faqItems.forEach(otherItem => {

        otherItem.classList.remove("active");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

      });

      // Open selected
      if (!isOpen) {

        item.classList.add("active");

        answer.style.maxHeight =
          answer.scrollHeight + "px";

      }

    });

  });


  /* =========================================================
     10. NUMBER COUNTERS
     ========================================================= */

  const counters = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window && counters.length) {

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const counter = entry.target;

          const target =
            parseInt(counter.dataset.count, 10);

          if (isNaN(target)) return;

          const duration = 1600;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {

            const progress =
              Math.min(
                (currentTime - startTime) / duration,
                1
              );

            // Smooth ease-out
            const eased =
              1 - Math.pow(1 - progress, 3);

            counter.textContent =
              Math.floor(target * eased);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }

          };

          requestAnimationFrame(updateCounter);

          observer.unobserve(counter);

        });

      },
      {
        threshold: 0.5
      }
    );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

  }


  /* =========================================================
     11. IMAGE LAZY LOADING
     ========================================================= */

  // Collection images load only when required.
  document.querySelectorAll("img").forEach(img => {

    if (!img.hasAttribute("loading")) {

      const isHero =
        img.closest(".hero");

      if (!isHero) {
        img.setAttribute("loading", "lazy");
      }

    }

    img.setAttribute("decoding", "async");

  });


  /* =========================================================
     12. IMAGE LOAD FADE
     ========================================================= */

  document.querySelectorAll("img").forEach(img => {

    if (img.complete) {

      img.classList.add("image-loaded");

    } else {

      img.addEventListener(
        "load",
        () => {
          img.classList.add("image-loaded");
        },
        { once: true }
      );

    }

  });


  /* =========================================================
     13. ENQUIRY FORM → WHATSAPP
     ========================================================= */

  const enquiryForm =
    document.querySelector("#enquiryForm") ||
    document.querySelector(".enquiry-form");

  if (enquiryForm) {

    enquiryForm.addEventListener("submit", (e) => {

      e.preventDefault();

      const name =
        enquiryForm.querySelector('[name="name"]')?.value.trim() || "";

      const phone =
        enquiryForm.querySelector('[name="phone"]')?.value.trim() || "";

      const email =
        enquiryForm.querySelector('[name="email"]')?.value.trim() || "";

      const message =
        enquiryForm.querySelector('[name="message"]')?.value.trim() || "";

      const product =
        enquiryForm.querySelector('[name="product"]')?.value.trim() || "";

      if (!name || !phone) {

        alert("Please enter your name and phone number.");

        return;

      }

      let whatsappMessage =
        `Hello, I would like to make an enquiry.%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phone)}`;

      if (email) {
        whatsappMessage +=
          `%0AEmail: ${encodeURIComponent(email)}`;
      }

      if (product) {
        whatsappMessage +=
          `%0AProduct: ${encodeURIComponent(product)}`;
      }

      if (message) {
        whatsappMessage +=
          `%0AMessage: ${encodeURIComponent(message)}`;
      }

      const whatsappNumber = "918741917946";

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

    });

  }


  /* =========================================================
     14. FLOATING WHATSAPP / CALL BUTTON
     ========================================================= */

  const floatingButtons =
    document.querySelectorAll(
      ".floating-btn, .whatsapp-float, .call-float"
    );

  floatingButtons.forEach(button => {

    button.addEventListener("click", () => {

      button.classList.add("clicked");

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 350);

    });

  });


  /* =========================================================
     15. CURSOR GLOW — DESKTOP ONLY
     ========================================================= */

  if (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {

    const cursorGlow =
      document.querySelector(".cursor-glow");

    if (cursorGlow) {

      let mouseX = 0;
      let mouseY = 0;
      let glowX = 0;
      let glowY = 0;

      document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

      }, { passive: true });

      const animateGlow = () => {

        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        cursorGlow.style.transform =
          `translate3d(${glowX}px, ${glowY}px, 0)`;

        requestAnimationFrame(animateGlow);

      };

      animateGlow();

    }

  }


  /* =========================================================
     16. ACTIVE NAV LINK
     ========================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navAnchors =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );

  if (
    sections.length &&
    navAnchors.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navAnchors.forEach(link => {
              link.classList.remove("active");
            });

            const activeLink =
              document.querySelector(
                `.nav-links a[href="#${entry.target.id}"]`
              );

            if (activeLink) {
              activeLink.classList.add("active");
            }

          });

        },
        {
          threshold: 0.25,
          rootMargin: "-20% 0px -55% 0px"
        }
      );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }


  /* =========================================================
     17. REDUCED MOTION ACCESSIBILITY
     ========================================================= */

  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    document.documentElement.classList.add(
      "reduced-motion"
    );

  }

});
