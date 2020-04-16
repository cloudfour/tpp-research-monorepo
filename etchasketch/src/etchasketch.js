import htmlSketchApp from "@brainly/html-sketchapp";

const { nodeTreeToSketchPage } = htmlSketchApp;

document.addEventListener("click", () => {
  // node that we want to extract
  const node = document.body;

  // nodeTreeToSketchPage will traverse the DOM tree, call nodeToSketchLayers on each DOM node, and crate a whole Sketch page for you
  const page = nodeTreeToSketchPage(node);

  page.setName("DOM tree to a Sketch page");

  // our page.asketch.json file that can be imported via Sketch plugin
  console.log(page.toJSON());
});
