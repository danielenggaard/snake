import React from 'react';
import { Box } from '@material-ui/core'

export default function GridContiner(props) {



    return <React.Fragment>
        <Box 
            width="100%" 
            display="flex"
            justifyContent="center"
            alignContent="center"
            position="absolute"
            overflow="hidden"
            top="0"
            left="0"
            marginTop="60px"
        >
            {props.children}
        </Box>
        </React.Fragment>
}
