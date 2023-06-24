import { Stack, Text } from '@fluentui/react';
import { Page } from '@guedesplace/designelements';
import React from 'react';
import { navigationTree } from '../Utils/navigationTree';

export const DashboardPage:React.FunctionComponent =()=> {
    return <Page title='Dashboard' navigationItems={navigationTree}></Page>
}