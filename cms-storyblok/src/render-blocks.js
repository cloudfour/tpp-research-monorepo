const StoryblokClient = require("storyblok-js-client");
require("dotenv").config();

let Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_KEY,
});

const components = {
  product_page(blok) {
    return `${blok._editable}

    <c4-container>
      <c4-details-lockup>
        <div slot="header">
          <c4-text>
            <h1>${blok.title}</h1>

            <p>$${blok.price}</p>
          
            <c4-star-rating rating=${blok.rating}></c4-star-rating>

            <p>${blok.description}</p>

          </c4-text>
        </div>

        <div slot="content">
          <c4-product-illustration 
            alt-text="${blok.colors[0].content.alt_text}" 
            img-path="${blok.colors[0].content.image}"
            color="${blok.colors[0].content.color_hex}"
            class="js-illustration"
          ></c4-product-illustration>
        </div>

        <div slot="footer">
          <c4-text>
            <h2 class="c4-size-1">Colors</h2>

            <c4-color-swatches
              class="js-swatches"
              radio-name='colors'
              colors-string='${stringifyColors(blok.colors)}'>
            </c4-color-swatches>

            <h2 class="c4-size-1">Sizes</h2>

            <c4-radio-buttons
              radio-name='sizes'
              options-string='${stringifyOptions(blok.sizes)}'>
            </c4-radio-buttons>

            <h2 class="c4-size-1">Quantity</h2>

            <c4-stepper
              min="1"
              max="${blok.remaining_count ? blok.remaining_count : null}">
            </c4-stepper>

            <c4-button>${blok.cta_text ? blok.cta_text : "Buy Now"}</c4-button>
          </c4-text>
        </div>
    </c4-container>

    ${blok.blocks
      .map((column) => {
        if (components[column.component]) {
          return components[column.component](column);
        }
      })
      .join("")}
      
      
    <script>
      const colors = ${JSON.stringify(blok.colors)}
    </script>`;
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
            return {
              hex: data.content.color_hex,
              id: data.id,
              name: data.content.color_name,
            };
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
