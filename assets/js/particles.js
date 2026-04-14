// Lightweight particle dot background for the hero section
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var container = canvas.parentElement;
    var particles = [];
    var count = 35;
    var lineDistance = 150;

    function resize() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function getColor() {
      var style = getComputedStyle(document.documentElement);
      return style.getPropertyValue("--global-theme-color").trim() || "#6c8ebf";
    }

    // Initialize particles
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.2 + 1,
      });
    }

    function draw() {
      if (document.hidden) {
        requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var color = getColor();

      // Update and draw particles
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      }

      // Draw connecting lines
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < lineDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.16 * (1 - dist / lineDistance);
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  });
})();
