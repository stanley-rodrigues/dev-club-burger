import Sequelize from 'sequelize'
import mongoose, { mongo } from 'mongoose'

import User from '../app/models/User'

import configDatabase from '../config/database'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

const models = [User, Product, Category]
class Database {
    constructor() {
        this.init()
        this.mongo()
    }

    init() {
        this.connection = new Sequelize('postgresql://postgres:IqvFCIPNTwkfPvkBMGVJhsBODgaAblRe@roundhouse.proxy.rlwy.net:14557/railway')
        models
            .map(model => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models))
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://mongo:vnIOjjewLzMlxgOYcWMnLZHWLamaOSCk@viaduct.proxy.rlwy.net:13913',
        )
    }
}

export default new Database()