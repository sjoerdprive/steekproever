const puppeteer = require("puppeteer");
const chrome = require("chrome-aws-lambda");

const getLinks = async (page, url, depth, maxDepth, baseUrl) => {
  try {
    await page.goto(url);
  } catch {
    return;
  }

  const anchors = await page.$$("a");

  const arr = [];

  await new Promise((resolve, reject) =>
    anchors.forEach((a) => {
      page
        .evaluate((el) => el.getAttribute("href"), a)
        .then((res) => {
          if (res.charAt(0) !== "/") return;
          const fullUrl = baseUrl + res;
          if (depth < maxDepth) {
            arr.concat(getLinks(page, fullUrl, depth + 1, maxDepth, baseUrl));
          }
          arr.push({ baseUrl, path: res, url: fullUrl });
          resolve();
        });
    })
  );

  return arr;
};

export default async function (req, res) {
  const body = JSON.parse(req.body);

  const url = body.url;
  const baseUrl = url.slice(0, -1);

  console.log("baseurl", baseUrl);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const crawlDepth = 2;

  const allLinks = await getLinks(page, url, 0, crawlDepth, baseUrl);

  const uniqueLinks = [...new Set(allLinks)];

  // const featuredPages = uniqueLinks.map(async uniqLink => {
  //   await page.goto(uniqLink.url);
  //   const title = await page.title();

  //   return { ...uniqLink, title: title };
  // })

  browser.close();
  res.status(200).json(uniqueLinks || "no links");
}
