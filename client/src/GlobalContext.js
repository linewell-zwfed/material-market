import * as React from "react";

export const devVsCodeApi = () => {
  return {
    postMessage(data) {
      window.parent.postMessage({type: 'clientPostMessage', data}, '*');
    }
  };
}

export const AppContext = React.createContext({ vscode: devVsCodeApi() });