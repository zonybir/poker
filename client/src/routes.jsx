import Main from './containers/main'
import Index from './containers/index'
import Login from './containers/login'

import Hall from './containers/hall'
import GameHome from './containers/game_home'
const {Router,Route,IndexRoute}=ReactRouter;
export default

<Router>
    <Router path='index' component={Index}>
        <IndexRoute component={Hall} />
        <Route path='game' component={GameHome} />
    </Router>
    <Router path='login' component={Login} />
	<Route path="*" component={Main} />
</Router>