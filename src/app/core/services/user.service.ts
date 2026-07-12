// src/app/core/services/user.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Estado privado usando Signals
  private usersState = signal<User[]>([
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'Admin', 
    status: 'Activo', 
    birthDate: '1995-05-12', 
    contractType: 'Tiempo Completo', 
    permissions: ['Soporte', 'Reportes'] 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'User', 
    status: 'Inactivo', 
    birthDate: '1998-09-23', 
    contractType: 'Remoto', 
    permissions: ['Reportes'] 
  }
]);

  // Exponer la lista como un Signal de solo lectura
  users = computed(() => this.usersState());

  getUsers() {
    return this.users();
  }

  getUserById(id: number): User | undefined {
    return this.usersState().find(u => u.id === id);
  }

  createUser(user: User) {
    const newUser = { ...user, id: Date.now(),
    createdAt: new Date().toLocaleDateString() }; // Simulación de ID
    this.usersState.update(users => [...users, newUser]);
  }

  updateUser(updatedUser: User) {
    this.usersState.update(users => 
      users.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
  }

  deleteUser(id: number) {
    this.usersState.update(users => users.filter(u => u.id !== id));
  }
  

  
}