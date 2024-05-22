import * as Yup from "yup";
import Category from "../models/Category";
import User from "../models/User";

class CategoryController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json();
        }

        const { name } = request.body;

        let path = null; 

        if (request.file) {
            path = request.file.filename;
        }

        const categoryExists = await Category.findOne({
            where: { name },
        });

        if (categoryExists) {
            return response.status(400).json({ error: "Category already exists" });
        }

        try {
            const category = await Category.create({ name, path });
            return response.json(category);
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: "Failed to create category" });
        }
    }

    async index(request, response) {
        try {
            const categories = await Category.findAll();
            return response.json(categories);
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: "Failed to fetch categories" });
        }
    }

    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string(),
        });

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json();
        }

        const { name } = request.body;
        const { id } = request.params;

        try {
            const category = await Category.findByPk(id);

            if (!category) {
                return response.status(404).json({ error: "Category not found" });
            }

            let path = null;

            if (request.file) {
                path = request.file.filename;
            }

            await Category.update({ name, path }, { where: { id } });
            return response.status(200).json();
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: "Failed to update category" });
        }
    }
}

export default new CategoryController();