import './Navbar.css'
import React from 'react';
import Backdrop from './Backdrop/Backdrop';
import Sidedrawer from './Sidedrawer/Sidedrawer';
import Toolbar from './Toolbar/Toolbar';

class Navbar extends React.Component { 
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  backDropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backDropClickHandler} />;
    }

    return (
      <div style={{ height: "100%" }} className="Navbar" data-testid="navbar">
        <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />
        <Sidedrawer show={this.state.sideDrawerOpen} />
        {backdrop}
      </div>
    );
  }
}

export default Navbar;
