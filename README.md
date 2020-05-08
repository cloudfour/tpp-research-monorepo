# TPP Research Monorepo

This repo is exploring translating components from native web components (Stencil.js) into front end frameworks, documentation tools, and design tools.

The goal is to show how patterns and components can be shared and reused through every step of the web publishing process. Designers, developers, and content authors can all leverage the same shared components as they work.

## Developers

Components are written as web components using Stencil JS. These web components can then be easily translated into a number of frameworks and front-end environments. This repo shows how to use these components in the following contexts:

- A React app
- A Vue app
- An Angular app
- A vanilla JS Express app

## Designers

These same components can be used in design tools allowing you to design with our prebuilt components. Currently components have only been translated for use in Framer X.

## Content Authors

These components can also be used to give content authors high fidelity previews of the content they're editing from within their CMS. Currently this has only been set up for Storyblok.

## Documentation

All of these different stakeholders can also find information about these components in a single source of truth. The raw web components are documented in a Storybook instance.

# Technical Implementation

This monorepo houses code showing how to enable all the integrations mentioned above. Most code is written using various front-end frameworks, JS, HTML, and CSS.

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

## CSS Output

Most of our stencil component CSS is defined within our custom elements but a few CSS files are provided to improve the styling and allow theming of these components.

- **document-styles.css** — This file applies some base styles to your document so its styles will match our component styles
- **custom-props.css** — This file defines custom props which are referenced within the shadow DOM CSS of our custom elements.
-- **theme-example.css** — This file is an (ugly) example of overriding the custom props defined above to theme our components.

Down the road there will also likely be a CSS file outputting utility classes which can be applied to components to control component base sizes and other styling.

## Fonts

_TODO: Set up system to share fonts between projects._

## Converting Stencil Components to Other Formats

This repo is set up to export Stencil components to a variety of output targets

### Building React Components

This project uses Stencil's `@stencil/react-output-target` plugin to generate React wrappers for components. Building these components is a two step process:

1. Building the output of our `stencil-components` directory which adds files to our `react-components` directory
2. Building the output of our `react-components` directory with the new files from `stencil-components`

### Building Angular Components

This project uses Stencil's `@stencil/angular-output-target` plugin to generate Angular wrappers for components. Building these components is a two step process:

1. Building the output of our `stencil-components` directory which adds files to our `angular-components` directory
2. Building the output of our `angular-components` directory with the new files from `stencil-components`

### Copying Files For Our Express App

We copy our stencil components into our Express app's `public` directory so we can access them from our app.

### Building All Components

From the project root you can build Stencil components, convert them to React components, and populate our Express app in a single command: `npm run build`.

**Note:** Before this command to work you'll need to have installed dependencies in the following subdirectories (`npm ci`):
- `angular-components`
- `react-components`
- `stencil-components`

## Building an Express App

After running `npm run build` you can develop the Express app by running the following commands:

```zsh
# Navigate to the `express-app` repo
cd express-app

# Install dependencies
npm ci

# Run and watch a Express server
npm start
```

## Building a React Site

Our React components are consumed by a simple React app. After building our React components you can develop this site by running the following commands:

```zsh
# Navigate to the `react-app` repo
cd react-app

# Install dependencies
npm ci

# Run and watch a React server
npm start
```

## Building an Angular Site

Our Angular components are consumed by a simple Angular app. After building our Angular components you can develop this site by running the following commands:

```zsh
# Navigate to the `angular-app` repo
cd angular-app

# Install dependencies
npm ci

# Run and watch an Angular server
npm start
```

## Building a Vue Site

Unfortunately there's no way to automatically wrap web components in Vue components, so if you want the Vue syntax you'll need to manually wrap your web components as Vue components.

Luckily, Vue works well with web components, so it doesn't take a ton of work to create wrappers. You can see some examples in our Vue app. To run the Vue app, run the following commands:

```zsh
# Navigate to the `vue-app` repo
cd vue-app

# Install dependencies
npm ci

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

# Install dependencies
npm ci

# Run and watch a Storybook server
npm run storybook
```

## Editing Content in Storyblok

These components have been hooked up to a Storyblok CMS instance. These components are used to show a high fidelity preview of the rendered pages as they edit content.

In order to actually test this out you'll need to have an account with access to our Storyblok instance.
