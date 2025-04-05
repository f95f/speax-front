import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * Stores a key-value pair in the browser's local storage.
   * @param key - The key under which the value will be stored.
   * @param value - The value to store.
   * @throws Error if the key or value is empty, or if an error occurs while setting the value.
   */
  public setOnClientStorage(key: string, value: string): void {
    if(!key || !value)  throw new Error("Key or value is empty");

    try {
      localStorage.setItem(key, value);
    }
    catch (error) {
      throw new Error("Error setting value in local storage " + error);
    }
  }


/**
 * Retrieves a value from the browser's local storage by its key.
 * @param key - The key of the value to retrieve.
 * @returns The value associated with the key, or null if the key does not exist.
 * @throws Error if the key is empty, or if an error occurs while retrieving the value.
 */
  public getFromClientStorage(key: string): string | null {
    if(!key) throw new Error("Key is empty");

    try {
      return localStorage.getItem(key);
    }
    catch (error) {
      throw new Error("Error getting value from local storage " + error);
    }
  }


/**
 * Removes a key-value pair from the browser's local storage.
 * @param key - The key of the value to remove.
 * @throws Error if the key is empty, or if an error occurs while removing the value.
 */
  public removeFromClientStorage(key: string): void {
    if(!key) throw new Error("Key is empty");

    try {
      localStorage.removeItem(key);
    }
    catch (error) {
      throw new Error("Error removing value from local storage " + error);
    }
  }
  

/**
 * Clears all key-value pairs from the browser's local storage.
 * @throws Error if an error occurs while clearing the storage.
 */
  public clearClientStorage(): void {
    try {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    }
    catch (error) {
      throw new Error("Error clearing local storage " + error);
    }
  }


}
