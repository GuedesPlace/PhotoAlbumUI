import { AuthenticationResult, EventMessage, EventType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { DynamicConfig, useConfig } from '@guedesplace/designelements';
import React from 'react';
import { ApplicationLayout } from './ApplicationLayout';

const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0;
const createMsalConfig = (config: DynamicConfig) => {
    return {
        auth: {
            clientId: config.applicationId,
            authority: config.authority,
            knownAuthorities: [config.authorityDomain],
            redirectUri: "/",
            postLogoutRedirectUri: "/"
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: isIE || isEdge || isFirefox
        },
        system: {
            allowNativeBroker: false, // Disables WAM Broker
            loggerOptions: {
                level: LogLevel.Verbose,
                loggerCallback: (level: LogLevel, message: string, containsPii: any) => {
                    if (containsPii) {
                        return;
                    }
                    switch (level) {
                        case LogLevel.Error:
                            console.error(message);
                            return;
                        case LogLevel.Info:
                            console.info(message);
                            return;
                        case LogLevel.Verbose:
                            console.debug(message);
                            return;
                        case LogLevel.Warning:
                            console.warn(message);
                            return;
                        default:
                            return;
                    }
                }
            }
        }
    };
}

export const BusinessApp: React.FunctionComponent = () => {
    
    const { config } = useConfig();
    const pca = React.useMemo(() => {
        const msalConfig = createMsalConfig(config);
        const msalInstance = new PublicClientApplication(msalConfig);
        // Default to using the first account if no account is active on page load
        if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
            // Account selection logic is app dependent. Adjust as needed for different use cases.
            msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
        }

        // Optional - This will update account state if a user signs in from another tab or window
        msalInstance.enableAccountStorageEvents();

        msalInstance.addEventCallback((event: EventMessage) => {
            if ((event.eventType === EventType.LOGIN_SUCCESS
                ||
                event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
                ||
                event.eventType === EventType.SSO_SILENT_SUCCESS
            ) && event.payload) {
                const payload = event.payload as AuthenticationResult;
                const account = payload.account;
                msalInstance.setActiveAccount(account);
            }
        });

        return msalInstance;
    }, []);
    return <MsalProvider instance={pca}>
        <ApplicationLayout></ApplicationLayout>
    </MsalProvider>
}