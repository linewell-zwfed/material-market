import { EXTENSION_COMMANDS } from '../constants/commands'

const postMessageAsync = (cmd, data = {}, vscode, scopeId = Math.random()) => {
  const promise = new Promise((resolve) => {
    data.payload = data.payload || {};
    data.scope = scopeId;
    const callbackVsCode = (event) => {
      if (event.data.cmd === cmd && event.data.payload) {
        if (event.data.scope === scopeId) {
          resolve(event);
          window.removeEventListener('message', callbackVsCode);
        }
      } 
    };

    window.addEventListener('message', callbackVsCode);
    vscode.postMessage({...data, cmd});
  });

  return promise;
}

/**
 * 获取路径
 * @param {*} options vscode showOpenDialog 参数，详见 vscode 插件
 * @returns 
 */
export const getSavePath = (options, vscode) => {
  return postMessageAsync(
    EXTENSION_COMMANDS.GET_FILE_PATH, 
    {
      payload: options
    },
    vscode
  )
}

export const createFile = ({filePath, fileName, snippetPrefix}, vscode) => {
  return postMessageAsync(
    EXTENSION_COMMANDS.CREATE_FILE,
    {
      payload: {
        filePath, fileName, snippetPrefix
      }
    },
    vscode
  )
}

export const getDefaultPath = (vscode) => {
  return postMessageAsync(
    EXTENSION_COMMANDS.GET_DEFAULT_PATH,
    {},
    vscode
  )
}
