export interface BasePersona {
  id: number;
  firstName: string;
  lastName: string;
  location: string;
  dateOfBirth: string;
  profileImgPath?: string;
}

// export interface User extends BasePersona {
//   email: string;
// }

export interface User extends BasePersona {
  inmateNumber: string;
  quota: number;
  sentence: string;
  sentenceLength: string;
  location: string;
  race: string;
}

export interface Contact extends BasePersona {
  relationship: string;
  details: string;
  email: string;
  dob: string;
}
