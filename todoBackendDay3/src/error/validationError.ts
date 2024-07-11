import CustomError from './customError';

class ValidationError extends CustomError {
  constructor(message: string, details: any) {
    super(message, 400);
    this.details = details;
  }

  details: any;
}

export default ValidationError;
