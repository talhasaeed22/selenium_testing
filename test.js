const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { By } = require('selenium-webdriver');

function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
const test = async () => {
    const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build();
    console.log('Loading Webpage');
    await driver.get(`http://localhost:3000`);

    console.log('1- Testing the loading of application');
    const title = await driver.getTitle();
    // console.log(title == "Node To Do Application");
    console.log(title == 'Pendings');

    console.log('2- Checking if tasks are pending');
    let initial_task = await driver.findElements(By.css('.taskrows'));
    console.log(initial_task.length == 0);

    console.log('3- Adding a new pending');
    let added_tasksUpdated1 = await driver.findElements(By.css('.taskrows'));
    await driver.findElement(By.css('#input')).sendKeys('New Pending Added');
    await driver.findElement(By.css('#addbtn')).click();
    await wait(2000);
    let added_tasksUpdated2 = await driver.findElements(By.css('.taskrows'));
    // console.log(added_tasksUpdated1.length);
    // console.log(added_tasksUpdated2.length);
    console.log(added_tasksUpdated2.length == added_tasksUpdated1.length + 1);

    console.log('4- Delete a task');
    let deletebuttons = await driver.findElements(By.css('.delete-button'));
    await deletebuttons[deletebuttons.length - 1].click();
    // await driver.findElement(By.css('#input')).sendKeys('Input added');
    // await driver.findElement(By.css()).click();
    await wait(2000);
    let deleted_tasksUpdated3 = await driver.findElements(By.css('.taskrows'));
    // console.log(added_tasksUpdated1.length);
    // console.log(added_tasksUpdated2.length);
    console.log(deleted_tasksUpdated3.length == added_tasksUpdated2.length - 1);

};
test();
