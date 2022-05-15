import React from 'react';
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import './Header.css';

const Header = ( {location} ) => {
  return (
    <React.Fragment>
      <div className="Header">
        Record your <span className="name">name</span>
      </div>
      <div>
      {
        location === 'apphub' && (
          <div>
            <div className="subHeader">
              A <span className="name">name</span> is your identity. It's what people call you, it's what you respond to, it's what you understand about yourself.
            </div>
            <div className="subTitle">
              Simply record your <span className="name">name</span> as it's meant to be said, using this tool.
              {' '}
              <Button variant="warning" style={{'background-color': 'rgb(255, 87, 34)'}}>
                <Link style={{'color': '#FFF', 'text-decoration': 'none'}} to="/home">Record yours now!</Link>
              </Button>
            </div>
          </div>
        )
      }
      </div>
    </React.Fragment>
  );
}

export default Header;
