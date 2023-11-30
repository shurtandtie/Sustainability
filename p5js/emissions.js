let images = []; // store loaded images
let icon;
let buttons = [];
let spacing = 170; // spacing between images

function preload() {
  images[0] = loadImage('images/photo1.png'); // home
  images[1] = loadImage('images/photo2.png'); // emissions
  images[2] = loadImage('images/photo3.png'); // energy
  images[3] = loadImage('images/photo4.png'); // waste
  images[4] = loadImage('images/photo5.png'); // together

  icon = loadImage('images/icon.png'); // here marker
}

function setup() {
  let canvas = createCanvas(780, 172);
  canvas.parent('timelinecontainer');
  stroke(255);

  // buttons
  for (let i = 0; i < images.length; i++) {
    let x = i * spacing;
    let y = height - 100;

    buttons[i] = createButton('');
    buttons[i].position(x + canvas.position().x, y + canvas.position().y);
    buttons[i].size(100, 100);
    buttons[i].style('background-color', 'transparent');

    buttons[i].mousePressed(() => openLink(i));
  }
}

function draw() {
  background(0);

  let anyImageHovered = false;

  for (let i = 0; i < images.length; i++) {
    let x = i * spacing;
    let y = height - 100;

    // hover
    if (
      mouseX > x &&
      mouseX < x + 170 &&
      mouseY > y &&
      mouseY < y + 100
    ) {
      // marker placement
      image(images[i], x, y, 100, 100);
      anyImageHovered = true;

      let iconX = x + (100 - icon.width * 0.3) / 2;
      let iconY = y - icon.height * 0.3 - 5;
      image(icon, 
        iconX,iconY, icon.width * 0.3, icon.height * 0.3); // scaled down by 70%
    
    } else {
      // images stay
      image(images[i], x, y, 100, 100);
    }
  }

  // default marker
  if (!anyImageHovered) {
    let defaultX = 1 * spacing;
    let defaultY = height - 100;
  
    let iconX = defaultX + (100 - icon.width * 0.3) / 2;
    let iconY = defaultY - icon.height * 0.3 - 5;
    image(icon, iconX, iconY, icon.width * 0.3, icon.height * 0.3);
  }

  // dashed lines
  for (let i = 0; i < images.length - 1; i++) {
    let centerY = height - 50; // center y-coordinate of the images
    drawDashedLine(
      i * spacing + 100,
      centerY,
      (i + 1) * spacing,
      centerY,
      5
    );
  }
}

function drawDashedLine(x1, y1, x2, y2, dashLength) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = sqrt(dx * dx + dy * dy);
  let segments = distance / dashLength;
  let deltaX = dx / segments;
  let deltaY = dy / segments;

  for (let i = 0; i < segments; i += 2) {
    let dashStartX = x1 + i * deltaX;
    let dashEndX = min(x1 + (i + 1) * deltaX, x2);
    line(dashStartX, y1, dashEndX, y2);
  }
}

function openLink(index) {
  // button to links
  const links = [
    'index.html',
    'emissions.html',
    'energy.html',
    'waste.html',
    'join.html',
  ];

  window.open(links[index], '_self');
}