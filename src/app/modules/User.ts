export class User{
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  image!:string;
  phone!:string;
  location!:string;
  favorites: number[] = [];
  propertiesAdded: number[] = [];
  appointment : number[] = [];

}
