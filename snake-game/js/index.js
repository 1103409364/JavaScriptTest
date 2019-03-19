var gameBox = document.getElementById("gameBox");
var eatAudio = document.getElementById("eatAudio");
var dieAudio = document.getElementById("dieAudio");
var bgm = document.getElementById("bgm");
// 地图构造函数
function Map(row, col) {
    this.table = document.createElement("table");
    gameBox.appendChild(this.table);
    // 把td dom对象放进数组
    this.tdArr = [];
    // 地图的尺寸
    this.row = row;
    this.col = col;
    this.init(row, col);
    // 背景音乐
    this.bgm = bgm;
}
// 初始化地图
Map.prototype.init = function (row, col) {
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
Map.prototype.reset = function () {
    for (var i = 0; i < this.tdArr.length; i++) {
        for (var j = 0; j < this.tdArr[i].length; j++) {
            this.tdArr[i][j].className = "";
        }
    }
}
// 检查蛇头是否碰壁,是否吃到食物
Map.prototype.check = function () {
    if (snake.snakeBody[0].x > this.col - 1 || snake.snakeBody[0].x < 0 || snake.snakeBody[0].y > this.row - 1 || snake.snakeBody[0].y < 0) {
        snake.died();
        // console.log(snake.snakeBody[0].x, "蛇挂了");
    }

    if (snake.snakeBody[0].x === food.point.x && snake.snakeBody[0].y == food.point.y) {
        console.log(1);
        food.beEaten();
        snake.update();
    }
    // 蛇的长度达到极限
    if (snake.snakeBody.length === map.row * map.col - 4) {
        alert("You are awesom!!");
    }
}
// 蛇的构造函数
function Snake() {
    // 蛇的身体，第0个数组成员是蛇头，根据不同地图尺寸生成蛇的位置
    this.snakeBody = [{
            "x": map.row < 8 ? 4: parseInt(map.row / 3) + 4,
            "y": parseInt(map.row / 2),
        },
        {
            "x": map.row < 8 ? 3: parseInt(map.row / 3) + 3,
            "y": parseInt(map.row / 2),
        },
        {
            "x": map.row < 8 ? 2: parseInt(map.row / 3) + 2,
            "y": parseInt(map.row / 2),
        },
        {
            "x": map.row < 8 ? 1: parseInt(map.row / 3) + 1,
            "y": parseInt(map.row / 2),
        },
        {
            "x": map.row < 8 ? 0: parseInt(map.row / 3),
            "y": parseInt(map.row / 2),
        },
    ];
    // 蛇的生死属性
    this.alive = true;
    // 定时器时间间隔，数字越小，蛇速度越快
    this.interval = 300;
    // 渲染小蛇
    this.render();
    // 加个锁，防止按键过快蛇来不及移动，方向连续改变，蛇死亡的bug比如：向右时，快速按下向下和向左。
    this.lock = false;
    // 默认方向向右
    this.direction = "ArrowRight";
    // 绑定事件，方向键控制上下左右
    this.getDirectiion();
    this.move();
    this.eatAudio = eatAudio;
    this.dieAudio = dieAudio;
}
// 渲染蛇
Snake.prototype.render = function () {
    for (var i = 0; i < this.snakeBody.length; i++) {
        map.tdArr[this.snakeBody[i].y][this.snakeBody[i].x].className = "snake";
    }
}
// 蛇移动
Snake.prototype.move = function () {
    // 备份this
    var _this = this;
    // 蛇走之前，重置地图 
    clearInterval(this.timer);
    this.timer = setInterval(function () {
        _this.snakeBody.pop();
        switch (_this.direction) {
            case "ArrowUp":
                _this.snakeBody.unshift({
                    "y": _this.snakeBody[0].y - 1,
                    "x": _this.snakeBody[0].x
                });
                break;
            case "ArrowDown":
                _this.snakeBody.unshift({
                    "y": _this.snakeBody[0].y + 1,
                    "x": _this.snakeBody[0].x
                });
                break;
            case "ArrowLeft":
                _this.snakeBody.unshift({
                    "y": _this.snakeBody[0].y,
                    "x": _this.snakeBody[0].x - 1
                });
                break;
            case "ArrowRight":
                _this.snakeBody.unshift({
                    "y": _this.snakeBody[0].y,
                    "x": _this.snakeBody[0].x + 1
                });
                break;
        }
        // console.log(_this.direction);
        // 让地图检查蛇的状态
        map.check();
        // 检查是否咬了自己
        _this.isEatSelf();

        if (_this.alive) {
            map.reset();
            food.render();
            _this.render();
            _this.lock = false;
        }
    }, this.interval);
}
// 蛇获取方向
Snake.prototype.getDirectiion = function () {
    var _this = this;
    window.onkeydown = function (event) {
        event = event || window.event;
        switch (event.key) {
            case "ArrowUp":
                if (_this.direction === "ArrowDown" || _this.lock) return;
                _this.direction = "ArrowUp";
                _this.lock = true;
                break;
            case "ArrowDown":
                if (_this.direction === "ArrowUp" || _this.lock) return;
                _this.direction = "ArrowDown";
                _this.lock = true;
                break;
            case "ArrowLeft":
                if (_this.direction === "ArrowRight" || _this.lock) return;
                _this.direction = "ArrowLeft";
                _this.lock = true;
                break;
            case "ArrowRight":
                if (_this.direction === "ArrowLeft" || _this.lock) return;
                _this.direction = "ArrowRight";
                _this.lock = true;
                break;
        }
    }
}
// 蛇死亡方法
Snake.prototype.died = function () {
    this.alive = false;
    clearInterval(this.timer);
    this.dieAudio.load();
    this.dieAudio.play();
    map.bgm.pause();
}
// 蛇头碰到蛇身
Snake.prototype.isEatSelf = function () {
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (this.snakeBody[i].x === this.snakeBody[0].x && this.snakeBody[i].y === this.snakeBody[0].y) {
            this.died();
            return true;
        }
    }
}
// 蛇吃到食物变长，相当于再往前走一步
Snake.prototype.update = function () {
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

    this.eatAudio.load();
    this.eatAudio.play();
}

// 食物构造函数
function Food() {
    // 食物随机出现
    this.point = {
        "x": parseInt(Math.random() * map.col),
        "y": parseInt(Math.random() * map.row),
    }
    // this.x = parseInt(Math.random() * map.col);
    // this.y = parseInt(Math.random() * map.row);

    this.render();
}

Food.prototype.render = function () {
    map.tdArr[this.point.y][this.point.x].className = "food";

}

Food.prototype.beEaten = function () {
    map.tdArr[this.point.y][this.point.x].className = "";
    this.createNewPoint();
}
// 生成自己的新坐标
Food.prototype.createNewPoint = function () {
    this.point.x = parseInt(Math.random() * map.col);
    this.point.y = parseInt(Math.random() * map.row);
    // 新坐标在蛇身上时，重新生成坐标
    for (var i = 0; i < snake.snakeBody.length; i++) {
        if (snake.snakeBody[i].x === this.point.x && snake.snakeBody[i].y === this.point.y) {
            this.createNewPoint();
        }
    }
    // 新坐在地图的四个角时，重新生成坐标
    if ((this.point.x === 0 && this.point.y === 0) || (this.point.x === 0 && this.point.y === map.row - 1) || (this.point.x === map.col - 1 && this.point.y == 0) || (this.point.x === map.col - 1 && this.point.y === map.row - 1)) {
        this.createNewPoint();
    }
}
// 地图长宽至少为5*5
var map = new Map(30, 30);
var snake = new Snake();
var food = new Food();