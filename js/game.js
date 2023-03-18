level = 0;

isStart = false;
var modal = document.querySelector(".modal");
var btnClose = document.querySelector(".closeModal");
var iconClose = document.querySelector(".modal__header i");
var over = document.querySelector(".over");
var score2 = document.querySelector(".score");

var formModal = document.querySelector(".form-modal")

var playerName = ""
var playerSchool = ""
var playerPhone = ""

function submitForm(e) {
  e.preventDefault();
  isStart = true;
  playerName = document.querySelector("#name").value;
  playerSchool = document.querySelector("#school").value;
  playerPhone = document.querySelector("#phone").value;
  console.log(playerName, playerSchool, playerPhone)
  formModal.classList.add("hide");
}

function toggleModal(e) {
  modal.classList.toggle("hide");
}
function gameover(s1, s2) {
  over.innerText = s1;
  score2.innerText = s2;
  Util.postPlayerScore(playerName, "knife-hit", playerSchool, playerPhone, level + 1)
}
function reload(e) {
  location.reload();
}
btnClose.addEventListener("click", reload);

let game_W = 20;
let game_H = 20;
size = 0;
(XXX = 0), (YYY = 0);
score = 0;

var bg = new Image();
bg.src = "images/bg.jpg";
b = [];
var bitcoinIM = new Image();
bitcoinIM.src = "images/Sharingan-1.png";

var swordIM = new Image();
swordIM.src = "images/kunai.png";

angle = 0;
gt = 0;
delta1 = 0.3;

alive = true;


speedstart = [0, 0, -0.25, -0.04, -0.6, -1.5, -3, -0.2, -0.3, -2];
speed = [2, 2.5, 0, 0, 2, 0, 2, 0, 0, 3];
delta = [0, 0, 0.05, 0.05, 0.1, 0.04, 0.3, 0.4, 0.3, 1.2];
speedend = [0, 0, 0.05, 0.05, 0.1, 0.04, 0.3, 0.4, 0.3, 1.2];
maxvt = [6, 6, 5, 5, 7, 7, 10, 6, 10, 10];
minvt = [0, 0, 0.5, 1, -6, -9, -9, 2, -10, -10];

knife = [
  [],
  [0, 60],
  [355, 125],
  [30, 80, 230],
  [30, 180],
  [0, 180],
  [10, 50],
  [],
  [255],
  [356],
];

limKnife = [
  10, 13, 10, 8, 13, 12, 14, 15, 14, 16, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
];

class game {
  constructor() {
    this.canvas = null;
    this.context = null;
    this.init();
    score = limKnife[level];
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    for (let i = 0; i < 360; i++) b[i] = false;
      for (var i = 0; i < knife[level].length; i++) {
       b[knife[level][i]] = true;
    }
    this.render();

    this.listenKeyboard();
    this.listenMouse();
  }

  listenKeyboard() {
    document.addEventListener("keydown", (key) => {
      if (!isStart) return;
      if (key.keyCode == 32) {
        for (var i = 360 - angle - 8; i <= 360 - angle + 8; i++) {
          if (b[Math.floor(i >= 360 ? i - 360 : i < 0 ? i + 360 : i)]) {
            //addUser({
              //name: name,
              //school: school,
              //email: email,
              //score: level + 1,
            //})
            setTimeout(() => {
            gameover("You lose", "Score: " + (level + 1));

            toggleModal(this);
            }, 3);
            // window.alert("You Lose!" + "\n" + "Your max level: " + (level+1));
            // location.reload();
            speed = 0;
            alive = false;
            break;
          }
        }
        console.log("angle" + Math.floor(360 - angle));

        b[Math.floor(360 - angle)] = true;
        if ((--score < 1) & alive) {
          if (level == 9) {
            gameover("Congratulation", "You Win!!!");
            toggleModal(this);
            // window.alert("You Win!" + "\n" + "Your max level: " + (level+1));
            // location.reload();
            speed = 0;
          } else {
            window.alert("DONE level: " + (level + 1));
          }
          score = limKnife[++level];
          for (var i = 0; i < 360; i++) {
            b[i] = false;
          }
          bitcoinIM.src = "images/Sharingan-" + (level + 1) + ".png";
          for (var i = 0; i < knife[level].length; i++) {
            b[knife[level][i]] = true;
          }
        }
      }
    });
  }

  listenMouse() {
    document.addEventListener("mousedown", (evt) => {
      if (!isStart) return;
      for (var i = 360 - angle - 8; i <= 360 - angle + 8; i++) {
        if (b[Math.floor(i >= 360 ? i - 360 : i < 0 ? i + 360 : i)]) {
          gameover("You lose", "Score: " + (level + 1));
          toggleModal(this);
          // window.alert("You Lose!" + "\n" + "Your max level: " + (level+1));
          // location.reload();
          speed = 0;
          break;
        }
      }
      console.log("angle" + Math.floor(360 - angle));

      b[Math.floor(360 - angle)] = true;
      if (--score < 1) {
        if (level == 9) {
          gameover("Congratulation", "You Win!!!");
          toggleModal(this);
          // window.alert("You Win!" + "\n" + "Your max level: " + (level+1));
          // location.reload();
          speed = 0;
        }
        score = limKnife[++level];
        for (var i = 0; i < 360; i++) {
          b[i] = false;
        }
        bitcoinIM.src = "images/Sharingan-" + (level + 1) + ".png";
        for (var i = 0; i < knife[level].length; i++) {
          b[knife[level][i]] = true;
        }
      }
    });
  }

