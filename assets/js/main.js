const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = nav ? [...nav.querySelectorAll("a")] : [];

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = [...document.querySelectorAll("main section[id]")];

if (sections.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const href = link.getAttribute("href") || "";
          const isMatch = href === `#${currentId}` || href.endsWith(`#${currentId}`);
          link.classList.toggle("is-active", isMatch);
        });
      });
    },
    { threshold: 0.55 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const rotatingLine = document.querySelector(".rotating-line");

if (rotatingLine) {
  const words = (rotatingLine.dataset.words || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  if (words.length > 1) {
    let index = 0;

    window.setInterval(() => {
      rotatingLine.classList.add("is-changing");

      window.setTimeout(() => {
        index = (index + 1) % words.length;
        rotatingLine.textContent = words[index];
        rotatingLine.classList.remove("is-changing");
      }, 220);
    }, 2400);
  }
}

const newsCards = [...document.querySelectorAll(".news-card")];

newsCards.forEach((card) => {
  const toggle = card.querySelector(".news-toggle");
  const body = card.querySelector(".news-body");

  if (!toggle || !body) {
    return;
  }

  toggle.addEventListener("click", () => {
    const shouldOpen = body.hasAttribute("hidden");

    newsCards.forEach((item) => {
      const itemBody = item.querySelector(".news-body");
      item.classList.remove("is-open");
      itemBody?.setAttribute("hidden", "");
    });

    if (shouldOpen) {
      card.classList.add("is-open");
      body.removeAttribute("hidden");
    }
  });
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const message = name
      ? `Děkujeme, ${name}. Ozveme se co nejdříve.`
      : "Děkujeme. Ozveme se co nejdříve.";

    formStatus.textContent = message;
    formStatus.classList.add("is-success");
    contactForm.reset();
  });
}
