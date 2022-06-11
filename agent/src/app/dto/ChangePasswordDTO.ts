export interface ChangePasswordDTO {
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }