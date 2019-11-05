import React from 'react';
import Map from './Map';

export default class MapFactory {
    
    build() {
        return <React.Fragment>
            <Map 
                rowsPath={"init/rowsNumber"}
                columnsPath={"init/columnsNumber"}
            />
        </React.Fragment>

    }
}
