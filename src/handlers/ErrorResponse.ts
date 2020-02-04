class ErrorResponse extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.status = status;
  }
}

export default ErrorResponse;
