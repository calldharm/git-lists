// import Tooltip from 'react-bootstrap/Tooltip';
// import { LIST_CONSTANTS } from "./constanst"

// Function to get API headers
export const getAPIHeader = () => {
  // require('dotenv').config();
  const API_TOKEN  = process.env.API_TOKEN;
    const header = {
        method: "GET",
        // Get GIT API token from ENV
        headers: {
          Authorization: API_TOKEN 
        }
      };
    return header;
  };
  
  // TODO: Make tooltip renderer a common util function
  // Fuction to get tooltip
  // export const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     {LIST_CONSTANTS.MSG_TOOLTIP_URL}
  //   </Tooltip>
  // );