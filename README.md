# vue-guidelines-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



Notes:
Code improvements: 
  - The Vue router was being shared by the tests. By default Vue Router uses hash routing mode, which stores route updates in window.location, so I added a router.push('/') in the render method to initialize the router for each test. Some test were starting in the second screen instead of the first one.
  - I added the search by Pokemon number functionality
  - As the same text input is going to trigger the search by type name and number a feedback is given to the user as the text is being typed, highlighting the matched text in the filtered pokemons attributes (name, type or number).
