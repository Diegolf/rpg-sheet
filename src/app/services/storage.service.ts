import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class StorageService {

   constructor() { }

   get(key: string, parseToJSON = false): any {
      const data = localStorage.getItem(key);

      return data ? (parseToJSON ? JSON.parse(atob(data)) : atob(data)) : null;
   }

   set(key: string, data: any, stringfyToJSON = false): void {
      if (data) {
         localStorage.setItem(key, btoa(stringfyToJSON ? JSON.stringify(data) : data));
      }
      else {
         localStorage.removeItem(key);
      }
   }

   remove(key: string) {
      localStorage.removeItem(key);
   }
}
