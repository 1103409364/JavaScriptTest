export default {
    namespace : "counter" ,
    state : {
        "v" : 100
    },
    //同步
    reducers : {
        add(state,action){
            return {
                ...state , 
                "v": state.v + action.payload.number
            }
        },
        minus(state, action) {
            return {
                ...state,
                "v": state.v - 1
            }
        }
    },
    //异步
    effects : {
        *addFile(action , {call , put}){
            //写异步语句
            const {result} = yield fetch(" http://localhost:3000/api").then((data)=>data.json());
            yield put({"type":"add" , "payload" : {"number" : result}})
        }
    }
}
