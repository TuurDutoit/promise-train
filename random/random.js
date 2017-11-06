// Turn:
const val = page.$("div").then($elem => $elem.getProperty("textContent").then(prop => prop.jsonValue()));
// Or:
const $elem = await page.$("div");
const prop = await $elem.getProperty("textContent");
const val = await prop.jsonValue();
// Into:
const val = await page.chain().$("div").getProperty("textContent").jsonValue().exec();