const createDropboxMiddleware = () => {
    return store => next => action => {
        return next(action);
    }
};

export default createDropboxMiddleware;
