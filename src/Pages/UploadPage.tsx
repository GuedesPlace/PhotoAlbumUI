import { Stack, Text } from '@fluentui/react';
import { Page } from '@guedesplace/designelements';
import React from 'react';
import { navigationTree } from '../Utils/navigationTree';

export const UploadPage:React.FunctionComponent =()=> {
    return <Page title='Upload new pictures' navigationItems={navigationTree}></Page>
}