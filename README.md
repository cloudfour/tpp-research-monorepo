# TPP Research Monorepo

This repo is exploring translating components from native web components (Stencil.js) into front end frameworks, documentation tools, and design tools.

It currently shows how to use these components in React, Express, Vue, FramerX, and StoryBook.

## Local Development Approach

In the long run we'll likely want to publish a number of packages to a package registry:

- Vanilla Web Components
- React Components
- Vue Components
- FramerX Components

Individual projects can then easily install and reference the relevant components. However, this approach would slow down local development. For now, all files are referenced locally in between directories. A few hacks are required to make this work, but it should speed up local development.

## Component Development

The core of the project is a stencil.js directory. To develop these components run the following command:

```zsh
# Navigate to the `stencil-components` repo
cd stencil-components

# Run and watch a stencil JS server
npm start
```

## Base.css

Many components rely on the inclusion of `base.css` for styling. `base.css` defines a number of custom properties which are referenced in component CSS. This makes the components easier to maintain and theme. Theming can be achieved by overriding these custom properties like so:

```css
:root {
  --font-brand: "Georgia";

  --color-white: #eee;
  --color-dark: rgba(40, 0, 0, 0.85);
  --color-brand: #f00;
  --color-focus: #8abfff;

  --color-background: var(--color-white);
  --color-text: var(--color-dark);
}
```

_(This is not a pretty theme.)_

In addition to theming, `base.css` will also provide some basic browser resets, and utility classes. The details on this are fuzzy at the moment. In the long run they may be separated into separate CSS files.

## Converting Stencil Components to Other Formats

This repo is set up to export Stencil components to a variety of output targets

### Building React Components

This project uses Stencil's `@stencil/react-output-target` plugin to generate React wrappers for components. Building these components is a two step process:

1. Building the output of our `stencil-components` directory which adds files to our `react-components` directory
2. Building the output of our `react-components` directory with the new files from `stencil-components`

### Copying Files For Our Express App

We copy our stencil components into our Express app's `public` directory so we can access them from our app.

### Building All Components

From the project root you can build Stencil components, convert them to React components, and populate our Express app in a single command: `npm run build`.

## Building an Express App

After running `npm run build` you can develop the Express app by running the following commands:

```zsh
# Navigate to the `express-app` repo
cd express-app

# Run and watch a Express server
npm start
```

## Building a React Site

Our React componemts are consumed by a simple React app. After building our react components you can develop this site by running the following commands:

```zsh
# Navigate to the `react-app` repo
cd react-app

# Run and watch a React server
npm start
```

## Building a Vue Site

Unfortunately there's no way to automatically wrap web components in Vue components, so if you want the Vue syntax you'll need to manually wrap your web components as Vue components.

Luckily, Vue works well with web components, so it doesn't take a ton of work to create wrappers. You can see some examples in our Vue app. To run the Vue app, run the following commands:

```zsh
# Navigate to the `vue-app` repo
cd vue-app

# Run and watch a Vue server
npm run dev
```

## Designing with Components in FramerX

Framer X allows us to import these same React components and use them in a graphical editor.

Each component we want to use needs a special Framer X wrapper to allow us to import the component and interact with its props.

Unfortunately there's currently an additional manual step to allow our react components to be used in Framer X.

After building our React components, navigate to `react-components/dist/components.js` and update the following import statement:

`../../stencil-components/loader` --> `../../stencil-components/loader/index.cjs.js`

I think there's a disconnect between TypeScript and JavaScript imports here. I'm sure there's a solution, but I haven't dug into it yet.

After building the components and making that change you should be able to open the `components.framerfx` file in Framer X and begin designing with components.

## Viewing Components in Storybook

The web components are also documented in storybook. After running the `stencil-components` project, or running `npm build-components` Storybook should
be ready to document these components. To launch storybook run the following
commands

```zsh
# Navigate to the `storybook` repo
cd storybook

# Run and watch a Storybook server
npm run storybook
```
