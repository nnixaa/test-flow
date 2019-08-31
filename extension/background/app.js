(() => {

  const START_APP = 'START_APP';
  const STOP_APP = 'STOP_APP';

  const appState = {
    active: false,
    recording: false,
  };

  const sendToActive = (type) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: type });
    });
  };

  chrome.browserAction.onClicked.addListener((tab) => {
    if (appState.active) {
      sendToActive(STOP_APP);
      appState.active = false;
    } else {
      sendToActive(START_APP);
      appState.active = true;
    }
  });

})();
