const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    animalPost,
    getAnimalById,
    animalesGet,
    putAnimal,
    animalesDelete
} = require('../controllers/animal.controller');
const { existeAnimalById } = require('../helpers/db-validators');

const router = Router();

router.get("/", animalesGet);

router.get(
    "/:id",
    [
        check('id', 'Id incorrecto').isMongoId(),
        check('id').custom(existeAnimalById),
        validarCampos
    ], getAnimalById)

router.put(
    "/:id",
    [
        check('id', 'Id incorrecto').isMongoId(),
        check('id').custom(existeAnimalById),
        validarCampos
    ], putAnimal)

router.post(
    "/",
    [
        check("nombre", "Por favor ingresar un nombre").not().isEmpty(),
        check("edad", "La edad debe de ser menor a 20 años").not().isEmpty(),
        check("tipo", "Este tipo de animal no es valido").not().isEmpty(),
        validarCampos,
    ], animalPost);

router.delete(
    "/:id",
    [
        check('id', 'Id incorrecto').isMongoId(),
        check('id').custom(existeAnimalById),
        validarCampos
    ], animalesDelete);

module.exports = router;