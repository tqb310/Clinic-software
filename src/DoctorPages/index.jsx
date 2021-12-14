import React from 'react';
import Routes from "./_routes"
import PageWrapper from '_components/PageWrapper';
import {useRouteMatch} from 'react-router-dom';
//import PropTypes from 'prop-types'
//import PropTypes from 'prop-types'

function DoctorModule(props) {
    const {path}  = useRouteMatch(); 
    return (
        <div>
            <PageWrapper routes={Routes} currentPath={path}/>
        </div>
    )
}

DoctorModule.propTypes = {

}

export default DoctorModule

