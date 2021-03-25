export interface BasePersona {
  id: number;
  firstName: string;
  lastName: string;
  // dateOfBirth: string;
  profileImagePath?: string;
}

export interface User extends BasePersona {
  inmateIdentification: string;
  quota: number;
  location: string;
  race: string;
}

export interface Contact extends BasePersona {
  email: string;
}
