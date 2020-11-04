import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import Dashboard from '../components/Dashboard/Dasboard'
import Chart from '../components/Dashboard/Chart/Chart'
import UpdateTransaction from '../components/Transactions/UpdateTransaction/UpdateTransaction'
import ArenaList from '../components/Arena/ArenaList'
import ArenaForm from '../components/Arena/Form/Form'
import UserForm from '../components/Dashboard/User/Form'
import UserDashboard from '../components/User/Dashboard'

const AuthRoutes = ({ isAdmin }) => {
    return (
        <React.Fragment>
            <Navbar />
            <Switch>
                {isAdmin != null && <Route path="/dashboard" component={isAdmin === false ? UserDashboard : Dashboard} />}
                {isAdmin && <Route exact path="/chart" component={Chart} />}

                <Route exact path="/transaction/new/" component={UpdateTransaction} />
                <Route exact path="/transaction/:id/" component={(props) => <UpdateTransaction {...props} update/>} />

                <Route exact path="/arena/" component={ArenaList} />
                { isAdmin && <Route exact path="/arena/new/" component={ArenaForm}/> }

                { isAdmin && <Route exact path="/user/new" component={UserForm} /> }
                { isAdmin != null && <Redirect to="/"/> }
            </Switch>
        </React.Fragment>
    )
}

export default AuthRoutes