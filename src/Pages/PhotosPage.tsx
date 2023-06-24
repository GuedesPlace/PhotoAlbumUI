import { Stack, Text } from '@fluentui/react';
import { Page } from '@guedesplace/designelements';
import React from 'react';
import { navigationTree } from '../Utils/navigationTree';

export const PhotosPage:React.FunctionComponent =()=> {
    return <Page title='Photos' navigationItems={navigationTree}></Page>
}