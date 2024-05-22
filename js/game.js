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

        //this.setEnemyPool();
        //this.start();

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

    draw()
    {
        /*this.enemies.forEach((enemy) =>
        {
            enemy.draw();
        });

        this.setGameText();*/
    }

    update(delta_time)
    {
        /*this.enemies.forEach((enemy) =>
        {
            enemy.update(delta_time);
        });*/
    }

    start()
    {
        this.score = 0;
        this.lives = 5;
        this.game_over = false;
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