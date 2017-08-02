export const actionCreators = {};

export const selectors = {};

const defaultState = {};
export const dropboxReducer = (lastState = defaultState, action) => {
  switch (action.type) {
    default:
      return lastState;
  }
};

export const createDropboxMiddleware = () => {
  return store => next => action => {
    return next(action);
  };
};
