function isValidTitle(value: string) {
  return value && value.trim().length > 0 && value.trim().length <= 30;
}

function isValidAmount(value: number) {
  // const amount = parseFloat(value);
  return !isNaN(value) && value > 0;
}

function isValidDate(value: string) {
  return value && new Date(value).getTime() < new Date().getTime();
}

export function validateExpenseInput(input: {
  title: string;
  amount: number;
  date: string;
}) {
  let validationErrors: { [key: string]: string } = {};

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      "Invalid expense title. Must be at most 30 characters long.";
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount =
      "Invalid amount. Must be a number greater than zero.";
  }

  if (!isValidDate(input.date)) {
    validationErrors.date = "Invalid date. Must be a date before today.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

const emailExpression: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

export function isValidEmail(value: string) {
  return value && emailExpression.test(value);
}

function isValidPassword(value: string) {
  return value && value.trim().length > 5;
}

export function validateCredentials(email: string, password: string) {
  let validationErrors: { [key: string]: string } = {};

  if (!isValidEmail(email)) {
    validationErrors.email = "Invalid email address.";
  }

  if (!isValidPassword(password)) {
    validationErrors.password =
      "Invalid password. Must be at least 6 characters.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
