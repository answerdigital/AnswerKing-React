# React Boilerplate

This boilerplate was generated using [vitejs](https://vitejs.dev/) instead of [Create React App](https://create-react-app.dev/). Most of the tutorials online will probably mention CRA, any setup steps will not be applicable to this project but the React parts should be.

## CSS

You can add SCSS via `index.scss` or import them in your `.tsx` files as CSS Modules. Have a look at `src/pages/CatFacts` for an example of using [CSS modules](https://css-tricks.com/css-modules-part-1-need/).

## API

If you are running your API locally, you will need to configure vite to proxy any requests to `/api` to your server. Check out `vite.config.ts`, it should have a place for you to put the address of your API server.

## LINT

Install extension ESLint. Enter 'npm run lint' to get a error list in the terminal.
To disable rule on next line comment '// eslint-disable-next-line' followed by the rule name e.g '// eslint-disable-next-line no-alert'.
See .eslintrc.jc for rules.
To fix all lint errors 'npm run lint -- --fix'
https://eslint.org/docs/latest/rules/
