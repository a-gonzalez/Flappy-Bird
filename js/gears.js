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
        this.y = this.game.height * 0.5 - this.height_default;
        this.frame_x = Math.floor(Math.random() * 4);
        this.frame_y = 0;

        this.image = new Image();
        this.image.src = "img/gears.png";
    }

    draw()
    {
        this.game.context.drawImage(this.image, this.frame_x * this.width_default, this.frame_y * this.height_default, this.width_default, this.height_default, this.x, this.y, this.width, this.height);
    }

    update(delta_time)
    {
        this.x -= this.game.speed;
    }

    resize()
    {
        this.width = this.width_default * this.game.ratio;
        this.height = this.height_default * this.game.ratio;
    }
}