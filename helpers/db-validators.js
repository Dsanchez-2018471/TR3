const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Animal = require('../models/animal');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`Este rol ${role} no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe en la base de datos`)
    }
}

const existeAnimalById = async (id = '') => {
    const existeAnimal = await Animal.findOne({id});
    if(existeAnimal){
        throw new Error(`El animal con el ${ id } no existe en la base de datos`)
    }
}


module.exports ={
    esRoleValido,
    existenteEmail,
    existeUsuarioById,
    existeAnimalById
}