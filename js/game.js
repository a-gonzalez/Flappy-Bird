import Background from "./background.js";
import Player from "./player.js";
import Gear from "./gears.js";

export default class Game
{
    constructor(screen)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.screen = screen;
        this.context = this.screen.getContext("2d");
        this.width = this.screen.width;
        this.height = this.screen.height;
        this.score = 0;
        this.score_win = 20;
        this.game_over = false;
        this.debug = false;
        this.enemies = [];
        this.enemy_count = 25;
        this.lives = 5;
        this.gravity = 1;
        this.speed = 3;
        this.height_base = 720;
        this.ratio = this.height / this.height_base;

        this.background = new Background(this);
        this.player = new Player(this);
        this.gears = [];
        this.gear_count = 10;

        this.setGears();
        this.resize(innerWidth, innerHeight);

        addEventListener("resize", (event) =>
        {
            this.resize(event.currentTarget.innerWidth, event.currentTarget.innerHeight);
        });

        this.screen.addEventListener("mousedown", (event) =>
        {
            this.player.flap();
        });

        this.screen.addEventListener("touchstart", (event) =>
        {
            this.player.flap();
        });

        addEventListener("keydown", (evet) =>
        {
            if (event.key === " ")
            {
                this.player.flap();
            }
        });

        addEventListener("keyup", (event) =>
        {
            switch (event.key)
            {
                case "R" :
                {
                    this.start(); break;
                }
                case "D" :
                {
                    this.debug = !this.debug; break;
                }
            }
        });
    }

    render(delta_time)
    {
        this.context.clearRect(0, 0, this.width, this.height);

        this.background.update(delta_time);
        this.background.draw();
        this.player.update(delta_time);
        this.player.draw();
        
        this.gears.forEach((gear) =>
        {
            gear.update(delta_time);
            gear.draw();
        });
    }

    start()
    {
        this.score = 0;
        this.lives = 5;
        this.game_over = false;
    }

    resize(width, height)
    {
        //console.log(`Resize: W ${width} H ${height}`);

        this.screen.width = this.width = width;
        this.screen.height = this.height = height;
        this.ratio = this.height / this.height_base;
        this.gravity = 0.15 * this.ratio;
        this.speed = 3 * this.ratio;

        this.background.resize();
        this.player.resize();
        
        this.gears.forEach((gear) =>
        {
            gear.resize();
        });
    }

    setGears()
    {
        this.gears = [];

        const first_x = 100;
        const spacing = 100;

        for (let index = 0; index < this.gear_count; index++)
        {
            this.gears.push(new Gear(this, first_x + index * spacing));
        }
    }

    setGameText(context)
    {
        this.context.save();
        this.context.textAlign = "left";
        this.context.fillText(`Score  ${this.score}`, 10, 30);
        this.context.fillText("Lives", 10, 70);

        for (let index = 0; index < this.lives_max; index++)
        {
            this.context.strokeRect(90 + 15 * index, 55, 10, 15);
        }

        for (let index = 0; index < this.lives; index++)
        {
            this.context.fillRect(90 + 15 * index, 55, 10, 15);
        }

        if (this.game_over === true)
        {
            this.context.textAlign = "center";
            this.context.shadowOffsetX = 3;
            this.context.shadowOffsetY = 3;
            this.context.shadowColor = "#000000";

            this.context.fillText("Primus", this.width * 0.5, this.height * 0.5 + 40);
            this.context.fillText("Segundus", this.width * 0.5, this.height * 0.5 + 70);
            this.context.fillText("Tertius", this.width * 0.5, this.height * 0.5 + 130);

            this.context.fillStyle = "#ff0000";
            this.context.font = "60px comic sans ms";

            this.context.fillText("Game Over!", this.width * 0.5, this.height * 0.5 - 40);
        }
        this.context.restore();
    }

    isCollision(a, b)
    {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.width > b.y
        );
    }
}