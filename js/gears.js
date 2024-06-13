export default class Gear
{
    constructor(game, x)
    {
        this.game = game;
        this.width_default = 120;
        this.height_default = 120;
        this.width = this.width_default * this.game.ratio;
        this.height = this.height_default * this.game.ratio;
        this.x = x;
        this.y = Math.random() * (this.game.height - this.height);
        this.frame_x = Math.floor(Math.random() * 4);
        this.frame_y = 0
        this.speed_y = Math.random() < 0.5 ? -1 * this.game.ratio : 1 * this.game.ratio;
        this.remove = false;
        this.collision_x = 0;
        this.collision_y = 0;
        this.collision_radius = this.width * 0.5;

        this.image = new Image();
        this.image.src = "img/gears.png";
    }

    draw()
    {
        this.game.context.drawImage(this.image, this.frame_x * this.width_default, this.frame_y * this.height_default, this.width_default, this.height_default, this.x, this.y, this.width, this.height);

        //this.game.context.strokeRect(this.x, this.y, this.width, this.height);
        /*this.game.context.beginPath();
        this.game.context.arc(this.collision_x, this.collision_y, this.collision_radius, 0, Math.PI * 2);
        this.game.context.stroke();*/
    }

    update(delta_time)
    {
        this.x -= this.game.speed;
        this.y += this.speed_y;
        this.collision_x = this.x + this.width * 0.5;
        this.collision_y = this.y + this.height * 0.5;

        if (this.game.game_over === false)
        {
            if (this.y <= 0 || this.y >= this.game.height - this.height)
            {
                this.speed_y *= -1;
            }
        }
        else
        {
            this.speed_y += 0.1;
        }

        if (this.isOffScreen() === true && this.game.game_over === false)
        {
            this.remove = true;

            this.game.gears = this.game.gears.filter((gear) =>
            {
                return gear.remove === false;
            });

            ++this.game.score;

            if (this.game.gears.length <= 0)
            {
                this.game.setGameOver();
            }
        }

        if (this.game.isCollision(this, this.game.player))
        {
            this.game.player.collided = true;
            this.game.player.stopCharge();

            //this.game.player.sounds[6].play();
            this.game.setGameOver();
        }
    }

    resize()
    {
        this.width = this.width_default * this.game.ratio;
        this.height = this.height_default * this.game.ratio;
        
        this.collision_x = this.x + this.width * 0.5;
        this.collision_y = this.y + this.height * 0.5;
        this.collision_radius = this.width * 0.5;
    }

    isOffScreen()
    {
        return this.x < -this.width || this.y > this.game.height;
    }
}