chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'startApp') {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;top:0;left:0;display:block;width:250px;height:300px;z-index:1000000000;';
    iframe.src = chrome.extension.getURL('index.html');
    document.body.appendChild(iframe);
    sendResponse({});
  }
});
