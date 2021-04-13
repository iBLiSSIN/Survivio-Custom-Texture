'use strict';

const replaces = new  Map([

    ["https://surviv.io/assets/gradient-0-100-e7bfde21.png", "/assets/1.png"],
    ["https://surviv.io/assets/shared-1-100-c4d16b46.png", "/assets/2.png"],
    ["https://surviv.io/assets/shared-0-100-a69d7039.png", "/assets/3.png"],
    ["https://surviv.io/assets/shared-2-100-5f68d5aa.png", "/assets/4.png"],
    ["https://surviv.io/assets/shared-3-100-b27d599b.png", "/assets/5.png"],
    ["https://surviv.io/assets/loadout-0-100-f7e496d0.png", "/assets/6.png"], 
    
    ["https://surviv.io/img/gui/close.svg", "/gui/close.png"],
    ["https://surviv.io/img/pass/pass-premium-bg.svg", "/pass/pass-premium-bg.png"],
    ["https://surviv.io/img/pass/pass-premium-badge.svg", "/pass/pass-premium-badge.png"],
    ["https://surviv.io/img/pass/pass-basic-badge.svg", "/pass/pass-not-premium-badge.png"],
    ["https://surviv.io/img/gui/cog.svg", "/gui/cog.png"],
    ["https://surviv.io/img/gui/crosshair.svg", "/gui/crosshair.png"],
    ["https://surviv.io/img/gui/eye.svg", "/gui/eye.png"],
    ["https://surviv.io/img/gui/gas.svg", "/gui/gas.png"],
    ["https://surviv.io/img/gui/item-boost-style.svg", "/gui/item-boost-style.png"],
    ["https://surviv.io/img/gui/keyboard.svg", "/gui/keyboard.png"],
    ["https://surviv.io/img/gui/loadout-boost.svg", "/gui/loadout-boost.png"],
    ["https://surviv.io/img/gui/loadout-crosshair.svg", "/gui/loadout-crosshair.png"],
    ["https://surviv.io/img/gui/loadout-emote.svg", "/gui/loadout-emote.png"],
    ["https://surviv.io/img/gui/loadout-heal.svg", "/gui/loadout-heal.png"],
    ["https://surviv.io/img/gui/loadout-melee.svg", "/gui/loadout-melee.png"],
    ["https://surviv.io/img/gui/loadout-outfit.svg", "/gui/loadout-outfit.png"],
    ["https://surviv.io/img/gui/loadout-player-icon.svg", "/gui/loadout-player-icon.png"],
    ["https://surviv.io/img/gui/minimize.svg", "/gui/minimize.png"],
    ["https://surviv.io/img/gui/news.svg", "/gui/news.png"],
    ["https://surviv.io/img/gui/ping-part-circle.svg", "/gui/ping-part-circle.png"],
    ["https://surviv.io/img/gui/skull.svg", "/gui/skull.png"],
    ["https://surviv.io/img/gui/trash.svg", "/gui/trash.png"],
    ["https://surviv.io/img/gui/reload.svg", "/gui/reload.png"],
    ["https://surviv.io/img/gui/emote.svg", "/gui/gas.png"],
    ["https://surviv.io/img/gui/gas.svg", "/gui/gas.png"],
    ["https://surviv.io/img/gui/gas.svg", "/gui/gas.png"],
    ["https://surviv.io/img/gui/gas.svg", "/gui/gas.png"],

    ["https://surviv.io/img/gui/index-dropdown-arrow.svg", "/gui/index-dropdown-arrow.png"],

    ["https://surviv.io/img/main_splash.jpg", "/assets/titel/titel1.png"],
    ["https://surviv.io/img/yt_icon_rgb.png", "/assets/img/yt_icon_rgb.png"],
    ["https://surviv.io/img/icon_youtube.png", "/assets/img/icon_youtube.png"],
    ["https://surviv.io/img/icon_twitter.png", "/assets/img/icon_twitter.png"],
    ["https://surviv.io/img/icon_facebook.png", "/assets/img/icon_facebook.png"],
    ["https://surviv.io/img/icon_download_ios.png", "/assets/img/icon_download_ios.png"],
    ["https://surviv.io/img/icon_download_android.png", "/assets/img/icon_download_android.png"],
    ["https://surviv.io/img/icon_discord_sm.png", "/assets/img/icon_discord_sm.png"],
    ["https://surviv.io/img/contact_status.png", "/assets/img/contact_status.png"],
    
    ["https://surviv.io/img/main_splash.png", "/img/main_splash.png"]
]);

const ext = {};

ext.onHeadersReceived = ({responseHeaders}) => {
  const o = responseHeaders.find(({name}) => name.toLowerCase() === 'access-control-allow-origin');
  if (o) {
    o.value = '*';
  }
  else {
    responseHeaders.push({
      'name': 'Access-Control-Allow-Origin',
      'value': '*'
    });
  }
  
  return {responseHeaders};
};

ext.onBeforeRequest = (details) => {
  if(replaces.has(details.url)){
    var replaced_url = chrome.extension.getURL(replaces.get(details.url));
    console.log(replaced_url);
    return {redirectUrl: replaced_url };
  }  
};

ext.install = () => {
  ext.remove();
  const extra = ['blocking', 'responseHeaders'];
  if (/Firefox/.test(navigator.userAgent) === false) {
    extra.push('extraHeaders');
  }
  chrome.webRequest.onHeadersReceived.addListener(ext.onHeadersReceived, {
    urls: ['https://surviv.io/*']
  }, extra);
  
  chrome.webRequest.onBeforeRequest.addListener(ext.onBeforeRequest, {
    urls: ['https://surviv.io/*']
  }, ['blocking']);
};
ext.remove = () => {
  chrome.webRequest.onBeforeRequest.removeListener(ext.onBeforeRequest);
  chrome.webRequest.onHeadersReceived.removeListener(ext.onHeadersReceived);
};

ext.install();

