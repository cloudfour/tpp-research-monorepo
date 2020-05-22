const express = require("express");
const path = require("path");
const fs = require("fs");
const StoryblokClient = require("storyblok-js-client");
const app = express();
const { renderBlocks } = require("./src/render-blocks");
require("dotenv").config();

const layoutHtml = fs.readFileSync("./src/layout.html", {
  encoding: "utf8",
  flag: "r",
});

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_KEY,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

function buildPage(slug) {
  return Storyblok.get(`cdn/stories/${slug}`, {
    version: "draft",
    resolve_relations: "product_page.colors,product_page.sizes",
  })
    .then((response) => {
      const content = renderBlocks(response.data);
      return layoutHtml.replace("{{content}}", content);
    })
    .catch((error) => {
      console.log(error);
      return "404";
    });
}

app.use(express.static(path.join(__dirname, "public")));

app.get("/:slug", async function (req, res) {
  res.type("html");
  res.status(200).send(await buildPage(req.params.slug));
});

const port = 8080;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
