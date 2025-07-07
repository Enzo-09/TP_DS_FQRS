import { Poder } from "../models/poder.model.js";
import { IPoderRepository } from "../repositories/poder.repository.js";

export interface PoderCreateDto {
  nom_poder: string;
  debilidad: string;
  desc_poder?: string;
  desc_debilidad?: string;
  categoria?: string;
  costoMulta?: number;
}

export class PoderService {
  constructor(private repository: IPoderRepository) {}

  getAll(): Poder[] {
    return this.repository.getAll();
  }

  getById(id: string): Poder | undefined {
    return this.repository.getById(id);
  }

  create(data: PoderCreateDto): Poder {
    if (!data.nom_poder || !data.debilidad) {
      throw new Error("nom_poder y debilidad son requeridos");
    }
    const poder = new Poder(
      undefined,
      data.nom_poder,
      data.debilidad,
      data.desc_poder ?? "",
      data.desc_debilidad ?? "",
      data.categoria ?? "",
      data.costoMulta ?? 0
    );
    this.repository.create(poder);
    return poder;
  }

  update(id: string, data: Partial<PoderCreateDto>): Poder {
    const existing = this.repository.getById(id);
    if (!existing) {
      throw new Error("No encontrado");
    }
    const updated = new Poder(
      existing.id_Poder,
      data.nom_poder ?? existing.nom_poder,
      data.debilidad ?? existing.debilidad,
      data.desc_poder ?? existing.desc_poder,
      data.desc_debilidad ?? existing.desc_debilidad,
      data.categoria ?? existing.categoria,
      data.costoMulta ?? existing.costoMulta
    );
    this.repository.update(updated);
    return updated;
  }

  delete(id: string): void {
    this.repository.delete(id);
  }
}
