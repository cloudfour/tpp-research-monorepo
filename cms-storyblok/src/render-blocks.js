const StoryblokClient = require("storyblok-js-client");
require("dotenv").config();

let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_KEY,
});

const components = {
  product_page(blok) {
    return `${blok._editable}

    <c4-container>
      <c4-columns has-gutter="true">
        <div class="column--two-thirds">
          <c4-product-illustration alt-text="filler" reference="${
            blok.image
          }"></c4-product-illustration>
        </div>

        <div class="column--one-third">
          <c4-heading>${blok.title}</c4-heading>

          <p>$${blok.price}</p>
        
          <c4-star-rating rating=${blok.rating}></c4-star-rating>

          <p>${blok.description}</p>

          <c4-color-swatches
            radio-name='colors'
            colors-string='${stringifyColors(blok.colors)}'>
          </c4-color-swatches>

          <c4-radio-buttons
            radio-name='sizes'
            options-string='${stringifyOptions(blok.sizes)}'>
          </c4-radio-buttons>

          <c4-columns has-gutter="true">
            <div>
              <c4-stepper
                min="1"
                max="${blok.remaining_count ? blok.remaining_count : null}">
              </c4-stepper>
            </div>

            <div>
              <c4-button>${
                blok.cta_text ? blok.cta_text : "Buy Now"
              }</c4-button>
            </div>
          </c4-columns>
        </div>
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
        .map((block) => {
          if (components[block.component]) {
            return components[block.component](block);
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
  columns(blok) {
    return `${blok._editable}
      <c4-columns has-gutter=${blok.hasGutter}>
        ${blok.columns
          .map((column) => {
            return components.column(column);
          })
          .join("")}
      </c4-columns>`;
  },
  column(blok) {
    return `${blok._editable}
      <div ${blok.width ? `class="column--${blok.width}"` : ""}>

      ${blok.content
        .map((block) => {
          if (components[block.component]) {
            return components[block.component](block);
          }
        })
        .join("")}     
      </div>`;
  },
  text(blok) {
    return `${blok._editable}
      <c4-text>${Storyblok.richTextResolver.render(blok.content)}</c4-text>`;
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

module.exports = {
  renderBlocks(data) {
    var blok = data.story.content;

    if (components[blok.component]) {
      return components[blok.component](blok);
    }
  },
};
