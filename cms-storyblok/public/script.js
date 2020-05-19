var renderBlocks = null;
var components = {};

// Get the JSON of "home" from Storyblok
var loadStory = function () {
  // The url path of the browser can define which story/content entry you get form the api
  // In the root path of your website you receive the content entry with the slug "home"
  var path =
    window.location.pathname == "/" ? "home" : window.location.pathname;

  window.storyblok.get(
    {
      slug: path,
      version: "draft",
      resolve_relations: ["colors", "sizes"],
    },
    function (data) {
      renderBlocks(data);
    }
  );
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
  product_page(blok) {
    console.log(blok);
    return `${blok._editable}

    <c4-container>
      <c4-heading>${blok.title}</c4-heading>

      <p>$${blok.price}</p>
    
      <c4-star-rating rating=${blok.rating}></c4-star-rating>

      <p>${blok.description}</p>

      <c4-product-illustration alt-text="filler" reference="${
        blok.image
      }" color="${blok.colors[0].content.hex}"></c4-product-illustration>

      <c4-color-swatches
        radio-name='colors'
        colors-string='${stringifyColors(blok.colors)}'>
      </c4-color-swatches>

      <c4-radio-buttons
        radio-name='sizes'
        options-string='${stringifyOptions(blok.sizes)}'>
      </c4-radio-buttons>

      <c4-stepper
        min="1"
        max="${blok.remaining_count ? blok.remaining_count : null}">
      </c4-stepper>

      <c4-button>${blok.cta_text ? blok.cta_text : "Buy Now"}</c4-button>
    </c4-container>

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
      classes += 'is-dark="true"';
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
      <c4-heading tag="${blok.tag}">${blok.text}</c4-heading>`;
  },
  button(blok) {
    return `${blok._editable}
      <c4-button>${blok.text}</c4-button>`;
  },
  rating(blok) {
    return `${blok._editable}
      <c4-star-rating rating=${blok.rating}></c4-star-rating>`;
  },
  swatches(blok) {
    return `${blok._editable}
      <c4-color-swatches
        radio-name='${blok.radio_name}'
        colors-string='${stringifyColors(blok.colors)}'>
      </c4-color-swatches>`;
  },
};

function stringifyColors(colorData) {
  try {
    return colorData
      ? JSON.stringify(
          colorData.map((data) => {
            const { hex, id, name } = data.content;
            return { hex, id, name };
          })
        )
      : "";
  } catch {}
}

function stringifyOptions(optionsData) {
  console.log(optionsData);
  try {
    return optionsData
      ? JSON.stringify(
          optionsData.map((data) => {
            const { id, name } = data.content;
            return { id, name };
          })
        )
      : "";
  } catch {}
}
