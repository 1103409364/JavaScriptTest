import { combineReducers } from "redux";
// 引入子reducer
import counter from "./counter";


const rootReducer = combineReducers({
	// counter返回的state，最后被整合到总state：{ val：{子state} }
	// key可以自定义，也可以省略用reducer名当做key
	"val": counter
})

export default rootReducer;