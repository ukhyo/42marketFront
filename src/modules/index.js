import { combineReducers } from 'redux';
import Login from './Login';
import User from './User';
import Socket from './Socket';

const rootReducer = combineReducers({
    Login,
    User,
    Socket
});

export default rootReducer;