export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  if ("serviceWorker" in navigator)
    navigator.serviceWorker.register(swUrl).then((res) => {
      console.warn(res, "res");
      return res.pushManager.getSubscription().then((subscription) => {
        return res.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey(),
        });
      });
    });
}

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function determineAppServerKey() {
  var vapidPublicKey =
    "BEEdt6Eceda3qNMyG3NvEKv8je8vDR7U3c2inVcpUa5TnflwzQkZ8Ms5eSDmFmvvxUGA6fwy-gxFgmGuucbtIh8";
  return urlBase64ToUint8Array(vapidPublicKey);
}
