import express from 'express'
import { __dirname, mongoStoreOptions } from './utils/utils.js'
import { errorHandler } from './middlewares/errorHandler.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import session from 'express-session';
import passport from 'passport';
import cookieParser from "cookie-parser";
import router from '../src/routes/index.router.js'
import { logger } from "../src/utils/logger.js"
import { info } from './docs/info.js'
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import './passport/strategies.js'
import './passport/github-strategy.js'
import './passport/google-strategy.js'
import './passport/jwt.js'
import 'dotenv/config'


const app = express()

const specs = swaggerJSDoc(info);

app
    .use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(express.static(__dirname + '/public'))
    .use(session(mongoStoreOptions))
    .use(passport.initialize())
    .use(passport.session())
    .engine('handlebars', handlebars.engine())
    .set('views', __dirname + '/views')
    .set('view engine', 'handlebars')
    .use('', router)
    .use(errorHandler)

const PORT = process.env.PORT

const httpServer = app.listen(PORT, () => logger.debug(`Server OK on port ${PORT}`))

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
    console.log('New connection', socket.id)

    socket.on('disconnect', () => {
        console.log('¡User disconnect!', socket.id);
    })
})