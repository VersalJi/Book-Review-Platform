
import { START_LOADING, STOP_LOADING } from "../actions/loader_action";

const initialState = {
    loading: false
}

const loader_reducer = (state = initialState, action) => {
    switch(action.type){
        case START_LOADING:
            return{
                ...state,
                loading: true
            }
        case STOP_LOADING:
            return{
                ...state,
                loading:false
            }
        default:
            return state

    }
}

export default loader_reducer