import Sound from "./sound.js";

export default class Player
{
    constructor(game)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 0;
        this.height = 0;
        this.width_default = 200;
        this.height_default = 200;
        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_max = 4;
        this.x = 30;
        this.y = 0;
        this.speed_x = 0;
        this.speed_y = 0;
        this.speed_flap = 0;
        this.collision_x = 0;
        this.collision_y = 0;
        this.collision_radius = this.width * 0.5;
        this.collided = false;
        this.energy = 30;
        this.energy_min = 15;
        this.energy_max = this.energy * 2;
        this.energy_bar_size = 0;
        this.charging = false;
        this.sounds = [];

        this.image = new Image();
        this.image.src = "img/player.png";
        
        this.load();
    }

    draw()
    {
        this.game.context.drawImage(this.image, this.frame_x * this.width_default, this.frame_y * this.height_default, this.width_default, this.height_default, this.x, this.y, this.width, this.height);

        /*this.game.context.beginPath();
        this.game.context.arc(this.collision_x, this.collision_y, this.collision_radius, 0, Math.PI * 2);
        this.game.context.stroke();*/
    }

    update(delta_time)
    {
        this.energizer();
        
        if (this.speed_y >=0)
        {
            this.wingsUp();
        }
        this.collision_x = this.x + this.width * 0.5;
        this.collision_y = this.y + this.height * 0.5;
        this.y += this.speed_y;

        if (this.isTouchingBottom() === false && this.charging === false)
        {
            this.speed_y += this.game.gravity;
        }
        else
        {
            this.speed_y = 0;
        }

        if (this.isTouchingBottom() === true)
        {
            this.y = this.game.height - this.height - this.game.margin_bottom;
            this.wingsIdle();
        }
    }

    resize()
    {
        this.width = this.width_default * this.game.ratio;
        this.height = this.height_default * this.game.ratio;
        //this.x = 20; //this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speed_y = -8 * this.game.ratio;
        this.speed_flap = 5 * this.game.ratio;
        this.collision_x = this.x + this.width * 0.5;
        this.collision_radius = this.width * 0.5;
        this.collided = false;
        this.energy_bar_size = Math.ceil(5 * this.game.ratio);
        this.frame_y = 0;
        this.charging = false;
    }

    flap()
    {
        this.stopCharge();

        if (this.isTouchingTop() === false)
        {
            this.speed_y = -this.speed_flap;
            this.sounds[Math.floor(Math.random() * 5)].play();
            this.wingsDown();
        }
    }

    startCharge()
    {
        if (this.energy >= this.energy_min && this.charging === false)
        {
            this.charging = true;
            this.game.speed = this.game.speed_max;
            this.wingsCharge();
            this.sounds[5].play();
        }
        else
        {
            this.stopCharge();
        }
    }

    stopCharge()
    {
        this.charging = false;
        this.frame_y = 0;
        this.game.speed = this.game.speed_min;
    } 

    energizer()
    {
        if (this.game.update === true)
        {
            if (this.energy < this.energy_max)
            {
                this.energy += 1;
            }

            if (this.charging === true)
            {
                this.energy -= 4;

                if (this.energy <= 0)
                {
                    this.energy = 0;
                    this.stopCharge();
                }
            }
        }
    }

    wingsIdle()
    {
        if (this.charging === false)
        {
            this.frame_y = 0;
        }
    }

    wingsDown()
    {
        if (this.charging === false)
        {
            this.frame_y = 1;
        }
    }

    wingsUp()
    {
        if (this.charging === false)
        {
            this.frame_y = 2;
        }
    }

    wingsCharge()
    {
        this.frame_y = 3;
    }

    isTouchingTop()
    {
        return this.y <= 0;
    }

    isTouchingBottom()
    {
        return this.y >= this.game.height - this.height - this.game.margin_bottom;
    }

    load()
    {
        for (let index = 0; index < 5; index++)
        {
            this.sounds.push(new Sound(`aud/flap${index}.mp3`));
        }
        this.sounds.push(new Sound("aud/charge.mp3")); // 5
        this.sounds.push(new Sound("aud/lose.mp3")); // 6
        this.sounds.push(new Sound("aud/win.mp3")); // 7
    }
}