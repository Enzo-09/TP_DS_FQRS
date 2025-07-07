import { Poder } from "../models/poder.model.js";

export interface IPoderRepository {
  getAll(): Poder[];
  getById(id: string): Poder | undefined;
  create(poder: Poder): void;
  update(poder: Poder): void;
  delete(id: string): void;
}

export class InMemoryPoderRepository implements IPoderRepository {
  private poderes: Poder[] = [];

  getAll(): Poder[] {
    return this.poderes;
  }

  getById(id: string): Poder | undefined {
    return this.poderes.find(p => p.id_Poder === id);
  }

  create(poder: Poder): void {
    this.poderes.push(poder);
  }

  update(poder: Poder): void {
    const index = this.poderes.findIndex(p => p.id_Poder === poder.id_Poder);
    if (index !== -1) {
      this.poderes[index] = poder;
    }
  }

  delete(id: string): void {
    const index = this.poderes.findIndex(p => p.id_Poder === id);
    if (index !== -1) {
      this.poderes.splice(index, 1);
    }
  }
}
