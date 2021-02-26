export interface BasePersona {
  id: number;
  firstName: string;
  lastName: string;
  location: string;
  dateOfBirth: string;
  profileImgPath?: string;
}

export interface User extends BasePersona {
  email: string;
}

export interface Inmate extends BasePersona {
  inmateNumber: string;
  dob: string;
  quota: number;
  sentence: string;
  sentnceLength: string;
  location: string;
  race: string;
}

export interface Contact extends BasePersona {
  relationship: string;
  details: string;
  email: string;
  dob: string;
}
