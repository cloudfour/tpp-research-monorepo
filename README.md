# TPP Research Monorepo

This repo is exploring translating components from native web components (Stencil.js) into front end frameworks and design tools.

It currently shows how to use these components in React and FramerX.

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
