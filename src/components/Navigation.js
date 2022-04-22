
import {  BrowserRouter,  Routes,  Route,  Link} from"react-router-dom";

function Navigation() {
    return (
        <>
        
      <Link to="/">Customers</Link>{' '}
      <Link to="/trainings">Trainings</Link>{' '}

        </>
    )
}

export default Navigation;