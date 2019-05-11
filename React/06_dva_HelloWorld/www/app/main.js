//引入dva
import dva from "dva";
//引入路由
import router from "./router";
//引入需要的model文件
import counterModel from "./models/counterModel";
import todoModel from "./models/todoModel";
//创建app
const app = dva();
//使用model
app.model(counterModel);
 

//使用路由
app.router(router);
//挂载点
app.start("#app");