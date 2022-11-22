const express = require("express");
const router = express.Router(); //manejador de rutas de express
const eventoSchema = require("../models/evento");
const verifyToken = require('./validate_token');

//Nuevo evento
router.post("/evento", (req, res) => {
    const evento = eventoSchema(req.body);
    evento
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Consultar todos los animales
router.get("/evento", (req, res) => {
    eventoSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Modificar el nombre de un animal por su id
router.put("/evento/:id", (req, res) => {
    const { id } = req.params;
    const { Titulo, Descripcion, Referencias, Conclusiones } = req.body;
    eventoSchema
        .updateOne({ _id: id }, {
            $set: { Titulo, Descripcion, Referencias, Conclusiones }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Eliminar un animal por su id
router.delete("/evento/:id", (req, res) => {
    const { id } = req.params;
    eventoSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
