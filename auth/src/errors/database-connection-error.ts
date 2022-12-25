
export class DatabaseConnectionError extends Error {
	reasons = "Error connecting to the database";
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}