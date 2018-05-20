import InputValidator from './InputValidator';

export default {
  validateLoginForm: ({ name, password }) => {
    const nameStatus = InputValidator.validateNameField(name);
    const passwordStatus = InputValidator.validatePasswordField(password);

    const errors = {
      name: nameStatus.error,
      password: passwordStatus.error,
    };

    const hasErrors = (
      nameStatus.hasError ||
      passwordStatus.hasError
    );

    return { errors, hasErrors };
  }
};