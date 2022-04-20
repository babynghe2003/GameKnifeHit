let game_W = 20;
let game_H = 20;
size = 0;
XXX = 0, YYY = 0;
score = 0;

var bg = new Image();
bg.src="images/bg.jpg";
b = [];
var bitcoinIM = new Image();
bitcoinIM.src="images/eye.png";

var swordIM = new Image();
swordIM.src="images/kunai.png";

angle = 0;
gt = 0;
delta = 0.02;

level = 0;

speedstart =    [0,0,-0.04,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
speed =         [1,1.5,0,1.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
delta =         [0,0,0.03,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
speedend =      [0,0,0.03,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
maxvt =         [6,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
minvt =         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

limKnife = [5,10,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

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

        for (let i = 0; i < 45; i++)
            b[i] = false;

        this.render();
        
        this.loop();

        this.listenKeyboard();
        this.listenMouse();
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            if (key.keyCode == 32) {
                for(var i = Math.floor((360 - angle-8)); i <= Math.floor((360 - angle+8)); i++)
                if (b[i]) {
                    window.alert("You Lose!" + "\n" + "Your max level: " + level+1);
                    location.reload();
                }
                b[Math.floor((360 - angle))] = true;
                if (--score<1){
                    score=limKnife[++level];
                    for(var i = 0; i<360; i++){
                        b[i] = false;
                    }
                }
            }
        })
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 7);
    }

    update() {
        this.render();
        angle +=speed[level];

        speed[level]+=delta[level];
        if(speed[level]>maxvt[level]) delta[level]=speedstart[level];
        if(speed[level]<minvt[level]) delta[level]=speedend[level];

        angle %= 360;
        
    }

    render() {
        if (game_W != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
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
                this.context.drawImage(swordIM, - size / 4, size / 3, size / 2, size / 2);
            }
            this.context.restore();
        }

        this.context.drawImage(swordIM, XXX - size / 4, YYY + size / 1.2, size / 2, size / 2);

        this.context.save();
        this.context.translate(XXX, YYY);
        this.context.rotate(this.toRadian(angle));
        this.context.drawImage(bitcoinIM, - size/2, - size/2, size, size);
        this.context.restore();

        this.context.fillStyle = "#e67c20";
        this.context.font = this.getWidth() / 1.5 + 'px Sans-Serif';
        this.context.drawImage(swordIM, this.getWidth(), this.getWidth()-70, size / 4, size / 4);
        this.context.fillText(" x " + score, this.getWidth()+70, this.getWidth());
        this.context.fillText("Level: " + (level+1), size*3, this.getWidth());
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        if (bg.width / game_W < bg.height / game_H)
            this.context.drawImage(bg, 0, (bg.height - game_H * (bg.width / game_W)) / 2, bg.width, game_H * (bg.width / game_W), 0, 0, game_W, game_H);
        else
            this.context.drawImage(bg, (bg.width - game_W * (bg.height / game_H)) / 2, 0, game_W * (bg.height / game_H), bg.height, 0, 0, game_W, game_H);
    }


    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 300);
    }

    toRadian(angle) {
        return (angle / 180) * Math.PI;
    }
}

var g = new game();