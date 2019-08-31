import { initializeRecorder } from '../recorder/container';

(() => {

  const START_APP = 'START_APP';
  const STOP_APP = 'STOP_APP';

  let appElement = null;

  const createApp = () => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
      position: fixed;
      border: none;
      top: 30px;
      right: 30px;
      display: block;
      width: 300px;
      height: 560px;
      z-index: 1000000000;
      border-radius: 0.25rem;
      box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, 0.1);
    `;
    iframe.src = chrome.extension.getURL('index.html');
    document.body.appendChild(iframe);

    appElement = iframe;

    initializeRecorder(iframe);
  };

  const removeApp = () => {
    if (appElement) {
      document.body.removeChild(appElement);
      appElement = null;
    }
  };

  chrome.runtime.onMessage.addListener((request) => {
    if (request.type === START_APP) {
      createApp();
    }

    if (request.type === STOP_APP) {
      removeApp();
    }
  });

})();
