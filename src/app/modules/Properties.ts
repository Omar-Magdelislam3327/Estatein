export class Agent {
  id!: number;
  name!: string;
  phone!: string;
  email!: string;
  image!: string;
  location!: string;
}

export class Properties {
  id!: number;
  name!: string;
  description!: string;
  price!: string;
  location!: string;
  type!: string;
  head!: string;
  image1!: string;
  image2!: string;
  image3!: string;
  bedNum!: number;
  bathNum!: number;
  area!: number;
  agent: Agent[] = [];
  parking!: boolean;
  wifi!: boolean;
  elevator!: boolean;
  purpose!: string;
}

export class User {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  image!: string;
  phone!: string;
  location!: string;
  favorites: number[] = [];
  propertiesAdded: number[] = [];
}
