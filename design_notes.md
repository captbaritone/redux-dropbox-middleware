# Design Notes

API visible to the user:

1. A reducer. This will manage the state of our interactions with Dropbox.
2. Some selectors. These will allow the user to access values from our portion
   of the state. (Are we logged in? Are we saving?)
3. A middleware creator. This function will take the user's configuration
   options and return a middleware for them to apply.
4. Some action creators for the user to dispatch actions which our middleware
   will handle. (login, logout, etc)


* Config options:
    * DROPBOX_CLIENT_ID
    * REDIRECT_URL (Maybe this is not needed if we always check for hash on load?)
    * DEBOUNCE_DELAY
    * STATE_KEY
    * Optional
        * Transform state to Dropbox File
        * Transform Dropbox File to state
        * isDirty = (oldState, newState) => boolean?

* Selectors:
    * dirty
    * fetching
    * uploading
    * loggedIn

* Action creators return these actions:
    * {type: LOGIN_TO_DROPBOX, redirectUrl: string}
    * {type: FORCE_UPLOAD}
    * {type: FORCE_DOWNLOAD}
    * {type: LOGOUT_OF_DROPBOX}

* Internal-only actions:
    * {type: SET_AUTH_TOKEN, authToken: string}
    * {type: FETCH_INITIATED}
    * {type: FETCH_COMPLETE, error: string?}
    * {type: MARK_DIRTY}
    * {type: UPLOAD_INITIATED}
    * {type: UPLOAD_COMPLETE, error: ?string}
    * TBD??

* Flow (An example app lifecycle documenting the expected state each time it
changes:
    * User loads page
        * {dirty: null, fetching: null, uploading: null, loggedIn: false}
    * App dispatches action to log in the user
    * Middleware redirects them to dropbox auth
    * User loads page with hash
    * Middleware notices
    * Stores API TOKEN
        * {dirty: null, fetching: false, uploading: false, loggedIn: true}
    * Begins fetch of state from Dropbox
        * {dirty: null, fetching: true, uploading: false, loggedIn: true}
    * Sets state with response from dropbox (or error)
        * {dirty: false, fetching: false, uploading: false, loggedIn: true}
    * Waits for update to Dropbox managed state
        * {dirty: true, fetching: false, uploading: false, loggedIn: true}
    * If dirty
        * Schedules a debounced upload
        * Starts uploading
        * {dirty: true, fetching: false, uploading: true, loggedIn: true}
        * Upload complete
        * {dirty: false, fetching: false, uploading: false, loggedIn: true}
    * User logs out
        * {dirty: null, fetching: null, uploading: null, loggedIn: false}
