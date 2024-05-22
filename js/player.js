export default class Player
{
    constructor(game)
    {
        console.log(`${this.constructor.name} .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 200;
        this.height = 200;
        this.scale = 1;
        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_max = 4;
        this.x = 100; //this.game.width * 0.5 - this.width * 0.5;
        this.y = 100; //this.game.height * 0.5 - this.height * 0.5;

        this.timer = 0;
        this.interval = 140;

        this.image = new Image();
        this.image.src = "img/player.png";
    }

    draw()
    {
        this.game.context.drawImage(this.image, this.frame_x * this.width, this.frame_y * this.height, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
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
    }
}