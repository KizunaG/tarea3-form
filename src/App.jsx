import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || '' // pon tu API cuando la tengas

export default function App() {
  const [enviando, setEnviando] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    deporte: '',
    genero: '',
    departamento: '',
    mayoria: false,
    autos: []
  })

  const deportes = ['Baloncesto', 'Fútbol', 'Tenis', 'Voleibol']
  const departamentos = ['Jutiapa', 'Jalapa', 'Santa Rosa', 'Escuintla', 'Otro']
  const autos = ['Ford', 'Chrysler', 'Toyota', 'Nissan']

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'autos') {
      setForm(f => ({
        ...f,
        autos: checked ? [...f.autos, value] : f.autos.filter(a => a !== value)
      }))
    } else if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!API_URL) {
      alert('Configura VITE_API_URL para enviar al backend.')
      return
    }
    try {
      setEnviando(true)
      const res = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.nombre,
          lastName: form.apellido,
          sport: form.deporte,
          gender: form.genero,
          state: form.departamento,
          age21: form.mayoria,
          cars: form.autos
        })
      })
      if (!res.ok) throw new Error('falló el guardado')
      alert('✅ Guardado en Excel')
      setForm({
        nombre: '',
        apellido: '',
        deporte: '',
        genero: '',
        departamento: '',
        mayoria: false,
        autos: []
      })
    } catch (err) {
      console.error(err)
      alert('❌ No se pudo guardar.')
    } finally {
      setEnviando(false)
    }
  }

  // 🟣👇 AÑADE ESTA FUNCIÓN AQUÍ (debajo del onSubmit)
  async function descargarExcel() {
    if (!API_URL) return;
    try {
      const res = await fetch(`${API_URL}/excel`, { cache: 'no-store' });
      if (!res.ok) return alert('No hay Excel todavía');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'registros.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('❌ Error al descargar el archivo.');
    }
  }


  return (
    <div className="bg-soft min-vh-100 d-flex align-items-center">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-2 fw-bold text-primary">
                  Actualizar información
                </h2>
                <p className="text-center text-muted mb-4">
                  Utilice el formulario para editar su información.
                </p>

                <form onSubmit={onSubmit} className="d-grid gap-3">

                  <div>
                    <label className="form-label fw-semibold">Nombre de pila:</label>
                    <input
                      className="form-control"
                      name="nombre"
                      placeholder="Introduce tu nombre"
                      value={form.nombre}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold">Apellido:</label>
                    <input
                      className="form-control"
                      name="apellido"
                      placeholder="Introduce tu apellido"
                      value={form.apellido}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold">Deporte favorito:</label>
                    <select
                      className="form-select"
                      name="deporte"
                      value={form.deporte}
                      onChange={onChange}
                      required
                    >
                      <option value="">Seleccione un deporte</option>
                      {deportes.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label fw-semibold d-block">Género:</label>
                    {[
                      { k: 'male', t: 'Masculino' },
                      { k: 'female', t: 'Femenino' },
                      { k: 'not sure', t: 'No estoy seguro' }
                    ].map(g => (
                      <div className="form-check form-check-inline" key={g.k}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="genero"
                          id={`g-${g.k}`}
                          value={g.k}
                          checked={form.genero === g.k}
                          onChange={onChange}
                          required
                        />
                        <label className="form-check-label" htmlFor={`g-${g.k}`}>
                          {g.t}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="form-label fw-semibold">Residente del departamento:</label>
                    <select
                      className="form-select"
                      name="departamento"
                      value={form.departamento}
                      onChange={onChange}
                      required
                    >
                      <option value="">Seleccione un lugar</option>
                      {departamentos.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mayoria"
                      name="mayoria"
                      checked={form.mayoria}
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="mayoria">
                      21 años o más
                    </label>
                  </div>

                  <div>
                    <label className="form-label fw-semibold d-block">Modelos de coches propios:</label>
                    <div className="d-flex flex-wrap gap-3">
                      {autos.map(a => (
                        <div className="form-check" key={a}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`a-${a}`}
                            name="autos"
                            value={a}
                            checked={form.autos.includes(a)}
                            onChange={onChange}
                          />
                          <label className="form-check-label" htmlFor={`a-${a}`}>{a}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-2">
                    <button className="btn btn-primary btn-lg" disabled={enviando}>
                      {enviando ? 'Guardando…' : 'Guardar cambios'}
                    </button>

                    {/* Si tienes API con /excel, este botón descarga el archivo */}
                    <button
  type="button"
  className="btn btn-outline-primary btn-lg"
  onClick={descargarExcel}
>
  Descargar Excel
</button>

                  </div>

                </form>
              </div>
            </div>

            {/* Pie de tarjeta */}
            <p className="text-center text-muted mt-3 mb-0 small">
              Hecho con React + Bootstrap • Tema morado personalizado
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
