// Default error that will be used when no error message is found
const DEFAULT_ERROR_MESSAGE = "An unknown error occurred";

interface PocketbaseClientError {
  code: number;
  data: any;
  message: string;
}

const isPocketbaseError = (error: unknown): error is PocketbaseClientError => {
  if (typeof error !== "object" || error === null) return false;

  const keys = ["code", "data", "message"];
  const errorKeys = Object.keys(error);
  return keys.every((key) => errorKeys.includes(key));
};

/**
 * Get an error message from an error
 *
 * @param   error          - Error object/string
 * @param   defaultMessage - Default error message
 */
const getError = (error: unknown, defaultMessage?: string): string => {
  if (!error) {
    return "";
  }

  const errorMessage = getErrorMessage(error);
  if (!errorMessage) {
    return defaultMessage ?? DEFAULT_ERROR_MESSAGE;
  }

  return errorMessage;
};

/**
 * Get an error message from an error
 *
 * @param   error - Error object/string
 */
const getErrorMessage = (error: unknown): string | null => {
  if (!error) {
    return null;
  }

  // Errors are often provided as an object, but the message 'key' may vary
  if (typeof error === "object") {
    const errorObject = error as any;
    // API errors are returned in an interesting nested format
    let message = errorObject.message;
    if (errorObject?.data) {
      message = errorObject.data?.message;
      return Array.isArray(message) ? message[0] : message;
    }

    // 'message' key should always be checked last (most common, likely not set manually)
    if (message) {
      return message;
    }
  }
  // A bare error code may be provided instead of an error object
  else if (typeof error === "string") {
    return error;
  }

  return null;
};

/**
 * Determine whether an error includes a specific error status code number
 *
 * @param   error           - Error object/string
 * @param   targetErrorCode - Target error status code
 */
const hasStatusCode = (error: unknown, targetErrorCode: number): boolean => {
  if (!isPocketbaseError(error)) {
    return false;
  }

  return error.code === targetErrorCode;
};

const useErrors = () => {
  return {
    getError,
    getErrorMessage,
    hasStatusCode,
  };
};

export { useErrors };
