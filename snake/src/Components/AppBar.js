import React from 'react';
import { AppBar, Button, Toolbar, Typography, Box } from '@material-ui/core';

export default function Appbar(props) {

        
        return <React.Fragment>
            <AppBar color="inherit" position="static">
            <Toolbar variant="dense">
                <Box mx={2}>
                    <Button 
                        onClick={props.startGame}
                        variant="contained"
                        color="primary"
                        disabled={props.gameIsOn}
                        >
                                Start
                        </Button>
                </Box>
                <Typography variant="h6">Score: {props.score}</Typography>
                    
            </Toolbar>
            </AppBar>
        </React.Fragment>
}
