const fs = require('fs');
const { error } = require('console');
const { get } = require('http');


let listadoPorHacer = [];

const gurdarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar nueva tarea', err);
    })
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //Equivale a la función de abajo
    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion
    // });
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        gurdarDB();
        return true;
    } else {
        return false;
    }
}

const eliminar = (descripcion) => {
    // cargarDB();
    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     gurdarDB();
    //     return true;
    // } else {
    //     return false;
    // }

    /// Solución dada

    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer === nuevoListado) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        gurdarDB();
        return true;
    }

}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    gurdarDB();
    return porHacer;
}

module.exports = {
    crear,
    actualizar,
    getListado,
    eliminar
}