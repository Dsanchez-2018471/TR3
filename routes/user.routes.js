const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usuariosPost,
    usuariosGet, 
    getUsuarioById,
    putUsuarios,
    usuariosDelete} = require('../controllers/user.controller');

const { existenteEmail, esRoleValido, existeUsuarioById } = require('../helpers/db-validators');

const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id",
    [
        check('id', 'Id incorrecto').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById);

router.put(
    "/:id",
    [
        check('id', 'Id incorrecto').isMongoId(),
        check('id').custom(existeUsuarioById),
        check("role").custom(esRoleValido),
        validarCampos
    ], putUsuarios);

router.post(
    "/",
    [
        check("nombre", "Por favor ingresar un nombre").not().isEmpty(),
        check("password","Su password debe contener al menos 6 caracteres").isLength({min:6}),
        check("correo","Este es un correo inválido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], usuariosPost);

router.delete(
    "/:id",
    [
        check('id', 'Id incorrecto').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete);

module.exports = router;