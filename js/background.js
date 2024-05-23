export default class Background
{
    constructor(game)
    {
        this.game = game;
        this.width_default = 2400;
        this.height_default = this.game.height_base;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;

        this.image = new Image();
        this.image.src = "img/background.png";

        //this.image1 = new Image();
        //this.image1.src = "img/background_mono.png";
    }

    draw()
    {
        this.game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.game.context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

    update()
    {
        this.x -= this.game.speed;
        
        if (this.x <= -this.width)
        {
            this.x = 0;
        }
    }

    resize()
    {
        this.width = this.width_default * this.game.ratio;
        this.height = this.height_default * this.game.ratio;
        this.x = 0;
    }
}

class Layer
{
    constructor()
    {

    }
}