import { useContext, Fragment } from "react"
import { AppContext } from "../App"
import { Profile } from './Profile';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export const Search = () => {
    /* Search component: 
       For users to enter their user name.
       When search button is clicked, user is taken to the profile page,
       using useNavigate from react router dom
    */

    const navigate = useNavigate();
    const {userInput,setUserInput} = useContext(AppContext);
    // Get ID from URL
    const params = useParams();
    
    // Function to navigate user to there profile page
    async function LogUser (){
        // debugger;
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
         {/* <Alert variant="success">
            Enter User name in URL like this: http://localhost:3000/pdf
         </Alert> */}

          {/* <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
           >
            <Button style={{ width: '3rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'5px', cursor: "pointer"}} variant="warning">info</Button>
           </OverlayTrigger> */}

         {/* Loading Profile as well */}
         <Profile user={userInput} />
        </>
    
    </div>
    );
}