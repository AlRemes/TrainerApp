
import {Link} from"react-router-dom";



function Navigation() {
    return (
        <>

              <Link style={{color:'black', textDecoration: 'none', marginLeft:20, border:2, borderStyle:'solid', borderRadius: 3}} to="/">Calendar</Link>
            
              <Link style={{color:'black', textDecoration: 'none', marginLeft:50, border:2, borderStyle:'solid', borderRadius: 3}} to="/trainings">Trainings</Link> 

              <Link style={{color:'black', textDecoration: 'none', marginLeft:50, border:2, borderStyle:'solid', borderRadius: 3}} to="/customers">Customers</Link>
              
              <Link style={{color:'black', textDecoration: 'none', marginLeft:50, border:2, borderStyle:'solid', borderRadius: 3}} to="/statistics">Statistics</Link>


        </>
    )
}

export default Navigation;