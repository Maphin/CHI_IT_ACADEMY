import 'reflect-metadata';
import { BadRequestError } from 'routing-controllers';

// Decorator for string validation
export function IsString() {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata('isString', true, target, propertyKey);
  };
}

// Decorator for email validation
export function IsEmail() {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata('isEmail', true, target, propertyKey);
  };
}

export function validate(obj: any, targetClass: any) {
    const errors: string[] = [];
  
    const targetInstance = new targetClass();
    const targetMetadataKeys = Object.keys(targetInstance);
  
    for (const key of targetMetadataKeys) {
      const value = obj[key];
      const isString = Reflect.getMetadata('isString', targetInstance, key);
      const isEmail = Reflect.getMetadata('isEmail', targetInstance, key);
  
      if (isString && typeof value !== 'string') {
        errors.push(`${key} must be a string`);
      }
  
      if (isEmail && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || typeof value !== 'string')) {
        errors.push(`${key} must be a valid email`);
      }
    }
  
    if (errors.length > 0) {
      throw new BadRequestError(errors.join(', '));
    }
}

// export function ValidateArgs(validationMessage: string = 'Validation failed') {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//       const originalMethod = descriptor.value;
  
//       descriptor.value = function (...args: any[]) {
//         const [body] = args;
  
//         if (body) {
//           const targetClass = target.constructor;
          
//           try {
//             validate(body, targetClass);
//           } catch (error: any) {
//             throw new BadRequestError(`${validationMessage}: ${error.message}`);
//           }
//         }
  
//         return originalMethod.apply(this, args);
//       };
//     };
//   }

import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

// Custom decorator to validate no extra fields in PATCH requests
export function ValidateNoExtraFields(targetClass: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [requestBody] = args;

      // Convert the request body to an instance of the target DTO class
      const targetInstance = plainToClass(targetClass, requestBody);

      // Get the list of valid fields for the target DTO
      const validFields = Object.keys(targetInstance);

      // Check if there are any extra fields in the incoming request body
      const extraFields = Object.keys(requestBody).filter(
        (key) => !validFields.includes(key)
      );

      if (extraFields.length > 0) {
        throw new BadRequestError(`Invalid fields: ${extraFields.join(', ')}`);
      }

      // Validate the fields of the target DTO using class-validator
      const validationErrors = validateSync(targetInstance);
      if (validationErrors.length > 0) {
        throw new BadRequestError(`Validation failed: ${validationErrors.join(', ')}`);
      }

      return originalMethod.apply(this, args);
    };
  };
}
