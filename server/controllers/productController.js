const gemini = require('../helpers/gemini');
const { User, Product } = require('../models');
const express = require('express');

class ProductController {
    // static async getClaimProduct(req, res, next) {
    //     try {
    //         const { search, sort, pagination } = req.query;

    //         const condition = {
    //             where: {
    //                 UserId: req.user.id
    //             }
    //         }

    //         if (search) {
    //             condition.where = {
    //                 UserId: req.user.id,
    //                 title: {
    //                     [Op.iLike]: `%${search}%`
    //                 }
    //             }
    //         }

    //         if (sort) {
    //             let order = sort[0] === "-" ? "DESC" : "ASC";

    //             let orderBy = order === "DESC" ? sort.slice(1) : sort;

    //             condition.order = [[orderBy, order]]
    //         }

    //         let limit = 10;
    //         let offset = 1;

    //         if (pagination) {

    //             if (pagination.size) {
    //                 limit = pagination.size;
    //                 condition.limit = limit;
    //             }


    //             if (pagination.number) {
    //                 offset = pagination.number;
    //                 condition.offset = limit * (offset - 1);
    //             }
    //         }

    //         let products = await Product.findAll(condition);

    //         res.status(200);
    //         res.json(products);

    //     } catch (error) {
    //         next(error);
    //     }
    // }

    static async getAllProduct(req, res, next) {
        try {

            let data = await Product.findAll();

            res.status(200);
            res.json({data})

        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next) {
        try {
            let {id} = req.params;

            let data = await Product.findAll({
                where: {
                    id
                }
            });

            res.status(200);
            res.json({data})

        } catch (error) {
            next(error)
        }
    }

    static async createProduct(req, res, next) {
        try {

            let { name, description, image, stock } = req.body;

            let data = await Product.create({ name, description, image, stock });

            res.status(201);
            res.json(`success added ${data.name}`)
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        try {

            const { id } = req.params
            const { name, description, image, stock } = req.body

            await Product.update({ name, description, image, stock },
                {
                    where: {
                        id
                    }
                })
            res.status(200).json({ message: `succesfully update ${name}` })
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next){
        try {
         
            const {id} = req.params
            let data = await Product.findByPk(id);
            let name = data.name;

            await data.destroy({
                where: {
                    id:data.id
                }
            })
            res.status(200).json({message: `succesfully deleting ${name}`})
        } catch (error) {
            next(error)
        }
    }

    static async geminiApi(req, res, next){
        try {
            const { prompt } = req.body;

            let data = await gemini(prompt)
            // console.log(data, "===== ini udah ada data prompt di controller");
            
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController