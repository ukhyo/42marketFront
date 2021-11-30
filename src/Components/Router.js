import { Route, Switch } from "react-router-dom";
import React from "react";
import Mypage from "./Mypage/Mypage";
import Mainpage from "./Mainpage/Mainpage";
import PostDetail from "./PostManage/PostDetail";
import Product from "./Product/Product";
import Category from "./Category/Category";
import ProductEdit from "./Product/ProductEdit";
import Search from "./Search/Search";
import { useMediaQuery } from "react-responsive";
import { exact } from "prop-types";
import ABC from "../qqqq";
import M_Mainpage from "../M_Components/M_Mainpage/M_Mainpage";
import M_Product from "../M_Components/M_Product/M_Product";
import M_Category from "../M_Components/M_Category/M_Category";
import M_Search from "../M_Components/M_Search/M_Search";
function Router() {
	const mobileWidth = useMediaQuery(
		{maxWidth: 510}
	)
	return (
    <div>
			{mobileWidth ?
				<Switch>
					<Route path={"/"} exact component={M_Mainpage}></Route>
					<Route path={"/product/:tabs"} exact component={M_Product}></Route>
					<Route path={"/category/:id"} exact component={M_Category} />
					{/*<Route path={"/product/edit"} exact component={ProductEdit} />*/}
					{/*<Route path={"/mypage/:id/:url"} component={Mypage}></Route>*/}
					{/*<Route path={"/postview/:id"} exact component={PostDetail}></Route>*/}
					<Route path={"/search/:id/:word"}  exact component={M_Search} />
				</Switch>
					: <Switch>

						<Route path={"/"} exact component={Mainpage}></Route>
						<Route path={"/mypage/:id/:url"} component={Mypage}></Route>
						<Route path={"/postview/:id"} exact component={PostDetail}></Route>
						<Route path={"/product/edit"} exact component={ProductEdit} />
						<Route path={"/product/:tabs"} exact component={Product}></Route>
						<Route path={"/category/:id"} exact component={Category} />
						<Route path={"/search/:id/:word"}  exact component={Search} />
					</Switch>
		}
    </div>
  );
}
export default Router;
