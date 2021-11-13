import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
export const RefreshToken = () => {
    const isLogin = useSelector((state) => state );
    const dispatch = useDispatch();

    axios.post("/auth/refreshToken" , {
        headers: {
          "Content-Type": 'application/json',
        }})
    .then(res =>{
        console.log("res.data.accessToken : " + res.data);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data;
        if({isLogin}){
            dispatch({type: 'LOGIN_SUCCESS'});
        }

        setTimeout(function(){
            RefreshToken(null) ;
        }, (60 * 1000));
        
    })
    .catch(ex=>{
        console.log("app silent requset fail : " + ex);
        if(!{isLogin}){
            dispatch({type: 'LOGIN_FAILED'});
        }
    })
    .finally(()=>{
      console.log("refresh token request end");
    //   setLoading(true);

    });
};