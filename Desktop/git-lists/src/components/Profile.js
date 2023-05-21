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


export const Profile = () => {
    // User Profile  : Using Bootstrap elements for main profile page

   const [avatarURL, setAvatarURL] = useState();
   const [githubUsername, setGitHubUsername] = useState();

   const [repoData, setRepoData] = useState();
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
    } 
    
    // Get API url nd header from constant
    const apiURL = `${LIST_CONSTANTS.GIT_API_GET_USERS}${user}${LIST_CONSTANTS.GIT_REPOS}`;
    const apiHeader = getAPIHeader;

    await fetch(apiURL,apiHeader)
      .then((res) => res.json()) // converting  response in json
      .then(
        (result) => {
          console.log(36, result);
          let profileContent = "";
          profileContent = (result[0] && result[0].message && result[0].message === LIST_CONSTANTS.MSG_NOTFOUND) ? LIST_CONSTANTS.MSG_OOPS : "";
          
          const list = (result && Array.isArray(result)) ? result.map((item) => (
          
            <ListGroup.Item>
              <a target="_blank" href={item.svn_url}>
                {item.name}
              </a>
            </ListGroup.Item>

          )) : [];

          if(profileContent) {
            list = ["opps"];
          } else {
            // setRepoData(list);
            setRepoData(result);
          }
          
        },
        // In case of any error in API log here
        (error) => {
          console.log(error);
          <div className="text-center">
            Opps.. something went wrong, please check user ID or try again later.
          </div>
        }
      );
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

    // Get API url and header from constant
    const apiURL = `${LIST_CONSTANTS.GIT_API_GET_USERS}${userInput}`;
    const apiHeader = getAPIHeader;

    fetch(apiURL, apiHeader())
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result);
        setAvatarURL(result.avatar_url);
        setGitHubUsername(result.login);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // Get list of repos for given user
  useEffect(() => {
    repoDataURL();
  }, []);

  return (
    <>
      <div className="pt-10" >
        <h3 className="mb-10 font-bold text-2xl">
          {LIST_CONSTANTS.MSG_VIEWREPOOF} <b>{githubUsername}</b>
        </h3>
      </div>

      {!repoData ? (
        <Loading />
      ) : (
        // reating cards for each item
        <Row lg={4} style={{ padding: '0.5rem', whiteSpace: 'normal', overflow: 'auto'}}>
          {repoData.map((item) => (
          
          <Col className="d-flex" style={{ padding: '0.5rem'}}>
            <Card style={{ width: '17rem' , height: '18rem'}} className="flex-fill" key={item} className="productlist">
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
                <Button href={item.clone_url} style={{ width: '3rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'3px', cursor: "pointer"}} variant="success">clone</Button>
                <Button style={{ width: '3rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'3px'}} variant="warning"><b>{item.stargazers_count}</b> starts</Button>
                <Button style={{ width: '3rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'3px'}} variant="light">{item.forks_count} forks</Button>
                <Button style={{ width: '4rem' , height: '1.1rem', fontSize: '0.6rem', padding: '1px', margin:'3px'}} variant="light">{item.watchers} watchers</Button>
              </Card.Body>

            </Card>
          </ Col>
          ))}
        </Row>
      )}
    </>
  );
  

}