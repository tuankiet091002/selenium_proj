import {By, Select, until} from "selenium-webdriver";

export const testData = [
    {
        name: "",
        status: "No",
        customInt6: "Yes",
        password: "",
        customInt1: "Yes",
        roleId: "Student",
        enrolPeriod: "",
        expiryNotify: "No",
        expiryThreshold: "0",
        enrolStartDate: "",
        enrolEndDate: "",
        customInt2: "Never",
        customInt3: "0",
        customInt5: "No",
        customInt4: "No",
        customText1: ""
    },
    {
        name: "",
        status: "No",
        customInt6: "Yes",
        password: "",
        customInt1: "Yes",
        roleId: "Student",
        enrolPeriod: "-6",
        expiryNotify: "No",
        expiryThreshold: "0",
        enrolStartDate: "",
        enrolEndDate: "",
        customInt2: "Never",
        customInt3: "0",
        customInt5: "No",
        customInt4: "No",
        customText1: ""
    },
    {
        name: "",
        status: "No",
        customInt6: "Yes",
        password: "",
        customInt1: "Yes",
        roleId: "Student",
        enrolPeriod: "",
        expiryNotify: "No",
        expiryThreshold: "0",
        enrolStartDate: "30/02/2023",
        enrolEndDate: "",
        customInt2: "Never",
        customInt3: "0",
        customInt5: "No",
        customInt4: "No",
        customText1: ""
    },
    {
        name: "",
        status: "No",
        customInt6: "Yes",
        password: "",
        customInt1: "Yes",
        roleId: "Student",
        enrolPeriod: "",
        expiryNotify: "No",
        expiryThreshold: "0",
        enrolStartDate: "02/11/2023",
        enrolEndDate: "01/11/2023",
        customInt2: "Never",
        customInt3: "0",
        customInt5: "No",
        customInt4: "No",
        customText1: ""
    },
]

export async function testFunction(driver, testId) {

    try {
        const test = testData[testId]

        // access main page
        await driver.get("https://school.moodledemo.net/enrol/editinstance.php?courseid=59&id=216&type=self");
        await driver.wait(until.titleContains("Self enrolment"), 1000);
        // Custom instance name
        const instanceName = await driver.findElement(By.id("id_name"))
        await instanceName.clear();
        await instanceName.sendKeys(test.name)
        // Keep current self enrolments active
        await (new Select(await driver.findElement(By.id("id_status")))).selectByVisibleText(test.status)
        // Allow new self enrolments
        if (test.status === "Yes") {
            await (new Select(await driver.findElement(By.id("id_customint6")))).selectByVisibleText(test.customInt6)
        }
        // Enrolment key
        await driver.findElement(By.css("span[data-passwordunmask='displayvalue']")).click()
        const enrolKey = await driver.findElement(By.id("id_password"))
        await enrolKey.clear()
        await enrolKey.sendKeys(test.password)
        // Use group enrolment keys
        await (new Select(await driver.findElement(By.id("id_customint1")))).selectByVisibleText(test.customInt1)
        // Default assigned role
        await (new Select(await driver.findElement(By.id("id_roleid")))).selectByVisibleText(test.roleId)
        // Enrollment duration
        const enrolDurationCheckBox = driver.findElement(By.id("id_enrolperiod_enabled"))
        if (test.enrolPeriod.length) {

            if (!(await enrolDurationCheckBox.isSelected())) {
                await enrolDurationCheckBox.click();
            }
            const enrollPeriod = driver.findElement(By.id("id_enrolperiod_number"))
            await enrollPeriod.clear()
            await enrollPeriod.sendKeys(test.enrolPeriod)
            await (new Select(await driver.findElement(By.id("id_enrolperiod_timeunit")))).selectByVisibleText("days")
        } else {
            if (await enrolDurationCheckBox.isSelected()) {
                await enrolDurationCheckBox.click();
            }
        }
        // Notify before enrolment expires
        await (new Select(await driver.findElement(By.id("id_expirynotify")))).selectByVisibleText(test.expiryNotify)
        // Notification threshold
        if (test.expiryNotify !== "No") {
            const expireNotify = await driver.findElement(By.id("id_expirythreshold_number"))
            await expireNotify.clear();
            await expireNotify.sendKeys(test.expiryThreshold)
            await (new Select(await driver.findElement(By.id("id_expirythreshold_timeunit")))).selectByVisibleText("days")
        }
        // Start date
        const enrolStartDateCheckbox = driver.findElement(By.id("id_enrolstartdate_enabled"))
        if (test.enrolStartDate.length) {
            if (!(await enrolStartDateCheckbox.isSelected())) {
                await enrolStartDateCheckbox.click();
            }
            const fullDate = test.enrolStartDate.split("/");
            await (new Select(await driver.findElement(By.id("id_enrolstartdate_day")))).selectByValue(parseInt(fullDate[0]).toString())
            await (new Select(await driver.findElement(By.id("id_enrolstartdate_month")))).selectByValue(parseInt(fullDate[1]).toString())
            await (new Select(await driver.findElement(By.id("id_enrolstartdate_year")))).selectByValue(parseInt(fullDate[2]).toString())
            await (new Select(await driver.findElement(By.id("id_enrolstartdate_hour")))).selectByValue("0")
            await (new Select(await driver.findElement(By.id("id_enrolstartdate_minute")))).selectByValue("0")
        } else {
            if (await enrolStartDateCheckbox.isSelected()) {
                await enrolStartDateCheckbox.click();
            }
        }
        // End date
        const enrolEndDateCheckbox = driver.findElement(By.id("id_enrolenddate_enabled"))
        if (test.enrolEndDate.length) {
            if (!(await enrolEndDateCheckbox.isSelected())) {
                await enrolEndDateCheckbox.click();
            }
            const fullDate = test.enrolEndDate.split("/");
            await (new Select(await driver.findElement(By.id("id_enrolenddate_day")))).selectByValue(parseInt(fullDate[0]).toString())
            await (new Select(await driver.findElement(By.id("id_enrolenddate_month")))).selectByValue(parseInt(fullDate[1]).toString())
            await (new Select(await driver.findElement(By.id("id_enrolenddate_year")))).selectByValue(parseInt(fullDate[2]).toString())
            await (new Select(await driver.findElement(By.id("id_enrolenddate_hour")))).selectByValue("0")
            await (new Select(await driver.findElement(By.id("id_enrolenddate_minute")))).selectByValue("0")
        } else {
            if (await enrolEndDateCheckbox.isSelected()) {
                await enrolEndDateCheckbox.click();
            }
        }
        // Unenrol inactive after
        await (new Select(await driver.findElement(By.id("id_customint2")))).selectByVisibleText(test.customInt2)
        // Max enrolled users
        const maxEnrol = await driver.findElement(By.id("id_customint3"))
        await maxEnrol.clear()
        await maxEnrol.sendKeys(test.customInt3)
        // Only cohort members
        await (new Select(await driver.findElement(By.id("id_customint5")))).selectByVisibleText(test.customInt5)
        // Send course welcome message
        await (new Select(await driver.findElement(By.id("id_customint4")))).selectByVisibleText(test.customInt4)
        // Custom welcome message
        const welcomeMessage = await driver.findElement(By.id("id_customtext1"))
        await welcomeMessage.clear()
        await welcomeMessage.sendKeys(test.customText1)

        // Save
        await driver.findElement(By.id("id_submitbutton")).click();
    } catch (err) {
        console.log("Test case failed:")
        console.log(err)
    }
}
