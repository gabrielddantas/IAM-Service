export const ErrorMessages = {
  REQUIRED_FIELD: (field: string) => `The field '${field}' is required`,
  MAX_LENGTH_EXCEEDED: (field: string, max: number) =>
    `The field '${field}' exceeds the maximum length of ${max} characters`,
  MIN_LENGTH_NOT_MET: (field: string, min: number) =>
    `The field '${field}' must be at least ${min} characters long`,
  INVALID_FORMAT_FIELD: (field: string) =>
    `The field '${field}' has an invalid format`,
};
