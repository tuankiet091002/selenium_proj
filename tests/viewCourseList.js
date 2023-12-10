import {By, until} from "selenium-webdriver";

export const testData = [
    {
        groupingDropdown: "In progress",
        search: "a",
        sortingDropdown: "Sort by course name",
        displayDropdown: "Card",
        pagingOption: "12"
    },
    {
        groupingDropdown: "In progress",
        search: "dawdwawad",
        sortingDropdown: "Sort by course name",
        displayDropdown: "Card",
        pagingOption: "12"
    },
    {
        groupingDropdown: "Future",
        search: "",
        sortingDropdown: "Sort by course name",
        displayDropdown: "Card",
        pagingOption: "12"
    },
    {
        groupingDropdown: "In progress",
        search: "",
        sortingDropdown: "Sort by last accessed",
        displayDropdown: "Summary",
        pagingOption: "12"
    },
]

export async function testFunction(driver, testId) {

    try {
        const data = testData[testId]

        // access main page
        await driver.get("https://school.moodledemo.net/my/courses.php");
        await driver.wait(until.titleContains("My courses"), 1000);

        // choose grouping option
        await driver.findElement(By.id("groupingdropdown")).click();
        await driver.findElement(By.linkText(data.groupingDropdown)).click();

        // enter search query
        await driver.findElement(By.name("search")).sendKeys("a")

        // choose sorting option
        await driver.findElement(By.id("sortingdropdown")).click();
        await driver.findElement(By.linkText(data.sortingDropdown)).click();

        // choose display option
        await driver.findElement(By.id("displaydropdown")).click();
        await driver.findElement(By.linkText(data.displayDropdown)).click();

        // choose paging option
        try {
            await driver.findElement(By.css(".btn-group>.btn")).click();
        } catch {
            await driver.findElement(By.css(".btn-group>.btn")).click();
        }
        await driver.findElement(By.linkText(data.pagingOption)).click();
    } catch (err) {
        console.log("Test case failed:")
        console.log(err)
    }
}

