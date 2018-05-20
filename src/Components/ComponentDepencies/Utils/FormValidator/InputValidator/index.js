export default {
  validateNameField: (value) => {
    let hasError = false;
    let error = '';
    if (!value) {
      error = 'This field is required';
      hasError = true;
    } else {
      error = '';
      hasError = false;
    }

    return { hasError, error };
  },
  validatePasswordField: (value) => {
    let hasError = false;
    let error = '';
    if (!value) {
      error = 'This field is required';
      hasError = true;
    } else {
      error = '';
      hasError = false;
    }

    return { hasError, error };
  }
}
