import { Request, Response } from "express";
import { PoderService } from "../services/poder.service.js";
import { InMemoryPoderRepository } from "../repositories/poder.repository.js";

const service = new PoderService(new InMemoryPoderRepository());

export const getPoderes = (req: Request, res: Response) => {
  res.json({ data: service.getAll() });
};

export const getPoder = (req: Request, res: Response) => {
  const poder = service.getById(req.params.id);
  if (!poder) {
    return res.status(404).json({ error: "No encontrado" });
  }
  res.json({ data: poder });
};

export const createPoder = (req: Request, res: Response) => {
  try {
    const nuevo = service.create(req.body);
    res.status(201).json({ message: "Poder creado", data: nuevo });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePoder = (req: Request, res: Response) => {
  try {
    const actualizado = service.update(req.params.id, req.body);
    res.json({ message: "Poder actualizado", data: actualizado });
  } catch (err: any) {
    if (err.message === "No encontrado") {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

export const deletePoder = (req: Request, res: Response) => {
  service.delete(req.params.id);
  res.json({ message: "Poder eliminado" });
};
