# TPP Research Monorepo

This repo is exploring translating components from native web components (Stencil.js) into front end frameworks, documentation tools, and design tools.

It currently shows how to use these components in React, FramerX, and StoryBook.

## Local Development Approach

In the long run we'll likely want to publish a number of packages to a package registry:

- Stencil Components
- React Components
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

## Converting the Components to React Components

This project uses Stencil's `@stencil/react-output-target` plugin to generate React wrappers for components. Building these components is a two step process:

1. Building the output of our `stencil-components` directory which adds files to our `react-components` directory
2. Building the output of our `react-components` directory with the new files from `stencil-components`

From the project root you can achieve this in a single command: `npm run build-components`.

## Building a React Site

These components are then consumed by a simple React app. After building our react components you can develop this site by running the following commands:

```zsh
# Navigate to the `my-react-app` repo
cd my-react-app

# Run and watch a React server
npm start
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
