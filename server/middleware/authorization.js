

async function authorization(req, res, next) {
    try {
        let role = req.user.role;

        if (role === "Admin") {
            next();
        }
        else {
            throw { name: "Forbidden" }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization;