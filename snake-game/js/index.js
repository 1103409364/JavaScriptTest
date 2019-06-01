class Game {
    constructor() {
        this.init();
        this.bindEvent();
    }

    init() {
        this.upBtn = document.getElementById("ArrowUp");
        this.downBtn = document.getElementById("ArrowDown");
        this.leftBtn = document.getElementById("ArrowLeft");
        this.rightBtn = document.getElementById("ArrowRight");
        this.restart = document.getElementById("restart");
        this.start = document.getElementById("start");
        this.pause = document.getElementById("pause");
        this.score = document.getElementById("score");
    }

    bindEvent() {
        const eventHandler = event => {
            event = event || window.event;
            var target = event.target;
            switch (event.key || target.id) {
                case "ArrowUp":
                    if (snake.direction === "ArrowDown" || snake.lock)
                        return;
                    snake.direction = "ArrowUp";
                    snake.lock = true;
                    break;
                case "ArrowDown":
                    if (snake.direction === "ArrowUp" || snake.lock)
                        return;
                    snake.direction = "ArrowDown";
                    snake.lock = true;
                    break;
                case "ArrowLeft":
                    if (snake.direction === "ArrowRight" || snake.lock)
                        return;
                    snake.direction = "ArrowLeft";
                    snake.lock = true;
                    break;
                case "ArrowRight":
                    if (snake.direction === "ArrowLeft" || snake.lock)
                        return;
                    snake.direction = "ArrowRight";
                    snake.lock = true;
                    break;
            }
        }

        // 通过ua检测设备类型
        const isMobile = () => {
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
            ) return true;
            return false;
        }
        // 监听开始按钮
        this.pause.addEventListener("click", () => clearInterval(snake.timer));
        // 监听暂停按钮
        this.start.addEventListener("click", () => snake.move());
        // 监听重新开始按钮
        this.restart.addEventListener("click", () => {
            map.gameBox.innerHTML = "";
            map.bgm.load();
            map.bgm.play();
            clearInterval(snake.timer);
            map = new Map(20, 20);
            snake = new Snake();
            snake.move();
            food = new Food();
        })

        // 键盘方向键添加监听
        window.onkeydown = eventHandler;

        // 检测是否是移动设备，给虚拟按钮添加事件
        if (isMobile()) {
            this.upBtn.addEventListener("touchstart", eventHandler);
            this.downBtn.addEventListener("touchstart", eventHandler);
            this.leftBtn.addEventListener("touchstart", eventHandler);
            this.rightBtn.addEventListener("touchstart", eventHandler);
        } else {
            this.upBtn.addEventListener("click", eventHandler);
            this.downBtn.addEventListener("click", eventHandler);
            this.leftBtn.addEventListener("click", eventHandler);
            this.rightBtn.addEventListener("click", eventHandler);
        }
    }
}

// 地图类
class Map {
    constructor(row, col) {
        // 获得地图容器
        this.gameBox = document.getElementById("gameBox");
        // 创建一个 table
        this.table = document.createElement("table");
        this.gameBox.appendChild(this.table);
        // tdArr用来存放 td 对象
        this.tdArr = [];
        // 行列分别占用多少个格子
        this.row = row;
        this.col = col;
        // 初始化
        this.init(row, col);
        // 获得 bgm
        this.bgm = document.getElementById("bgm");
    }

    // 初始化地图
    init(row, col) {
        row = row <= 4 ? 4 : row;
        col = col <= 4 ? 4 : col;

        for (var i = 0; i < row; i++) {
            var tdRow = [];
            var tr = document.createElement("tr");
            for (var j = 0; j < col; j++) {
                var td = document.createElement("td");
                tdRow.push(td);
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
            this.tdArr.push(tdRow);
        }
    }

    // 重置地图
    reset() {
        // for (var i = 0; i < this.tdArr.length; i++) {
        //     for (var j = 0; j < this.tdArr[i].length; j++) {
        //         this.tdArr[i][j].className = "";
        //     }
        // }
        this.tdArr.forEach((row) => {
            row.forEach((td) => {
                td.className = "";
            })
        })
        // 刷新分数
        game.score.innerHTML = snake.length;
    }

    check() {
        // 检查蛇头是否碰壁
        if (snake.snakeBody[0].x > this.col - 1 || snake.snakeBody[0].x < 0 || snake.snakeBody[0].y > this.row - 1 || snake.snakeBody[0].y < 0) {
            snake.died();
        }
        // 检查是否吃到食物
        if (snake.snakeBody[0].x === food.point.x && snake.snakeBody[0].y == food.point.y) {
            food.beEaten();
            snake.update();
        }
        // 蛇的长度达到极限
        if (snake.snakeBody.length === map.row * map.col - 4) {
            alert("You are awesome!!");
        }
    }
}

// 蛇的构造函数
class Snake {
    constructor() {
        this.init();
        // 渲染snake
        this.render();
        // this.move();
    }

    // 初始化
    init() {
        // 根据 map 的尺寸计算 snake 的位置
        this.snakeBody = [{
            "x": map.row < 8 ? 1 : parseInt(map.row / 3) + 1,
            "y": parseInt(map.row / 2),
        },
        {
            "x": map.row < 8 ? 0 : parseInt(map.row / 3),
            "y": parseInt(map.row / 2),
        },];

        // 蛇的生死属性
        this.alive = true;
        // 定时器时间间隔，数字越小，蛇速度越快
        this.interval = 300;
        // 加个锁，防止按键过快蛇来不及移动，方向连续改变，蛇死亡的bug比如：向右时，快速按下向下和向左。
        this.lock = false;
        // 默认方向向右
        this.direction = "ArrowRight";
        // 蛇成长的标记,吃到食物，标记从头移到尾
        this.grow = [];
        // 蛇的长度
        this.length = this.snakeBody.length;
        // 帧编号
        this.frameNumber = 0;
        this.eatAudio = document.getElementById("eatAudio");
        this.dieAudio = document.getElementById("dieAudio");
    }

    // 渲染蛇
    render() {
        // for (var i = 0; i < this.snakeBody.length; i++) {
        //     map.tdArr[this.snakeBody[i].y][this.snakeBody[i].x].className = "snake";
        // }

        this.snakeBody.forEach((sbody) => {
            map.tdArr[sbody.y][sbody.x].className = "snake";
        })

        if (this.grow) {
            for (var j = 0; j < this.grow.length; j++) {
                if (this.grow[j] !== undefined) {
                    if (this.grow[j] < this.snakeBody.length) {
                        map.tdArr[this.snakeBody[this.grow[j]].y][this.snakeBody[this.grow[j]].x].classList.add("grow");
                        this.grow[j]++;
                    } else {
                        // 成长标记从蛇头移到蛇尾，最后移除
                        this.grow.splice(j, 1);
                    }
                }
            }
        }
    }

    // 蛇移动
    move() {
        // 设表先关
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.frameNumber++;
            // 保存尾巴
            this.tail = this.snakeBody.pop();
            switch (this.direction) {
                case "ArrowUp":
                    this.snakeBody.unshift({
                        "y": this.snakeBody[0].y - 1,
                        "x": this.snakeBody[0].x
                    });
                    break;
                case "ArrowDown":
                    this.snakeBody.unshift({
                        "y": this.snakeBody[0].y + 1,
                        "x": this.snakeBody[0].x
                    });
                    break;
                case "ArrowLeft":
                    this.snakeBody.unshift({
                        "y": this.snakeBody[0].y,
                        "x": this.snakeBody[0].x - 1
                    });
                    break;
                case "ArrowRight":
                    this.snakeBody.unshift({
                        "y": this.snakeBody[0].y,
                        "x": this.snakeBody[0].x + 1
                    });
                    break;
            }

            // 让地图检查蛇的状态
            map.check();
            // 检查是否咬了自己
            this.isEatSelf();
            if (this.alive) {
                // 蛇走之前，重置地图 
                map.reset();
                food.render();
                this.render();
                this.lock = false;
            }
        }, this.interval);
    }

    // 蛇死亡方法
    died() {
        this.alive = false;
        clearInterval(this.timer);
        this.dieAudio.load();
        this.dieAudio.play();
        map.bgm.pause();
    }

    // 蛇头碰到蛇身
    isEatSelf() {
        for (var i = 1; i < this.snakeBody.length; i++) {
            if (this.snakeBody[i].x === this.snakeBody[0].x && this.snakeBody[i].y === this.snakeBody[0].y) {
                this.died();
                return true;
            }
        }
    }

    // 蛇吃到食物变长
    update() {
        // 吃到食物，把保存的旧尾巴加到蛇身体的最后
        this.snakeBody.push(this.tail);
        this.head = map.tdArr[this.snakeBody[0].x][this.snakeBody[0].y];
        this.eatAudio.load();
        this.eatAudio.play();
        this.grow.push([0]);
        this.length++;
    }
}

// 食物构造函数
class Food {
    constructor() {
        // 食物随机出现,先随便给个初始位置，防止报错
        this.point = {
            "x": map.col,
            "y": map.row,
        };
        // 生成食物位置
        this.createNewPoint();
        this.render();
    }

    render() {
        map.tdArr[this.point.y][this.point.x].className = "food";
    }

    beEaten() {
        map.tdArr[this.point.y][this.point.x].className = "";
        this.createNewPoint();
    }

    // 生成自己的新坐标
    createNewPoint() {
        this.point.x = parseInt(Math.random() * map.col);
        this.point.y = parseInt(Math.random() * map.row);
        // 新坐标在蛇身上时，重新生成坐标
        for (var i = 0; i < snake.snakeBody.length; i++) {
            if (snake.snakeBody[i].x === this.point.x && snake.snakeBody[i].y === this.point.y) {
                this.createNewPoint();
            }
        }
    }
}

let map = new Map(20, 20);
let snake = new Snake();
let food = new Food();
let game = new Game();