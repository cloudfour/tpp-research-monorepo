storyblok.on(["published", "change"], function () {
  location.reload(true);
});

storyblok.pingEditor(function () {
  if (storyblok.inEditor) {
    storyblok.enterEditmode();
  }
});
