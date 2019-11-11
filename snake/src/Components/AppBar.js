import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';

export default function Appbar(props) {

        
        return <React.Fragment>
            <AppBar color="inherit" position="static">
            <Toolbar variant="dense">
                    <Button 
                        onClick={props.startGame}
                        variant="contained"
                        color="primary"
                        >
                                Start
                        </Button>
                    
            </Toolbar>
            </AppBar>
        </React.Fragment>
}
