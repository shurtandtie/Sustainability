let timelineSketch = function (p) {
  let images = [];
  let icon;
  let spacing = 170;

  p.preload = function () {
      images[0] = p.loadImage('images/photo1.png'); // home
      images[1] = p.loadImage('images/photo2.png'); // emissions
      images[2] = p.loadImage('images/photo3.png'); // energy
      images[3] = p.loadImage('images/photo4.png'); // waste
      images[4] = p.loadImage('images/photo5.png'); // together
      icon = p.loadImage('images/icon.png'); // here marker
  };

  p.setup = function () {
      let canvas = p.createCanvas(780, 172);
      canvas.parent('timelinecontainer');
      p.stroke(255);
  };

  p.draw = function () {
      p.background(0);

      let anyImageHovered = false;

      for (let i = 0; i < images.length; i++) {
          let x = i * spacing;
          let y = p.height - 100;

          if (
              p.mouseX > x &&
              p.mouseX < x + 170 &&
              p.mouseY > y &&
              p.mouseY < y + 100
          ) {
              p.image(images[i], x, y, 100, 100);
              anyImageHovered = true;

              let iconX = x + (100 - icon.width * 0.3) / 2;
              let iconY = y - icon.height * 0.3 - 5;
              p.image(icon, iconX, iconY, icon.width * 0.3, icon.height * 0.3);
          } else {
              p.image(images[i], x, y, 100, 100);
          }
      }

      if (!anyImageHovered) {
          let defaultX = 3 * spacing;
          let defaultY = p.height - 100;

          let iconX = defaultX + (100 - icon.width * 0.3) / 2;
          let iconY = defaultY - icon.height * 0.3 - 5;
          p.image(icon, iconX, iconY, icon.width * 0.3, icon.height * 0.3);
      }

      for (let i = 0; i < images.length - 1; i++) {
          let centerY = p.height - 50;
          drawDashedLine(
              i * spacing + 100,
              centerY,
              (i + 1) * spacing,
              centerY,
              5
          );
      }
  };

  function drawDashedLine(x1, y1, x2, y2, dashLength) {
      let dx = x2 - x1;
      let dy = y2 - y1;
      let distance = p.sqrt(dx * dx + dy * dy);
      let segments = distance / dashLength;
      let deltaX = dx / segments;
      let deltaY = dy / segments;

      for (let i = 0; i < segments; i += 2) {
          let dashStartX = x1 + i * deltaX;
          let dashEndX = p.min(x1 + (i + 1) * deltaX, x2);
          p.line(dashStartX, y1, dashEndX, y2);
      }
  }
};

new p5(timelineSketch);