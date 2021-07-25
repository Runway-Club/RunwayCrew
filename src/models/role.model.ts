import { Metadata } from "./metadata.model";

export interface Role {
  id: string,
  name: string,
  description: string,
  image: string,
  metadata: Metadata
}
