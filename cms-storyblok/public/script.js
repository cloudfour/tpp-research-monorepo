storyblok.on(["published", "change"], function () {
  location.reload(true);
});

storyblok.pingEditor(function () {
  if (storyblok.inEditor) {
    storyblok.enterEditmode();
  }
});

document
  .querySelector(".js-swatches")
  .addEventListener("colorChanged", ({ detail }) => {
    const illustration = document.querySelector(".js-illustration");
    illustration.setAttribute("color", detail.hex);
    illustration.setAttribute(
      "alt-text",
      `A pair of ${detail.name} socks with the Cloud Four logo repeated in white.`
    );
  });
