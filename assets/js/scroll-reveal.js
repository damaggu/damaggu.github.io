// Scroll-triggered fade-in animations using IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  // Determine which .reveal containers have staggerable children
  var staggerContainers = [];
  var plainContainers = [];

  reveals.forEach(function (el) {
    var bibItems = el.querySelectorAll("ol.bibliography li");
    var iconLinks = el.querySelectorAll(".contact-icons a");

    if (bibItems.length || iconLinks.length) {
      // Container has stagger content — make container itself visible immediately
      // and hide individual children for staggered reveal
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.transition = "none";

      var items = bibItems.length ? bibItems : iconLinks;
      items.forEach(function (item) {
        item.classList.add("reveal-stagger-item");
      });

      staggerContainers.push({ el: el, items: items, delay: bibItems.length ? 100 : 80 });
    } else {
      plainContainers.push(el);
    }
  });

  // Observer for plain .reveal containers (simple fade-in)
  if (plainContainers.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    plainContainers.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Observer for stagger containers (cascade children one-by-one)
  if (staggerContainers.length) {
    var staggerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          staggerObserver.unobserve(entry.target);

          // Find the matching container data
          var container = null;
          for (var i = 0; i < staggerContainers.length; i++) {
            if (staggerContainers[i].el === entry.target) {
              container = staggerContainers[i];
              break;
            }
          }
          if (!container) return;

          // Stagger each child with incremental delays
          container.items.forEach(function (item, idx) {
            setTimeout(function () {
              item.classList.add("stagger-visible");
            }, idx * container.delay);
          });
        });
      },
      { threshold: 0.1 }
    );

    staggerContainers.forEach(function (c) {
      staggerObserver.observe(c.el);
    });
  }

  // Per-item scroll reveal for standalone bibliography items (publications page)
  var bibItems = document.querySelectorAll("ol.bibliography li");
  var standaloneItems = [];
  bibItems.forEach(function (li) {
    if (!li.closest(".reveal")) {
      standaloneItems.push(li);
    }
  });

  if (standaloneItems.length) {
    standaloneItems.forEach(function (li) {
      li.classList.add("reveal-stagger-item");
    });

    var pending = [];
    var flushTimer = null;

    function flushPending() {
      pending.forEach(function (li, i) {
        setTimeout(function () {
          li.classList.add("stagger-visible");
        }, i * 100);
      });
      pending = [];
      flushTimer = null;
    }

    var itemObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            pending.push(entry.target);
            itemObserver.unobserve(entry.target);

            if (flushTimer) clearTimeout(flushTimer);
            flushTimer = setTimeout(flushPending, 50);
          }
        });
      },
      { threshold: 0.1 }
    );

    standaloneItems.forEach(function (li) {
      itemObserver.observe(li);
    });
  }
});
