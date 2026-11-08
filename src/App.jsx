
import { useState } from 'react';

function Boton({
  children,
  alHacerClic,
  variante = 'primario',
  cargando = false
}) {
  return (
    <button
      className={`boton boton--${variante}`}
      onClick={alHacerClic}
      disabled={cargando}
    >
      {cargando ? 'Procesando...' : children}
    </button>
  );
}

function FilaEstudiante({ estudiante }) {
  const estado = estudiante.nota >= 3.0 ? 'Aprobado' : 'Reprobado';

  return (
    <tr>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.nota.toFixed(1)}</td>
      <td>{estado}</td>
    </tr>
  );
}

function App() {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Ana', nota: 4.5 },
    { id: 2, nombre: 'Luis', nota: 2.8 }
  ]);

  const [nombre, setNombre] = useState('');

  function agregarEstudiante() {
    const nombreLimpio = nombre.trim();

    if (nombreLimpio === '') {
      return;
    }

    const nuevoEstudiante = {
      id: Date.now(),
      nombre: nombreLimpio,
      nota: 3.2
    };

    setEstudiantes([...estudiantes, nuevoEstudiante]);
    setNombre('');
  }

  return (
    <main className="contenedor">
      <h1>Sistema académico</h1>
      <h2>Registro de estudiantes</h2>

      <div className="formulario">
        <input
          type="text"
          placeholder="Escribe el nombre del estudiante"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <Boton
          alHacerClic={agregarEstudiante}
          variante="primario"
        >
          Agregar estudiante
        </Boton>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nota</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((estudiante) => (
            <FilaEstudiante
              key={estudiante.id}
              estudiante={estudiante}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;