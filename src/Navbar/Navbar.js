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
        // let sideDrawer;
        let backdrop;
    
        if (this.state.sideDrawerOpen) {
          // sideDrawer = <SideDrawer />;
          backdrop = <Backdrop click={this.backDropClickHandler} />;
        }
        return (
          <div style={{ height: "100%" }}>
            <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />
            <Sidedrawer show={this.state.sideDrawerOpen} />
            {backdrop}
    
            <main style={{ marginTop: "64px" }}>
              <p>This is the content</p>
            </main>
          </div>
        );
      }
    }

export default Navbar;
