import Main from './containers/main'
import Index from './containers/index'
import Login from './containers/login'
const {Router,Route,IndexRoute}=ReactRouter;
export default

<Router>
    <Router path='index' component={Index}/>
    <Router path='login' component={Login} />
	<Route path="*" component={Main} />
</Router>