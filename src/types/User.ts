export interface BasePersona {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  profileImgPath?: string;
}

export interface User extends BasePersona {
  inmateIdentification: string;
  quota: number;
  location: string;
  race: string;
}

export interface Contact extends BasePersona {
  relationship: string;
  details: string;
  email: string;
  dob: string;
}
