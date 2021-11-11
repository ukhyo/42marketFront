import { Route, Switch } from "react-router-dom";
import React from "react";
import Mypage from "./Mypage/Mypage";
import Mainpage from "./Mainpage/Mainpage";
import PostDetail from "./PostManage/PostDetail";
import Product from "./Product/Product";
import Category from "./Category/Category";
import ProductEdit from "./Product/ProductEdit";
function Router() {
	return (
		<div>
			<Switch>
				<Route path={"/"} exact component={Mainpage}></Route>
				<Route path={"/mypage/:tabs"} component={Mypage}></Route>
				<Route path={"/postview/:id"} exact component={PostDetail}></Route>
				<Route path={"/product/edit"} exact component={ProductEdit} />
				<Route path={"/product/:tabs"} exact component={Product}></Route>
				<Route path={"/category/:catename"} exact component={Category} />
			</Switch>
		</div>
	);
}
export default Router;
