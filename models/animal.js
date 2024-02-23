const { Schema, model } = require('mongoose');

const AnimalesSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'nombre del animal obligatorio']
    },

    edad: {
        type: String,
        required: [true, 'la edad es obigatoria']
    },

    tipo: {
        type: String,
        required: [true, 'el tipo de animal es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model("Animal", AnimalesSchema);