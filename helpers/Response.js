class Response {
  static handleErrors (err) {
    return {
      lineNumber: err.lineNumber,
      fileName: err.fileName,
      message: err.message
    }
  }
};

export default Response;