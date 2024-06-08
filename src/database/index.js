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
        this.connection = new Sequelize('postgresql://postgres:ZCYxzfihXHOMFoWuVWJSNsFvnxPOGMws@roundhouse.proxy.rlwy.net:47031/railway')
        models
            .map(model => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models))
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://mongo:UarOVKlXdsqwVLrsXlVRHPfhApeOJQxC@monorail.proxy.rlwy.net:54220',
        )
    }
}

export default new Database()