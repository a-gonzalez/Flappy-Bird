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
        this.gravity = 0;
        this.speed = 0;
        this.speed_max = 0;
        this.speed_min = 0;
        this.time = 0;
        this.timer = 0;
        this.interval = 150;
        this.update = false;
        this.height_base = 720;
        this.ratio = this.height / this.height_base;
        this.messages = [];

        this.background = new Background(this);
        this.player = new Player(this);
        this.gears = [];
        this.gear_count = 5;

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

            if (event.key === "c")
            {
                this.player.startCharge();
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
        this.clear();

        if (this.game_over === false)
        {
            this.time += delta_time;
        }
        this.handleTimer(delta_time);

        this.background.update(delta_time);
        this.background.draw();

        this.setGameText();

        this.player.update(delta_time);
        this.player.draw();
        
        this.gears.forEach((gear) =>
        {
            gear.update(delta_time);
            gear.draw();
        });
    }

    clear()
    {
        this.context.clearRect(0, 0, this.width, this.height);
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
        this.speed = 2 * this.ratio;
        this.speed_min = this.speed;
        this.speed_max = this.speed * 5;

        this.context.font = "25px comic sans ms";
        this.context.fillStyle = "#0000ff"; //"#b87333";
        //this.context.strokeStyle = "#0000ff"; 
        this.context.textAlign = "left";

        this.background.resize();
        this.player.resize();
        
        this.gears.forEach((gear) =>
        {
            gear.resize();
        });

        this.score = 0;
        this.game_over = false;
        this.time = 0;
    }

    setGears()
    {
        this.gears = [];

        const first_x = this.height_base * this.ratio;
        const spacing = 600 * this.ratio;

        for (let index = 0; index < this.gear_count; index++)
        {
            this.gears.push(new Gear(this, first_x + index * spacing));
        }
    }

    handleTimer(delta_time)
    {
        if (this.timer > this.interval)
        {
            this.timer += delta_time;
        }
        else
        {
            //this.timer = 0;
            this.timer = this.timer % this.interval;
            this.update = true;
        }
    }

    getTime()
    {
        return (this.time * 0.001).toFixed(2);
    }

    setGameText(context)
    {
        this.context.save();
        this.context.fillText(`Score  ${this.score}`, 10, 40);
        this.context.fillText(`Timer: ${this.getTime()}`, 10, 70);
        //this.context.fillText("Lives", 10, 70);

        if (this.game_over === true)
        {
            if (this.player.collided === true)
            {
                this.messages.push("Getting Rusty?!");
                this.messages.push(`Collision time was ${this.getTime()} seconds.`);
            }
            else if (this.gears.length <= 0)
            {
                this.messages.push("Nailed It!");
                this.messages.push(`Can you beat ${this.getTime()} seconds?`);
            }
            this.messages.push("Press R to try again!");

            this.context.textAlign = "center";
            this.context.fillText(this.messages[0], this.width * 0.5, this.height * 0.5 + 40);
            this.context.fillText(this.messages[1], this.width * 0.5, this.height * 0.5 + 70);
            this.context.fillText(this.messages[2], this.width * 0.5, this.height * 0.5 + 130);

            this.context.fillStyle = "#ff0000";
            this.context.font = "60px comic sans ms";
            this.context.shadowOffsetX = 3; 
            this.context.shadowOffsetY = 3;
            this.context.shadowColor = "#000000"; //"#70b596";

            this.context.fillText("Game Over!", this.width * 0.5, this.height * 0.5 - 40);
        }
        if (this.player.energy <= 20)
        {
            this.context.fillStyle = "#ff0000";
        }
        else if (this.player.energy >= this.player.energy_max)
        {
            this.context.fillStyle = "#ff7f00";
        }

        for (let index = 0; index < this.player.energy; index++)
        {
            this.context.fillRect(10, this.height - 10 - this.player.energy_bar_size * index, this.player.energy_bar_size * 5, this.player.energy_bar_size);
        }
        this.context.restore();
    }

    /*isCollision(a, b)
    {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.width > b.y
        );
    }*/
    isCollision(gear, player)
    {
        const dx = gear.collision_x - player.collision_x;
        const dy = gear.collision_y - player.collision_y;
        //const distance = Math.sqrt(dx * dx + dy * dy);
        const distance = Math.hypot(dx, dy);
        const radii = gear.collision_radius + player.collision_radius;

        return distance <= radii; 
    }
}