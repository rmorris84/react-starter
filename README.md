![](https://i.imgur.com/tOIOJz1.png)

# Simple React Boilerplate

Simple React Boilerplate for my projects.

#### for Development

```
brew install libpng (needed for .jpg images)
npm install
npm run dev
```

#### for Production

```
npm run prod
```

#### for Deploy (using surge)

```
npm install -g surge
npm run build
surge dist <custom-url>.surge.sh
(You may have to create an account)

```

#### Other Commands

```
npm start
npm test
npm run build
npm run test:verbose
npm run lint
npm run lint:fix
```

## Features

* React 16
* Webpack 3 conveniently bundles your code for you.
* Babel lets you use ES6/7 features.
* Hot Module Reloading for JS and CSS makes development quick and easy.
* CSS pre-processor setup for LESS and SASS lets you keep your styles clean and organized.

## Technologies

[React](https://facebook.github.io/react/) - View Library

[React-Router](https://reacttraining.com/react-router/) - Routing Library for React

[Redux](http://redux.js.org/) - State Manager

[Redux-Persist](https://github.com/rt2zz/redux-persist) - Persistent State

[Webpack](https://webpack.github.io/) - Code Packager for React

[Express](http://expressjs.com/) - Node Framework

[Bulma](http://bulma.io/) - CSS Framework

[Material-UI](http://material-ui.com/) - React Element Library

[FontAwesome](http://fontawesome.io/) - Icons

[Ramda](http://ramdajs.com/) - Functional Library

[ESLint](http://eslint.org/) - Code Linter

[Code](https://github.com/hapijs/code) / [Lab](https://github.com/hapijs/lab) - JS Testing Framework

[Enzyme](https://github.com/airbnb/enzyme) - React View Testing
