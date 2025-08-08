import 'reflect-metadata'
import express from 'express'
import { RequestContext } from '@mikro-orm/core'
import { orm, syncSchema } from './shared/db/orm.js'

import metahumanosRoutes from './metahumano/metahumano.routes.js'
import poderesRoutes from './poder/poder.routes.js'
import metaPoderesRoutes from './metaPoder/metaPoder.routes.js'
import { burocratasRouter } from './Burocratas/Burocrata.routes.js'
import { evidenciaRouter } from './evidencia/evidencia.routes.js'
import { multasRouter } from './Multas/Multa.routes.js'
import { carpetaRouter } from './carpeta/carpeta.routes.js'
import usuarioRouter from './auth/usuario.routes.js'
import villanoRoutes from './villano/villano.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true // permitir envío de cookies al front
}))
app.use(express.json())
app.use(cookieParser()) // habilita uso de cookies

// Contexto de EntityManager por request
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

// Rutas
app.use('/api/metahumanos', metahumanosRoutes)
app.use('/api/poderes', poderesRoutes)
app.use('/api/metapoderes', metaPoderesRoutes)
app.use('/api/burocratas', burocratasRouter)
app.use('/api/multas', multasRouter)
app.use('/api/evidencias', evidenciaRouter)
app.use('/api/carpetas', carpetaRouter)
app.use('/api/auth', usuarioRouter) // � ACTUALIZADO: Nuevo modelo de usuario
app.use('/api/villanos', villanoRoutes)

// 404 handler
app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

// Sincronizar base de datos (dev only)
await syncSchema()

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/')
})
