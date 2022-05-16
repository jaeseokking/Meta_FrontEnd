import './App.css';
import {BrowserRouter , Route,Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import CWList from './components/pages/list/CWList';
import UpdataProfile from './components/pages/update/UpdataProfile';
import NotFound  from './components/pages/NotFound';
import Login from './components/pages/login/Login';
import PrivateRoute from './components/utils/PrivateRoute';
import PublicRoute from './components/utils/PublicRoute';
import Layout from './components/layout/Layout'





function App(props) {
  return (
    <BrowserRouter >
        <Route render={(props) => (
            <Layout {...props}>
                <Switch>
                    <PrivateRoute path="/" exact component={Home}/>
                    <PrivateRoute exact path="/cw_list" component={CWList}/>
                    <PrivateRoute exact path="/update" component={UpdataProfile}/>
                    <PublicRoute restricted={true} path="/login" component={Login}/>
                    <PrivateRoute component={NotFound}/>
                    
                </Switch> 
            </Layout>
        )}/>
    </BrowserRouter>
  );
}
export default App;