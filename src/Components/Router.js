import { Route, Switch } from "react-router-dom";
import React from "react";

import Mypage from "./Mypage/Mypage";
import Mainpage from "./Mainpage/Mainpage";
import PostDetail from "./PostDetail/PostDetail";
import Product from "./Product/ProductRegi";
import ProductManage from "./Product/ProductManage";
function Router() {
	return (
		<div>
			<Switch>
				<Route path={"/"} exact component={Mainpage}></Route>
				<Route path={"/mypage"} component={Mypage}></Route>
				<Route path={"/postview/:id"} exact component={PostDetail}></Route>
				<Route path={"/product/:tabs"} exact component={Product}></Route>
				{/*<Route path={"/product/manage"} component={ProductManage}></Route>*/}
				{/*<Route path={"/product/manage"} exact component={ProductManage}></Route>*/}
				{/*<Route path={"/product/history"} exact component={ProductHistory}></Route>*/}
			</Switch>
		</div>
	);
}


export default Router;
