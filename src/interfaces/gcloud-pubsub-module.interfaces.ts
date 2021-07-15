import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export type ModuleOptions = {
  // nothing
};

export interface ModuleOptionsFactory<T extends ModuleOptions = ModuleOptions> {
  createModuleOptions(): Promise<T> | T;
}

export interface ModuleAsyncOptions<T extends ModuleOptions = ModuleOptions>
  extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<ModuleOptionsFactory<T>>;
  useExisting?: Type<ModuleOptionsFactory<T>>;
  useFactory?: (...args: any[]) => Promise<T> | T;
  inject?: Array<Type<ModuleOptionsFactory<T>> | string | any>;
}

// export interface GoogleAuthOptions {
//   /**
//    * Path to a .json, .pem, or .p12 key file
//    */
//   keyFilename?: string;
//   /**
//    * Path to a .json, .pem, or .p12 key file
//    */
//   keyFile?: string;
//   /**
//    * Object containing client_email and private_key properties, or the
//    * external account client options.
//    */
//   credentials?: CredentialBody;
//   /**
//    * Required scopes for the desired API request
//    */
//   scopes?: string | string[];
//   /**
//    * Your project ID.
//    */
//   projectId?: string;
// }

// export interface CredentialBody {
//   client_email?: string;
//   private_key?: string;
// }
