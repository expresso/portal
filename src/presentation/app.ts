import expresso from '@expresso/app'
import { createApp } from '@expresso/router'
import { createConnection } from '@irontitan/mongodb-data-layer'
import { getRoutes } from './endpoints'
import { Repositories } from '../data/repository'
import { Services } from '../services'
import { errorHandler } from './middlewares/error'

export const appFactory = expresso(async (express) => {
  const db = await createConnection({
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/expresso-portal',
    dbName: 'expresso-portal'
  })

  const repositories = new Repositories(db)

  const services = new Services(
    repositories,
    process.env.JWT_SECRET || 'SECRET'
  )

  const routing = getRoutes(services)

  const app = createApp({
    app: express,
    openApiInfo: {
      info: {
        title: 'Expresso Portal',
        version: process.env.npm_package_version || 'unknown',
        description: 'Expresso authentication service',
        license: {
          name: 'GPL-3.0',
          url: 'https://opensource.org/licenses/GPL-3.0'
        }
      },
      openapi: '3.0.1'
    },
    routing
  })

  app.use(errorHandler)

  return app
})
