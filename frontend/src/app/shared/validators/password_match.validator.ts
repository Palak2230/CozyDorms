import { FormGroup, ValidatorFn } from '@angular/forms';

export const PasswordsMatchValidator = (formGroup: FormGroup) => {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmpassword');

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
    // Return if another validator has already found an error on the confirmPasswordControl
    return null;
  }

  if (passwordControl.value !== confirmPasswordControl.value) {
    confirmPasswordControl.setErrors({ passwordMismatch: true });
  } else {
    confirmPasswordControl.setErrors(null); // Clear the error when passwords match
  }
  
  return null; // Always return null as we are setting the error directly on the control
};
