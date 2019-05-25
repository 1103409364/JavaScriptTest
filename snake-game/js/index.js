var gameBox = document.getElementById("gameBox");
var up = document.getElementById("ArrowUp");
var down = document.getElementById("ArrowDown");
var left = document.getElementById("ArrowLeft");
var right = document.getElementById("ArrowRight");
var restart = document.getElementById("restart");

var score = document.getElementById("score");

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
    this.bgm = document.getElementById("bgm");
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
        // 监听重新开始按钮
        restart.onclick = function () {
            gameBox.innerHTML = "";
            map.bgm.load();
            map.bgm.play();
            clearInterval(snake.timer);
            map = new Map(20, 20);
            snake = new Snake();
            food = new Food();
        }
    }
}
// 重置地图
Map.prototype.reset = function () {
    for (var i = 0; i < this.tdArr.length; i++) {
        for (var j = 0; j < this.tdArr[i].length; j++) {
            this.tdArr[i][j].className = "";
        }
    }
    // 刷新分数
    score.innerHTML = snake.length;
}
// 检查蛇头是否碰壁,是否吃到食物
Map.prototype.check = function () {
    if (snake.snakeBody[0].x > this.col - 1 || snake.snakeBody[0].x < 0 || snake.snakeBody[0].y > this.row - 1 || snake.snakeBody[0].y < 0) {
        snake.died();
        // console.log(snake.snakeBody[0].x, "蛇挂了");
    }

    if (snake.snakeBody[0].x === food.point.x && snake.snakeBody[0].y == food.point.y) {
        food.beEaten();
        snake.update();
        // map.tdArr[snake.snakeBody[0].x][snake.snakeBody[0].y].className = "grow snack";
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
        "x": map.row < 8 ? 1 : parseInt(map.row / 3) + 1,
        "y": parseInt(map.row / 2),
    },
    {
        "x": map.row < 8 ? 0 : parseInt(map.row / 3),
        "y": parseInt(map.row / 2),
    },
        // {
        //     "x": map.row < 8 ? 2 : parseInt(map.row / 3) + 2,
        //     "y": parseInt(map.row / 2),
        // },
        // {
        //     "x": map.row < 8 ? 1 : parseInt(map.row / 3) + 1,
        //     "y": parseInt(map.row / 2),
        // },
        // {
        //     "x": map.row < 8 ? 0 : parseInt(map.row / 3),
        //     "y": parseInt(map.row / 2),
        // },
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
    // 蛇成长的标记
    this.grow = [];
    // 蛇的长度
    this.length = this.snakeBody.length;
    // 帧编号
    this.frameNumber = 0;
    this.eatAudio = document.getElementById("eatAudio");
    this.dieAudio = document.getElementById("dieAudio");
}
// 渲染蛇
Snake.prototype.render = function () {
    for (var i = 0; i < this.snakeBody.length; i++) {
        map.tdArr[this.snakeBody[i].y][this.snakeBody[i].x].className = "snake";
    }
    if (this.grow) {
        for (var j = 0; j < this.grow.length; j++) {
            if (this.grow[j] !== undefined) {
                if (this.grow[j] < this.snakeBody.length) {
                    map.tdArr[this.snakeBody[this.grow[j]].y][this.snakeBody[this.grow[j]].x].className = "snake grow";
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
Snake.prototype.move = function () {
    // 备份this
    var _this = this;
    // 设表先关
    clearInterval(this.timer);
    this.timer = setInterval(function () {
        _this.frameNumber++;
        // 保存尾巴
        _this.tail = _this.snakeBody.pop();
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
            // 蛇走之前，重置地图 
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
    // 检测是否是移动设备，给虚拟按钮添加事件
    if (isMobile()) {
        up.addEventListener("touchstart", eventHandler);
        down.addEventListener("touchstart", eventHandler);
        left.addEventListener("touchstart", eventHandler);
        right.addEventListener("touchstart", eventHandler);
    } else {
        up.onclick = eventHandler;
        down.onclick = eventHandler;
        left.onclick = eventHandler;
        right.onclick = eventHandler;
    }
    // up.onclick = eventHandler;
    // down.onclick = eventHandler;
    // left.onclick = eventHandler;
    // right.onclick = eventHandler;

    function eventHandler(event) {
        event = event || window.event;
        var target = event.target;
        switch (event.key || target.id) {
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
    // 吃到食物，把保存的旧尾巴加到蛇身体的最后
    this.snakeBody.push(this.tail);
    this.head = map.tdArr[this.snakeBody[0].x][this.snakeBody[0].y];

    this.eatAudio.load();
    this.eatAudio.play();
    this.grow.push([0]);
    this.length++;
}

// 食物构造函数
function Food() {
    // 食物随机出现,先随便给个初始位置，防止报错
    this.point = {
        "x": map.col,
        "y": map.row,
    }
    // 生成食物位置
    this.createNewPoint()
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
}

// 通过ua检测设备类型
function isMobile() {
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

// 地图长宽至少为4*4
var map = new Map(20, 20);
var snake = new Snake();
var food = new Food();