"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarUser = void 0;
const ValidarUser = (req, res, next) => {
    const { verified } = req.body.confirmedUser;
    if (!verified) {
        res.status(401).json({
            msg: "Usuario aún no se encuentra verificado",
        });
        return;
    }
    next();
};
exports.ValidarUser = ValidarUser;
