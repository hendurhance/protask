import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Defines an HTTP exception for *Not Found* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
export class NotOwnedException extends HttpException {
    /**
     * Instantiate a `NotOwnedException` Exception.
     *
     * @example
     * `throw new NotOwnedException()`
     *
     * @usageNotes
     * The HTTP response status code will be 403.
     * - The `objectOrError` argument defines the JSON response body or the message string.
     * - The `descriptionOrOptions` argument contains either a short description of the HTTP error or an options object used to provide an underlying error cause.
     *
     * By default, the JSON response body contains two properties:
     * - `statusCode`: this will be the value 403.
     * - `message`: the string `'Forbidden'` by default; override this by supplying
     * a string in the `message` parameter.
     *
     * If the `message` parameter is not provided, the default message will be used.
     *
     * @param message Optional message describing the error condition.
     */
    constructor(message?: string) {
        super(message || 'Not Owned', HttpStatus.FORBIDDEN);
    }
}
