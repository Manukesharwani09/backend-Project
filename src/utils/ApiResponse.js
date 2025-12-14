class ApiResponse {
  constructor(success, message = "Success", data) {
    this.success = statuscode < 400;
    this.message = message;
    this.data = data;
    this.statuscode = statuscode;
    this.success = statuscode < 400;
  }
}

export { ApiResponse };
