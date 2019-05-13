require('chromedriver');
var webdriver = require('selenium-webdriver');
  var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

describe('test login and registration', () => {
  
  var testun = Math.random().toString(36).substring(7);
  var testpw = Math.random().toString(36).substring(7);

  test(`Register a new user and get redirected to login`, async () => {
    await driver.get('https://curfewbot-app123.eu-gb.mybluemix.net/registration.html');
    await driver.findElement(webdriver.By.name("username")).sendKeys(testun);
    await driver.findElement(webdriver.By.name("password")).sendKeys(testpw);
    await driver.findElement(webdriver.By.xpath("//input[@value='Sign up']")).click();
    await driver.sleep(1000);
         await driver
          .getTitle()
          .then(title => {
              expect(title).toEqual('Login page');
          });
  }, 30000);
  
  test(`Login with registered credentials and get redirected to index where logout now exist`, async () => {
    await driver.get('https://curfewbot-app123.eu-gb.mybluemix.net/login.html');
    await driver.findElement(webdriver.By.name("username")).sendKeys(testun);
    await driver.findElement(webdriver.By.name("password")).sendKeys(testpw);
    await driver.findElement(webdriver.By.xpath("//input[@value='Login']")).click();
    await driver.sleep(2000);
         await driver
          .getTitle()
          .then(title => {
              expect(title).toEqual('CurfewBot2020');
          });
    await driver.findElement(webdriver.By.id("logout")).isDisplayed().then(function(visible){
    expect(visible).toBe(true);
    });
  }, 30000);

  test(`Login with invalid username and password, get error messsage`, async () => {
    await driver.get('https://curfewbot-app123.eu-gb.mybluemix.net/login.html');
    await driver.findElement(webdriver.By.name("username")).sendKeys("unregisteredusername");
    await driver.findElement(webdriver.By.name("password")).sendKeys("unregisteredpassword");
    await driver.findElement(webdriver.By.xpath("//input[@value='Login']")).click();
    await driver.sleep(1000);
    await driver.switchTo().alert().getText().then(function (alert) {
      expect(alert).toBe('invalid username or password, try again!');
    });
    await driver.quit();
  }, 30000);
});