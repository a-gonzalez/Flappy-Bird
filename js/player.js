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
        this.x = 0;
        this.y = 0;
        this.speed_x = 0;
        this.speed_y = 0;

        this.timer = 0;
        this.interval = 140;

        this.image = new Image();
        this.image.src = "img/player.png";
    }

    draw()
    {
        this.game.context.drawImage(this.image, this.frame_x * this.width_default, this.frame_y * this.height_default, this.width_default, this.height_default, this.x, this.y, this.width, this.height);
    }

    update(delta_time)
    {
        if (this.timer < this.interval)
        {
            this.timer += delta_time;
        }
        else
        {
            this.timer = 0;

            ++this.frame_y;

            if (this.frame_y >= this.frame_max)
            {
                this.frame_y = 0;
            }
        }
        this.y += this.speed_y;

        if (this.isTouchingBottom() === false)
        {
            this.speed_y += this.game.gravity;
        }

        if (this.isTouchingBottom() === true)
        {
            this.y = this.game.height - this.height;
        }
    }

    resize()
    {
        this.width = this.width_default * this.game.ratio;
        this.height = this.height_default * this.game.ratio;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height * 0.5 - this.height * 0.5;
        this.speed_y = -4 * this.game.ratio;
    }

    isTouchingBottom()
    {
        return this.y >= this.game.height - this.height;
    }
}