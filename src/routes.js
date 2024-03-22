import { Router } from "express"
import { v4 } from 'uuid'

import User from './app/models/User'

const routes = new Router ()

routes.get('/', async (request, response) => {
    const user = await User.create({
        id: v4(),
        name: 'Lucas',
        email: 'lucas_isnardi@hotmail.com',
        password_hash: '23asd234',
    })
    return response.json (user)
})

export default routes   