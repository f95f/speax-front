import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public setOnClientStorage(key: string, value: string): void {
    if(!key || !value) {
      console.error("Key or value is empty");
      return;
    }

    try {
      localStorage.setItem(key, value);
    }
    catch (error) {
      console.error("Error setting value in local storage", error);
    }
  }

  public getFromClientStorage(key: string): string | null {
    if(!key) {
      console.error("Key is empty");
      return null;
    }

    try {
      return localStorage.getItem(key);
    }
    catch (error) {
      console.error("Error getting value from local storage", error);
      return null;
    }
  }

  public removeFromClientStorage(key: string): void {
    if(!key) {
      console.error("Key is empty");
      return;
    }

    try {
      localStorage.removeItem(key);
    }
    catch (error) {
      console.error("Error removing value from local storage", error);
    }
  }
  
  public clearClientStorage(): void {
    try {
      localStorage.clear();
    }
    catch (error) {
      console.error("Error clearing local storage", error);
    }
  }


}
