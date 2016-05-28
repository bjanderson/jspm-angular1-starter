# JSPM Angular 1 Starter
-----

## E2E Testing

Remember to install protractor for e2e testing. It needs to be installed globally in order to work - at least that's the only way I could get it working.
    npm i -g protractor
    webdriver-manager update

Get the WebDriver [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/)
Unzip it and put it in your npm/bin directory.
You can find your npm/bin directory by running the followin command and adding /bin to it
    npm config get prefix

And then start webdriver and the dev server (in different terminal windows) before running protractor
    gulp
    webdriver-manager start
    protractor
