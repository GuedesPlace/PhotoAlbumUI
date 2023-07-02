import { Page, PictureUploader } from '@guedesplace/designelements';
import React from 'react';
import { navigationTree } from '../Utils/navigationTree';

export const UploadPage:React.FunctionComponent =()=> {
    return <Page title="Upload new pictures" navigationItems={navigationTree}>
        <PictureUploader
            instructions="Please select the pictures you want to upload"
            onUploadStart={(f)=>console.log(f)}
            uploadStatus={[]}
        ></PictureUploader>
    </Page>
}