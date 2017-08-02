import {createDropboxMiddleware} from './';

describe('createDropboxMiddleware', () => {
    it('returns the next action', () => {
        const mockStore = null;
        const mockNext = jest.fn();
        mockNext.mockReturnValueOnce("SOME RETURN VALUE")
        const mockAction = {type: "SOME_ACTION"};

        const middleware = createDropboxMiddleware();
        const actual = middleware(mockStore)(mockNext)(mockAction);

        expect(mockNext).toHaveBeenCalledWith(mockAction);
        expect(actual).toEqual("SOME RETURN VALUE");

    });
});

