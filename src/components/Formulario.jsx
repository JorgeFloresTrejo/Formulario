import { useState } from 'react'
import React from "react";
import './formulario.css'

function Formulario(){
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contra, setContra] = useState('')
    const [datos, setDatos] = useState([])
    const [errores, setErrores] = useState({});
  
  
    function enviarFormulario(e){
      e.preventDefault();

      //Objeto donde se almacenarán los errores
      const erroresActuales = {};

      //Validaciones
      if (!nombre) erroresActuales.nombre = 'El nombre es requerido';
      if (!correo) {
        erroresActuales.correo = 'El correo es requerido';
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(correo)) {
        erroresActuales.correo = 'El correo no es válido';
      }
      if (!contra) erroresActuales.contra = 'La contraseña es requerida';

      //Agregamos al useState el objeto de errores
      setErrores(erroresActuales);

      //Creamos un objeto con los nuevos datos si el objeto de errores está vacio
      if(Object.keys(erroresActuales).length === 0){
        const nuevoDato= {
            nombre: nombre,
            correo: correo,
            contra: contra
        }

        //Agregamos los nuevos datos 
        setDatos([...datos, nuevoDato]);

        //Limpiamos el formulario
        setNombre('');
        setCorreo('');
        setContra('');
      }
    }

  return (
    <>
      <h1>Formulario</h1>
      <form onSubmit={enviarFormulario}>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" name='nombre' id='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
        {errores.nombre && <p>{errores.nombre}</p>}
        <br />
        <label htmlFor="correo">Correo</label>
        <input type="email" id='correo' name='correo' value={correo} onChange={(e) => setCorreo(e.target.value)} />
        {errores.correo && <p>{errores.correo}</p>}
        <br />
        <label htmlFor="contra">Contraseña</label>
        <input type="password" name='contra' id='contra' value={contra} onChange={(e) => setContra(e.target.value)} />
        {errores.contra && <p>{errores.contra}</p>}
        <br />
        <button>Enviar</button>
      </form>
      <br />
      <br />

      <div>
         {
            datos.map((data, index) => (
                <div key={index}>
                    <p>{data.nombre}</p>
                    <p>{data.correo}</p>
                    <p>{data.contra}</p>
                </div>
            ))
         }
      </div>

    </>
  )
}

export default Formulario
