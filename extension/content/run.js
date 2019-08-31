(() => {

  const START_APP = 'START_APP';
  const STOP_APP = 'STOP_APP';

  let appElement = null;

  const createApp = () => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
      position:fixed;border: none;top:30px;right:30px;display:block;width:300px;height:560px;z-index:1000000000;
    `;
    iframe.src = chrome.extension.getURL('index.html');
    document.body.appendChild(iframe);

    appElement = iframe;
  };

  const removeApp = () => {
    document.body.removeChild(appElement);
    appElement = null;
  };

  chrome.runtime.onMessage.addListener(function (request) {
    if (request.type === START_APP) {
      createApp();
    }

    if (request.type === STOP_APP) {
      removeApp();
    }
  });

})();
