import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BUILD_NAME } from '../../helpers/appConstants';

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - ${BUILD_NAME}`}</title>
        </Helmet>
    )
}

export default MetaData;