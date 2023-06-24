import { AccountInfo } from '@azure/msal-browser';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { GPLayout, Page, UserInformationEventType, useConfig } from '@guedesplace/designelements';
import React from 'react';
import { WelcomePage } from './Pages/WelcomePage';
import { Outlet, RouterProvider, createHashRouter } from 'react-router-dom';
import { DashboardPage } from './Pages/DashboardPage';
import { AlbumPage } from './Pages/AlbumPage';
import { PhotosPage } from './Pages/PhotosPage';
import { UploadPage } from './Pages/UploadPage';

const builderUserInformation = (activeAccount: AccountInfo | null) => {
    console.log(activeAccount);
    return activeAccount ?
        {
            commonName: activeAccount.name + "",
            eMail: activeAccount.username,
            oganisationName: activeAccount.tenantId
        } : undefined;
};
export const ApplicationLayout: React.FunctionComponent = () => {
    const config = useConfig();
    const router = createHashRouter([
        {
            path: "/",
            element: <DashboardPage />,
        },
        {
            path: "dashboard",
            element: <DashboardPage />,
            //loader: teamLoader,
        },
        {
            path: "albums",
            element: <AlbumPage />,
            //loader: teamLoader,
        },
        {
            path: "photos",
            element: <PhotosPage />,
            //loader: teamLoader,
        },

        {
            path: "upload",
            element: <UploadPage />,
            //loader: teamLoader,
        },

    ]);
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();
    const linkItems = isAuthenticated ? [{
        id: 'dasboard',
        title: 'Dasboard',
        onClick: (id: string) => { console.log("gugus"); router.navigate("/dashboard"); }
    },
    {
        id: 'uploadAction',
        title: 'Upload',
        onClick: (id: string) => router.navigate("/upload")
    }
    ] : undefined;
    const userInformation = isAuthenticated ? builderUserInformation(instance.getActiveAccount()) : undefined;
    const applicationItems = isAuthenticated ? [
        { title: 'Photos', iconName: "PhotoVideoMedia", id: 'photos', onClick: () => console.log("photos") },
        { title: 'Profile', iconName: "ProfileSearch", id: 'profiles', onClick: (id: string) => console.log(id) }
    ] : undefined;
    const processUserInformationEvent = (event: UserInformationEventType) => {
        switch (event) {
            case UserInformationEventType.LOGIN:
                return instance.loginRedirect();
            case UserInformationEventType.LOGOUT:
                return instance.logout();
        }
    }

    return <GPLayout
        linkItems={linkItems}
        title="PhotoAlbum"
        selectedApplicationId='photos'
        version="0.1.0.beta"
        applicationItems={applicationItems}
        userInformation={userInformation}
        onUserInformationEvent={processUserInformationEvent}
    >
        <UnauthenticatedTemplate>
            <WelcomePage></WelcomePage>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
            <RouterProvider router={router} />
        </AuthenticatedTemplate>
    </GPLayout>
}