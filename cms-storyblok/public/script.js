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
    const color = colors.find((c) => c.id === detail.id).content;

    const illustration = document.querySelector(".js-illustration");
    illustration.setAttribute("color", color.color_hex);
    illustration.setAttribute("alt-text", color.alt_text);
    illustration.setAttribute("img-path", color.image);
  });
