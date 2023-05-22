import { useEffect, useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import React from 'react';
import { useContext } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import { getAPIHeader } from "../utility/utils"
import { LIST_CONSTANTS } from "../utility/constanst"
import Loading from "./Loading";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popup from "./Popup";


export const Profile = (props) => {
    // User Profile  : Using Bootstrap elements for main profile page

   const [avatarURL, setAvatarURL] = useState();
   const [githubUsername, setGitHubUsername] = useState();
   const [githubUserURL, setgithubUserURL] = useState();
   const [repoData, setRepoData] = useState();
   /* 
     Page counter state to maintainand count the paginated data
     Since Github api return 30 records by default
   */
   const [currPage, setcurrPage] = useState();
   // const [errorOccured, seterrorOccured] = useState();
   // const [showPopup, setshowPopup] = useState();
   const [popupTitle, setpopupTitle] = useState();
   const [popupBody, setpopupBody] = useState();
   const [toggle, setToggle] = useState(false);
   // Get ID from URL
   const params = useParams();
   let {userInput}=useContext(AppContext);


   // Async function to call Github api and get repo data
   async function repoDataURL() {
    let user = '';
    // don't do anything if params of url ID is not valid
    if (!params || !params.id) return;

    if (params.id || userInput) {
      user = params.id || userInput
    } else {
      user = "";
      return;
    }
    
    // Get API url and header from constant
    const apiURL = `${LIST_CONSTANTS.GIT_API_GET_USERS}${user}${LIST_CONSTANTS.GIT_REPOS}`;
    const apiHeader = getAPIHeader();

    await fetch(apiURL, apiHeader)
      .then((res) => res.json()) // converting response in json
      .then(
        (result) => {
          if(result.message) {
            setpopupTitle("API Error")
            setpopupBody(result.message);
            setToggle(true);
            // throw new Error(result.message);
           }
          else {
            // console.log(36, result);
            setRepoData(result);
         }
          
        }
      ).catch(err => {
        // console.log('REPO ERROR : ',err);
        // throw new Error(err);
      });
  }


  /* 
    Get URL user name details froim Git api
    useEffect hook is used to perform a side effect logic for a component.
    It is done after component renders.It lets a component interact outside 
    without affecting the rendering or performance of the component.
  */
  useEffect(() => {
    console.log(params.id);
    if(!userInput) {
      userInput = params.id;
    }

    if(userInput) {
    // Get API url and header from constant
    const apiURL = `${LIST_CONSTANTS.GIT_API_GET_USERS}${userInput}`;
    const apiHeader = getAPIHeader();

    fetch(apiURL, apiHeader)
    .then((res) => res.json())
    .then(
      (result) => {
        if(result.message) {
          setpopupTitle("API Error")
          setpopupBody(result.message)
            // "It seems GIT user ID is invalid. Please use a different user or try again later");
          setToggle(true);
          // throw new Error(result.message);
         }
        else {
          console.log(result);
          setAvatarURL(result.avatar_url);
          setGitHubUsername(result.login);
          setgithubUserURL(result.html_url);
        }
      },
    ).catch(err => {
      // console.log('USER ERROR : ', err);
      // throw new Error(err);
    });
   }
    
  }, []);



  // Get list of repos for given user
  useEffect(() => {
    repoDataURL();
  }, []);


  // Async function to call Github api to load more repos
async function repoDataMore() {
  // Increament current page counter

  let user = '';
  // don't do anything if params of url ID is not valid
  if (!params || !params.id) return;

  if (params.id || userInput) {
    user = params.id || userInput
  } else {
    user = "";
    return;
  }
  // Get next page number
  let nextPage = (currPage) ? currPage + 1 : 1 ;
  
  // Get API url and header from constant
  const apiURL = `${LIST_CONSTANTS.GIT_API_GET_USERS}${user}${LIST_CONSTANTS.GIT_REPOS}?page=${nextPage}`; 
  const apiHeader = getAPIHeader();

  await fetch(apiURL,apiHeader)
    .then((res) => res.json())
    .then(
      (result) => {
        if(result.message) {
          setpopupTitle("API Error")
          setpopupBody(result.message);
          setToggle(true);
          // throw new Error(result.message);
         }
        else 
        {
          // Check for both previous and new data set and then concat them
          if (result && Array.isArray(result) && (result.length > 0) && repoData && Array.isArray(repoData)) {
             const moreData = repoData.concat(result);
             //Assign the new moredata in state, that will re-render the component
             setRepoData(moreData);
             // Set the state with current page number
             setcurrPage((currPage) ? currPage + 1 : 1);
          }
        }
       }
      ).catch(err => {
        // console.log('REPO ERROR : ',err);
        // throw new Error(err);
      });
}

  
  // Render the jsx
  return (
    <>
    
     { 
      //  Check if nurl ism defined then show proper message else empty
       (githubUsername) ?
     
        <div className="pt-10" >
          <span style={{ fontSize: '01rem'}}>
            {LIST_CONSTANTS.MSG_VIEWREPOOF} <b> <a target="_blank" rel="noreferrer" href={githubUserURL} style={{ cursor: "pointer"}}> {githubUsername} </a> </b>
          </span>
        </div>
      :
        <>
          <h6 className="mb-10">
            {LIST_CONSTANTS.MSG_TOOLTIP_URL}
          </h6>
        </>
     }
     {
       //  Check if nurl ism defined then show proper component else empty
      (githubUsername) ?
      <>
      {
        !repoData ? 
        (
          <Loading />
        ) 

        : 
        
        (
          // reating cards for each item
          <Row lg={4} style={{ padding: '0.5rem', whiteSpace: 'normal', overflow: 'auto'}}>
            {repoData.map((item) => (
            
            <Col className="d-flex" style={{ padding: '0.5rem'}} id={item} key={item.name}>
              <Card style={{ width: '17rem' , height: '18rem', minWidth: '17rem', minHeight: '18rem'}}  key={item}>
                <Card.Body style={{ padding: '0.1rem' , margin: '0.4rem'}}>
                <Card.Img variant="top" src={avatarURL} style={{ width: '3rem', height: '3rem', alignSelf:'left', marginRight: '1.2rem' }} />
                <Button href={item.svn_url} target="_blank"  style={{ width: '10rem' , height: '1.8rem', fontSize: '1rem', padding: '1px', margin:'1px', cursor: "pointer"}} variant="primary">{item.name}</Button>
                <Button style={{ width: '3rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'1px'}} variant="secondary">{(item.private)? 'Private' : 'Public'}</Button>
                <Card.Text style={{ fontSize: '0.6rem' }}> {item.language} </Card.Text>
                <Card.Text style={{ fontSize: '0.7rem', height:'2.7rem', maxHeight: '2.7rem', minHeight: '2.7rem', overflowY:'auto' }}>{item.description}</Card.Text>
                </Card.Body>
    
                <ListGroup style={{ fontSize: '0.7rem', padding: '0.1rem' , margin: '0.1rem' }} className="list-group-flush">
                  <ListGroup.Item>Owner : {githubUsername}</ListGroup.Item>
                  <ListGroup.Item>Issues :{item.open_issues}</ListGroup.Item>
                  {/* <ListGroup.Item>{ (item.license.name) ? 'Licence :' + item.license.name : 'Size : ' + item.size} </ListGroup.Item> */}
                </ListGroup>

                <Card.Body>
                  <Button href={item.clone_url} target="_blank" style={{ width: '3rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'3px', cursor: "pointer"}} variant="success">clone</Button>
                  <Button style={{ width: '3rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'3px'}} variant="warning"><b>{item.stargazers_count}</b> starts</Button>
                  <Button style={{ width: '3rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'3px'}} variant="light">{item.forks_count} forks</Button>
                  <Button style={{ width: '4rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'3px'}} variant="light">{item.watchers} watchers</Button>
                </Card.Body>

              </Card>
            </ Col>
            ))}  
          </Row>
        )
      }
      <div style={{ height: '0.1rem', padding: '0.1px', margin: '0.1px'}}>
        <Button onClick={() => repoDataMore()} style={{ width: '4rem' , height: '1.2rem', fontSize: '0.6rem', padding: '1px', margin:'3px', cursor: "pointer"}} variant="success">Load More</Button>
      </div>
      </>
      :
      <>
        {/* Popup for errors */}
        { 
          (toggle) ?
          Popup(toggle, popupTitle, popupBody)  
           : ''
        }
      </>
     }
    </>
  );
  

}