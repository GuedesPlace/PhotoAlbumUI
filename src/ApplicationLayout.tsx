import { AccountInfo } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { GPLayout } from '@guedesplace/designelements';
import React from 'react';

const builderUserInformation = (activeAccount: AccountInfo | null) => activeAccount ?
    {
        commonName: activeAccount.name+"",
        eMail: activeAccount.username,
        oganisationName: activeAccount.tenantId
    } : undefined;

export const ApplicationLayout: React.FunctionComponent = () => {
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();
    const linkItems = isAuthenticated ? [{
        id: 'dasboard',
        title: 'Dasboard',
        onClick: (id: string) => console.log(id)
    },
    {
        id: 'uploadAction',
        title: 'Upload',
        onClick: (id: string) => console.log(id)
    }
    ] : undefined;
    const userInformation = isAuthenticated ? builderUserInformation(instance.getActiveAccount()) : undefined;
    const applicationItems = isAuthenticated ? [
        { title: 'Photos', iconName: "PhotoVideoMedia", id: 'photos', onClick: () => console.log("photos") },
        { title: 'Profile', iconName: "ProfileSearch", id: 'profiles', onClick: (id: string) => console.log(id) }
    ] : undefined;

    return <GPLayout
        linkItems={linkItems}
        title="PhotoAlbum"
        selectedApplicationId='photos'
        version="0.1.0.beta"
        applicationItems={applicationItems}
        userInformation={userInformation}
        onUserInformationEvent={(event) => console.log(event)}
    ></GPLayout>
}