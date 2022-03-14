import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3"

let client = null;

export class ClientNotCreated extends Error {
  constructor() {
    super('Client has not been created. Please call createClient with an S3ClientConfig first.')
    this.name = 'ClientNotCreated'
  }
}

export function resetClient(): void {
  client = null
}

export async function createClient(clientConfig: S3ClientConfig): Promise<S3Client> {
  if (client) {
    return client
  }

  client = new S3Client(clientConfig)
  return client
}

export async function getClient(): Promise<S3Client> {
  if (!client) {
    throw new ClientNotCreated()
  }

  return client
}