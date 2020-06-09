/**
 * A wrapper for multiple Errors
 */
export class AggregateError extends Error {
  errors: Error[];

  constructor(errors: Error[]) {
    super();
    this.errors = errors;
    this.name = 'AggregateError';
  }

  toString(): string {
    const message = `AggregateError of:\n${this.errors
      .map((error) =>
        error === this
          ? '[Circular AggregateError]'
          : error instanceof AggregateError
          ? String(error).replace(/\n$/, '').replace(/^/gm, '  ')
          : String(error).replace(/^/gm, '    ').substring(2)
      )
      .join('\n')}\n`;
    return message;
  }
}
