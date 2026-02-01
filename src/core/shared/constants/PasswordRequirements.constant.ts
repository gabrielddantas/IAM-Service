export const PASSWORD_REQUIREMENTS = {
  minLength: {
    length: 5,
  },
  minUpperCase: {
    length: 1,
    regex: /[A-Z]/g,
  },
  minNumbers: {
    length: 1,
    regex: /[0-9]/g,
  },
  minSpecialChars: {
    length: 1,
    regex: /[\W_]/g,
  },
};
