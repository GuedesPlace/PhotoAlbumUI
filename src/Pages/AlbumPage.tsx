import { Stack, Text } from '@fluentui/react';
import { Page } from '@guedesplace/designelements';
import React from 'react';
import { navigationTree } from '../Utils/navigationTree';

export const AlbumPage:React.FunctionComponent =()=> {
    return <Page title='Albums' navigationItems={navigationTree}></Page>
}