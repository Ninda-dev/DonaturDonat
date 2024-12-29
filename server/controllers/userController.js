const { User } = require('../models');
const { comparePass } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class UserController {

    static async register(req, res, next) {
        try {
            let { email, password } = req.body;

            await User.create({ email, password });

            res.status(201);
            res.json(`${email}  success added`)

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body;

            if (!email || !password) {
                throw { name: "SequelizeValidationError" }
            }

            const findUser = await User.findOne({ where: { email } })

            if (!findUser) {
                throw { name: "InvalidEmailOrPassword" }
            }

            const compare = comparePass(password, findUser.password);

            if (!compare) {
                throw { name: "InvalidEmailOrPassword" }
            }

            const payload = {
                id: findUser.id,
                role: findUser.role
            }

            const access_token = signToken(payload);

            res.status(200).json({ access_token });

        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        const { googleToken } = req.body;
        console.log(googleToken);

        try {
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });


            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                    provider: 'google',
                    password: process.env.DEFAULT_PASSWORD_GOOGLE
                },
                hooks: false
            });

            const token = signToken({ id: user.id }, process.env.JWT_SECRET);
            res.status(created ? 201 : 200).json({ access_token: token });
        } catch (error) {
            console.log(error, "INI DISINI ERROR NYA");
            next(error)
        }
    }

    static async getUser(req, res, next) {
        try {
            const users = await User.findAll();

            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const id = req.params.id;

            const user = await User.findOne({ where: { id } });
            await User.destroy({ where: { id } });

            res.status(200).json(`user ${user.email} success deleted`);
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                res.status(400).json('Cannot delete users who have product claims');
            }
            else {
                next(error)
            }
        }
    }
}

module.exports = UserController