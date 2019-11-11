import React from 'react';
import { Box } from '@material-ui/core'

export default function GridContiner(props) {



    return <React.Fragment>
        <Box 
            width="100%" 
            display="flex"
            justifyContent="center"
            alignContent="center"
        >
            {props.children}
        </Box>
        </React.Fragment>
}