  loop() {
    this.update();
    this.draw();
    setTimeout(() => this.loop(), 15);
  }

  update() {
    this.render();
    
    if (! isStart) return;
    angle += speed[level];

    speed[level] += delta[level];
    if (speed[level] > maxvt[level]) delta[level] = speedstart[level];
    if (speed[level] < minvt[level]) delta[level] = speedend[level];

    if (
      level == 9 &&
      (speed[level] > maxvt[level] || speed[level] < minvt[level])
    ) {
      speedstart[level] = Math.random() * 2 - 3;
      speedend[level] = Math.random() * 2 + 2;
      maxvt[level] = Math.floor(Math.random() * 10 + 10);
      minvt[level] = Math.floor(Math.random() * 10 - 15);
      console.log(maxvt[level] + " " + minvt[level]);
    }
    if (
      level == 6 &&
      (speed[level] > maxvt[level] || speed[level] < minvt[level])
    ) {
      speedstart[level] = Math.random() * 1.5 - 2;
      maxvt[level] = Math.floor(Math.random() * 7 + 10);
      minvt[level] = Math.floor(Math.random() * 7 - 15);
      console.log(maxvt[level] + " " + minvt[level]);
    }
    if (
      level == 8 &&
      (speed[level] > maxvt[level] || speed[level] < minvt[level])
    ) {
      maxvt[level] = Math.random() * 5 + 6;
      minvt[level] = Math.random() * 5 - 10;
    }
    console.log(maxvt[level] + " " + minvt[level]);

    angle %= 360;
    if (angle < 0) angle += 360;
  }

  render() {
    if (
      game_W != document.documentElement.clientWidth ||
      game_H != document.documentElement.clientHeight
    ) {
      this.canvas.width = document.documentElement.clientWidth;
      this.canvas.height = document.documentElement.clientHeight;
      game_W = this.canvas.width;
      game_H = this.canvas.height;
      size = 6 * this.getWidth();
      XXX = game_W / 2;
      YYY = game_H / 3;
    }
  }

  draw() {
    this.clearScreen();
    this.drawBitcoin();
  }

  drawBitcoin() {
    for (let i = 0; i < 360; i++) {
      this.context.save();
      this.context.translate(XXX, YYY);
      this.context.rotate(this.toRadian(i + angle));
      if (b[i]) {
        this.context.drawImage(
          swordIM,
          -size / 4,
          size / 3,
          size / 2,
          size / 2
        );
      }
      this.context.restore();
    }

    this.context.drawImage(
      swordIM,
      XXX - size / 4,
      YYY + size / 1.2,
      size / 2,
      size / 2
    );

    this.context.save();
    this.context.translate(XXX, YYY);
    this.context.rotate(this.toRadian(angle));
    this.context.drawImage(
      bitcoinIM,
      (-size * 5) / 8,
      (-size * 5) / 8,
      (size * 5) / 4,
      (size * 5) / 4
    );
    this.context.restore();

    this.context.fillStyle = "#e67c20";
    this.context.font = this.getWidth() / 1.5 + "px Sans-Serif";
    this.context.drawImage(
      swordIM,
      (game_W * 1) / 30,
      (game_H * 1) / 30,
      size / 4,
      size / 4
    );
    this.context.fillText(" x " + score, (game_W * 1) / 13, (game_H * 1) / 9);
    this.context.fillText(
      "Level: " + (level + 1),
      (game_W * 7.5) / 9,
      (game_H * 1) / 9
    );
  }

  clearScreen() {
    this.context.clearRect(0, 0, game_W, game_H);
    if (bg.width / game_W < bg.height / game_H)
      this.context.drawImage(
        bg,
        0,
        (bg.height - game_H * (bg.width / game_W)) / 2,
        bg.width,
        game_H * (bg.width / game_W),
        0,
        0,
        game_W,
        game_H
      );
    else
      this.context.drawImage(
        bg,
        (bg.width - game_W * (bg.height / game_H)) / 2,
        0,
        game_W * (bg.height / game_H),
        bg.height,
        0,
        0,
        game_W,
        game_H
      );
  }

  getWidth() {
    var area =
      document.documentElement.clientWidth *
      document.documentElement.clientHeight;
    return Math.sqrt(area / 300);
  }

  toRadian(angle) {
    return (angle / 180) * Math.PI;
  }
}

var g = new game();
setTimeout(() => g.loop(), 10)

