import Index from './containers/index'

const {Router,Route,IndexRoute}=ReactRouter;
export default

<Router>
    <Router path='/' component={Index}/>
	<Route path="*" component={Index} />
</Router>