var renderBlocks = null;
var components = {};

// Get the JSON of "home" from Storyblok
var loadStory = function () {
  // The url path of the browser can define which story/content entry you get form the api
  // In the root path of your website you receive the content entry with the slug "home"
  var path =
    window.location.pathname == "/" ? "home" : window.location.pathname;

  window.storyblok.get({ slug: path, version: "draft" }, function (data) {
    renderBlocks(data);
  });
};
loadStory();

// Listen to changes of the content
window.storyblok.on("change", function () {
  loadStory();
});
window.storyblok.on("published", function () {
  loadStory();
});

// Simple rendering engine
renderBlocks = function (data) {
  var blok = data.story.content;
  console.log(blok);
  console.log(blok.component);

  var contentDiv = document.querySelector(".content");
  contentDiv.innerHTML = "";
  if (components[blok.component]) {
    contentDiv.insertAdjacentHTML(
      "beforeend",
      components[blok.component](blok)
    );
  }

  // Enter editmode after rendering
  window.storyblok.tryEditmode();
};

components = {
  body(blok) {
    return `${blok._editable}
    ${blok.blocks
      .map((column) => {
        if (components[column.component]) {
          return components[column.component](column);
        }
      })
      .join("")}`;
  },
  container(blok) {
    let classes = "";

    if (blok.isDarkTheme) {
      classes += 'container-class="dark"';
    }

    return `${blok._editable}
    <c4-container ${classes}>
      ${blok.blocks
        .map((column) => {
          if (components[column.component]) {
            return components[column.component](column);
          }
        })
        .join("")}
      </c4-container>
      `;
  },
  heading(blok) {
    return `${blok._editable}
      <c4-heading>${blok.text}</c4-heading>`;
  },
  button(blok) {
    return `${blok._editable}
      <c4-button>${blok.text}</c4-button>`;
  },
  rating(blok) {
    return `${blok._editable}
      <c4-star-rating rating=${blok.rating}></c4-star-rating>`;
  },
};
