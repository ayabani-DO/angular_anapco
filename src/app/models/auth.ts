export interface AuthenficationRequest {
    email: string;
    password: string;
  }
  
  export interface AuthenficationResponse {
    token: string;
  }
  
  export interface RegistrationRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string; // format YYYY-MM-DD
  }
  
  export interface ResetPasswordDto {
    email: string;
    currentPassword?: string; // optionnel pour update
    newPassword: string;
  }
  export interface AuthRequest {
    email: string;
    password: string;
  }
  
  