import 'reflect-metadata';
import { BadRequestError } from 'routing-controllers';

export function IsString() {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata('isString', true, target, propertyKey);
  };
}

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

import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export function ValidateArgs(targetClass: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [requestBody] = args;
      const targetInstance = plainToClass(targetClass, requestBody);

      const validFields = Object.keys(targetInstance);

      const extraFields = Object.keys(requestBody).filter(
        (key) => !validFields.includes(key)
      );

      if (extraFields.length > 0) {
        throw new BadRequestError(`Invalid fields: ${extraFields.join(', ')}`);
      }
      const validationErrors = validateSync(targetInstance);
      if (validationErrors.length > 0) {
        throw new BadRequestError(`Validation failed: ${validationErrors.join(', ')}`);
      }

      return originalMethod.apply(this, args);
    };
  };
}
