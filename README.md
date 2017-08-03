[![Build
Status](https://travis-ci.org/captbaritone/redux-dropbox-middleware.svg?branch=master)](https://travis-ci.org/captbaritone/redux-dropbox-middleware)

# Redux Dropbox Middleware

Work in progress

## Usage

Sketching out how it might be used:

```JavaScript
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {
    createDropboxMiddleware,
    dropboxReducer,
    wrapDropboxState,
    DropboxActionCreators
} from 'redux-dropbox-middleware';

import todosReducer from './reducers';
import initialState from './initialState';

const reducer = combineReducers({
    // Allow Dropbox middleware to write to this portion of the state.
    todos: wrapDropboxState(todosReducer),
    dropbox: dropboxReducer
});

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
        createDropboxMiddleware({
            // Options
        })
    )
);

store.dispatch(DropboxActionCreators.login());

```


## Development

1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Run linter: `npm run lint`
4. Fix lint errors: `npm run fix`
