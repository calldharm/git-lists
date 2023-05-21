import React from "react";
import "./Header.css";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LIST_CONSTANTS } from "../../utility/constanst"

// header for the app
export default function Header(props) {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {LIST_CONSTANTS.MSG_TOOLTIP_URL}
    </Tooltip>
  );
  return (
    <div className="header">
     <Row>
       <Col>
          <span style={{ fontSize: '1.5rem', padding: '10px', margin:'1px'}}>{props.title}</span>
          <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
          >
             <Button style={{ width: '1rem' , height: '1rem', fontSize: '0.6rem', padding: '1px', marginBottom:'9px', cursor: "pointer"}} variant="warning">i</Button>
          </OverlayTrigger>
          <p>{props.subtitle}</p>
       </Col>
      </Row>
    </div>
  );
}