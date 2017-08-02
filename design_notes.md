# Design Notes

Needed:
    DROPBOX_CLIENT_ID
    REDIRECT_URL (Maybe this is not needed if we always check for hash on load?)
    DEBOUNCE_DELAY
    STATE_KEY
Optional
    Transform state to Dropbox File
    Transform Dropbox File to state
    isDirty = (oldState, newState) => boolean?

User accessible state (maybe these are just selectors?):
    dirty
    fetching
    uploading
    loggedIn

User accessible actions
    {type: LOGIN_TO_DROPBOX, redirect_url: string}
    {type: FORCE_UPLOAD}
    {type: FORCE_DOWNLOAD}
    {type: LOGOUT_OF_DROPBOX}

Flow:
    User loads page
        {dirty: null, fetching: null, uploading: null, loggedIn: false}
    App dispatches action to log in the user
    Middleware redirects them to dropbox auth
    User loads page with hash
    Middleware notices
    Stores API TOKEN
        {dirty: null, fetching: false, uploading: false, loggedIn: true}
    Begins fetch of state from Dropbox
        {dirty: null, fetching: true, uploading: false, loggedIn: true}
    Sets state with response from dropbox (or error)
        {dirty: false, fetching: false, uploading: false, loggedIn: true}
    Waits for update to Dropbox managed state
        {dirty: true, fetching: false, uploading: false, loggedIn: true}
    If dirty
        Schedules a debounced upload
        Starts uploading
        {dirty: true, fetching: false, uploading: true, loggedIn: true}
        Upload complete
        {dirty: false, fetching: false, uploading: false, loggedIn: true}
    User logs out
        {dirty: null, fetching: null, uploading: null, loggedIn: false}