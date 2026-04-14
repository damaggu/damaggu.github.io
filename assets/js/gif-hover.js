// GIF hover preview: show frozen first frame by default, play on hover
document.addEventListener("DOMContentLoaded", function () {
  var imgs = document.querySelectorAll(".publications .preview img");
  if (!imgs.length) return;

  imgs.forEach(function (img) {
    var src = img.getAttribute("src") || "";
    if (!src.toLowerCase().endsWith(".gif")) return;

    // Remove <source> siblings inside <picture> so they don't override our src swaps
    var picture = img.closest("picture");
    if (picture) {
      var sources = picture.querySelectorAll("source");
      sources.forEach(function (s) { s.remove(); });
    }

    // Resolve full URL for loading
    var fullSrc = img.src;

    // Load the GIF to capture its first frame
    var gifImg = new Image();
    gifImg.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = gifImg.naturalWidth;
      canvas.height = gifImg.naturalHeight;
      canvas.getContext("2d").drawImage(gifImg, 0, 0);

      var staticSrc;
      try {
        staticSrc = canvas.toDataURL("image/png");
      } catch (e) {
        return; // tainted canvas — keep original GIF
      }

      // Replace with static first frame
      img.src = staticSrc;

      // Hover swap on the parent <li>
      var li = img.closest("li");
      if (!li) return;

      li.addEventListener("mouseenter", function () {
        img.src = fullSrc;
      });
      li.addEventListener("mouseleave", function () {
        img.src = staticSrc;
      });
    };
    gifImg.src = fullSrc;
  });
});
