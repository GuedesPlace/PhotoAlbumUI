import axios from "axios";
import React from 'react';
import logo from './logo.svg';
import { defaultConfig, dynamicConfigUrl, useConfig } from "@guedesplace/designelements";

const configLoadingErrorMessage =
  "Error while fetching global config, the App wil not be rendered. (This is NOT a React error.)";


import './App.css';

export const App:React.FunctionComponent = ()=> {
  const { setConfig } = useConfig();
  const [configLoadingState, setConfigLoadingState] = React.useState<
    "loading" | "ready" | "error"
  >("loading");

  React.useEffect(() => {
    //log.debug("App.tsx, fetching global config from", dynamicConfigUrl);
    axios
      .get(dynamicConfigUrl)
      .then((response) => {
        setConfig(response.data);
        //log.debug("Global config fetched: ", response.data);
        setConfigLoadingState("ready");
      })
      .catch((e) => {
        // In Codesandbox.io: deleting `config.json` will not trigger this branch, because the request response code will still be 200, not 404.
        // To test this case in codesanbox.io, add "throw {};" to line 22.

        // In development, treat this case as a warning, render the app and use default config values.
        // In production (and test) on the other hand, show error instead of rendering the app.

        // In Codesandbox.io: You cannot change the value of NODE_ENV. To test this if, change "development"
        if (process.env.NODE_ENV === "development") {
          //log.warn(
          //  `Failed to load global configuration from '${dynamicConfigUrl}', using the default configuration instead:`,
            defaultConfig
          //);
          setConfigLoadingState("ready");
        } else {
          //log.error(
            //configLoadingErrorMessage,
            //`Have you provided the config file '${dynamicConfigUrl}'?`,
            //e
          //);
          setConfigLoadingState("error");
        }
      });
  }, [setConfig]);

  if (configLoadingState === "loading") {
    return "Loading the app..."; // change to some visual CircularProgress in real app
  }
  if (configLoadingState === "error") {
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        {configLoadingErrorMessage}
      </p>
    );
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

