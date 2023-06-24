import { INavLinkGroup } from "@fluentui/react";

export const navigationTree:INavLinkGroup[] = [
    {
        links: [
          {
            name: 'Photos',
            url: '#/photos',
            key:"photos"
          },
          {
            name: 'Albums',
            url: '#/albums',
            key: 'albums',
          },
        ],
      },
]