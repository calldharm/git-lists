import { useContext } from "react"
import { AppContext } from "../App"
import { Profile } from './Profile';
import "../App.css";
// import { useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";

export const Search = (props) => {
    /* Search component: 
       For users to enter their user name.
       When search button is clicked, user is taken to the profile page,
       using useNavigate from react router dom
    */

    const {userInput,setUserInput} = useContext(AppContext);
    
    // Function to navigate user to there profile page
    async function LogUser (){
        // Get ID from URL
        // const params = useParams();
        // navigate('/Profile');
        // navigate(`/${userInput}`);
    };
    
    return (
    <div className="Search w-100 min-vh-50 justify-content-center align-items-center d-flex flex-column">
       {/* TODO: Hiding search fields, since there is some issue, will work later */}
       <form onSubmit={LogUser} hidden>

        <br></br> 

        {/* Testbox to enter user name */}
        <input 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="text" 
            placeholder="Enter User Name..."
        />
         
        <br></br>
         
        <input type="submit" value="Search"/>

      </form>
    
       <>
         {/* Loading Profile as well */}
         <Profile user={userInput} />
        </>
    
    </div>
    );
}