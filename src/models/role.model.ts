import { Metadata } from "./metadata.model";

export interface Role {
  _id:string,
  id: string,
  name: string,
  description: string,
  image: string,
  metadata: Metadata
}
