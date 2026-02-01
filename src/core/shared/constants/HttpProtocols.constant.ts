export class HttpProtocols {
  private constructor() {}

  public static HTTP_STATUS_RETURN = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  };

  public static HTTP_METHODS = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch",
  };

  public static CONTENT_TYPE = {
    JSON: "application/json",
    FORM_URLENCODED: "application/x-www-form-urlencoded",
    MULTIPART_FORM_DATA: "multipart/form-data",
    TEXT_PLAIN: "text/plain",
  };
}
