import { appFactory } from './app'
import server from '@expresso/server'

export const startServer = () =>
  server.start(appFactory, {
    name: 'expresso-portal'
  })
