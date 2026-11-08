import { useState } from 'react';
import './App.css';

function Boton({ children, variante = 'primario', cargando = false }) {
  return (
    <button
      type="submit"
      className={`boton boton--${variante}`}
      disabled={cargando}
    >
      {cargando ? 'Procesando...' : children}
    </button>
  );
}

function FilaEstudiante({ estudiante }) {
  const estado = estudiante.nota >= 3 ? 'Aprobado' : 'Reprobado';

  return (
    <tr>
      <td className="nombre-estudiante">{estudiante.nombre}</td>
      <td>{estudiante.nota.toFixed(1)}</td>
      <td>
        <span className={`insignia insignia--${estado.toLowerCase()}`}>
          {estado}
        </span>
      </td>
    </tr>
  );
}

function App() {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Ana', nota: 4.5 },
  ]);
  const [nombre, setNombre] = useState('');

  function agregar(evento) {
    evento.preventDefault();
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) return;

    setEstudiantes((actuales) => [
      ...actuales,
      { id: Date.now(), nombre: nombreLimpio, nota: 3.2 },
    ]);
    setNombre('');
  }

  return (
    <main className="notas">
      <header className="encabezado">
        <span className="etiqueta">Gestión académica</span>
        <h1>Notas de estudiantes</h1>
        <p>Registra estudiantes y consulta su estado académico.</p>
      </header>

      <section className="panel-notas" aria-labelledby="titulo-registro">
        <div className="panel-encabezado">
          <div>
            <h2 id="titulo-registro">Registro de notas</h2>
            <p>
              {estudiantes.length}{' '}
              {estudiantes.length === 1 ? 'estudiante registrado' : 'estudiantes registrados'}
            </p>
          </div>
        </div>

        <form className="formulario" onSubmit={agregar}>
          <label htmlFor="nombre-estudiante">Nombre del estudiante</label>
          <div className="controles-formulario">
            <input
              id="nombre-estudiante"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              placeholder="Ej. María Gómez"
              autoComplete="name"
              required
            />
            <Boton>Agregar estudiante</Boton>
          </div>
        </form>

        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th scope="col">Estudiante</th>
                <th scope="col">Nota</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <FilaEstudiante key={estudiante.id} estudiante={estudiante} />
              ))}
            </tbody>
          </table>
        </div>
        <p className="nota-ayuda">La nota mínima aprobatoria es 3.0.</p>
      </section>
    </main>
  );
}

export default App;
