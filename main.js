import {Browser, Builder, By, Key, until} from "selenium-webdriver";
import promptSync from 'prompt-sync';

import * as viewCourseList from "./tests/viewCourseList.js";
import * as selfEnrolment from "./tests/selfEnrolmentCofig.js";

async function loginAsTeacher(driver) {
    try {
        await driver.get('https://school.moodledemo.net/login/index.php');
        await driver.wait(until.titleContains('Log in to the site'), 1000);
        await driver.findElement(By.name("username")).sendKeys('teacher');
        await driver.findElement(By.name("password")).sendKeys('moodle', Key.RETURN);
    } catch (err) {
        console.log("Log in failed: ")
        console.log(err)
    }
}

const useCaseData = [
    viewCourseList, selfEnrolment
]

// main function
async function main() {
    // global driver
    const driver = new Builder().forBrowser(Browser.EDGE).build();
    const prompt = promptSync();

    try {
        console.log("////////// CHOOSE ONE MODULE //////////")
        console.log("1. View Courses List")
        console.log("2. Self Enrollment Configuration")

        const testName = prompt("Pick a number: ")
        const useCase = useCaseData[parseInt(testName) - 1]

        const testId = prompt(`Pick a test case [1-${useCase.testData.length}]: `)

        //// RUN TEST
        // auto login
        await loginAsTeacher(driver);

        await useCase.testFunction(driver, testId - 1)

    } catch {
        console.log("Wrong syntax")
    } finally {
        // driver.quit();
    }
}

main().then(() => console.log('////////// DONE //////////'));





