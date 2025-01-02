const { Claim, User, Product } = require('../models');

class ClaimController {
    static async getClaim(req, res, next) {
        try {

            let data = await Claim.findAll({
                include: [
                    { model: Product },
                    { model: User }
                ]
            });

            res.status(200);
            res.json({ data });
        } catch (error) {
            next(error)
        }
    }

    static async getClaimByUserId(req, res, next) {
        try {
            let { id } = req.user;
            let data = await Claim.findAll({
                where: {
                    UserId: id
                },
                include: [
                    { model: Product },
                    { model: User }
                ]
            });

            res.status(200);
            res.json({ data });
        } catch (error) {
            next(error)
        }
    }

    static async getClaimByProductId(req, res, next) {
        try {
            let { id } = req.params;
            let data = await Claim.findAll({
                where: {
                    ProductId: id
                },
                include: [
                    { model: Product },
                    { model: User }
                ]
            });

            res.status(200);
            res.json({ data });
        } catch (error) {
            next(error)
        }
    }

    static async createClaim(req, res, next) {
        try {
            let { id } = req.params;
            await Claim.create({
                date: new Date(),
                UserId: req.user.id,
                ProductId: id
            })

            res.status(201);
            res.json("Success claim");
        } catch (error) {
            next(error)
        }
    }

    static async doneClaim(req, res, next) {
        try {
            let { id } = req.params;
            await Claim.destroy({
                where: {
                    id
                }
            })

            res.status(200);
            res.json("Product claim complete");
        } catch (error) {
            next(error)
        }
    }

}
module.exports = ClaimController;