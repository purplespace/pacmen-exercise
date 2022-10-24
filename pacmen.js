let pos = 0;
const pacArray = [
  ['images/PacMan1.png', 'images/PacMan2.png'],
  ['images/PacMan3.png', 'images/PacMan4.png',],
];
let direction = 0;
let distance = 0;
let mouth = 0;
const pacMen = []; // This array holds all the pacmen
let pageWidth = window.innerWidth
let pageHeight = window.innerHeight

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Adds image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[direction][mouth];
  newimg.width = 100;

  // Sets position
  newimg.style.left = position.x;
  newimg.style.top = position.y + 50;
 

  // Adds new Child image to game
  game.appendChild(newimg); 

  let distancePerInterval = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction,
    mouth,
    distance,
    distancePerInterval
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.distance += item.distancePerInterval;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    if (item.distance >= 50) {
      item.mouth = (item.mouth + 1) % 2;
      item.distance = 0;
    }

    item.newimg.src = pacArray[item.direction][item.mouth];

  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // Detects collision with all walls and make pacman bounce
  pageWidth = window.innerWidth
  pageHeight = window.innerHeight
  if (item.position.x + 100 >= window.innerWidth && item.velocity.x > 0 || item.position.x <= 0 && item.velocity.x < 0) {
    item.velocity.x = item.velocity.x * -1;
    item.direction = (item.direction + 1) % 2
  }
  if (item.position.y + 100 >= window.innerHeight && item.velocity.y > 0 || item.position.y <= 0 && item.velocity.y < 0) {
    item.velocity.y = item.velocity.y * -1;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

