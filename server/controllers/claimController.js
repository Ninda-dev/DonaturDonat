const { Claim, User, Product} = require('../models');

class ClaimController {
    static async getClaimByUserId(req, res, next) {
        try {

            let data = await Claim.findAll({ include: Product });

            res.status(200);
            res.json({data});
        } catch (error) {
            next(error)
        }
    }

    static async createClaim(req, res, next) {
        try {
            let { id } = req.params;
            await Claim.create({
                UserId: req.user.id,
                ProductId: id
            })

            res.status(201);
            res.json("Success claim");
        } catch (error) {
            next(error)
        }
    }

}
module.exports = ClaimController;