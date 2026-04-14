// Subtle 3D tilt effect on project cards based on mouse position
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll(".projects .card");
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        card.style.transition = "box-shadow 0.2s ease";
      });

      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -3;
        var rotateY = ((x - centerX) / centerX) * 3;
        card.style.transform =
          "perspective(800px) rotateX(" +
          rotateX +
          "deg) rotateY(" +
          rotateY +
          "deg) translateY(-3px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transition = "transform 0.3s ease, box-shadow 0.2s ease";
        card.style.transform = "";
      });
    });
  });
})();
