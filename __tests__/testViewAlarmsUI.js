require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder()
 .forBrowser('chrome')
 .build();
tests();
 async function tests(){
 await login();
 await setTimeout(viewAlarmsTest, 1000);
 await setTimeout(delay, 5000);
 }
 async function login(){
   await driver.get('https://curfewbot-app123.eu-gb.mybluemix.net/login.html');
   await driver.findElement(webdriver.By.name("username")).sendKeys("hej");
   await driver.findElement(webdriver.By.name("password")).sendKeys("123");
   await driver.findElement(webdriver.By.xpath("//input[@value='Login']")).click();
 }
 async function viewAlarmsTest() {
   await driver.get('https://curfewbot-app123.eu-gb.mybluemix.net/viewAlarms.html');
   await driver.findElement(webdriver.By.xpath("//input[@id='myInput']")).sendKeys("3123").keyUp(Key.ENTER);
 }
 async function delay() {
   await driver.get('https://curfewbot-app123.eu-gb.mybluemix.net/index');
 }
