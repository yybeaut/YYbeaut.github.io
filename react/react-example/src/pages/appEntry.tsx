import { routes } from '../config';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import React, { Suspense } from 'react';
const DQCC = React.lazy(() =>
  import(/* webpackChunkName: "DQC" */ '../pages/dqc'),
);
console.log(routes, '/router')

export const AppEntry: React.FC = () => {
	return (
		<Suspense fallback={<div></div>}>
			<Router>
				<Switch>
					{routes.map((route: any, i: number) => {
						// console.log(route, 'route')
						const { path, component } = route;
						console.log(path,component, 'route')

						return <Route key={i} path={path} component={component} />;
					})}
				</Switch>
			</Router>
		</Suspense>
	)
}