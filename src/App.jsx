import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL // URL del backend (Render)

export default function App() {
  const [form, setForm] = useState({
    firstName: '', lastName: '',
    sport: '', gender: '', state: '',
    age21: false, cars: []
  })
  const cars = ['Ford','Chrysler','Toyota','Nissan']
  const sports = ['basketball','soccer','tennis','volleyball']
  const states = ['Jutiapa','Jalapa','Santa Rosa','Escuintla','Otro']

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'cars') {
      setForm(f => ({
        ...f,
        cars: checked ? [...f.cars, value] : f.cars.filter(c => c !== value)
      }))
    } else if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_URL}/submit`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form)
    })
    if(!res.ok){ alert('Error guardando'); return }
    alert('Guardado en Excel ✅')
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm" style={{maxWidth:420, width:'100%'}}>
        <div className="card-body">
          <h3 className="text-center mb-2">Actualizar información</h3>
          <p className="text-muted text-center">Utilice el formulario para editar su información.</p>
          <form onSubmit={onSubmit} className="d-grid gap-3">
            <div>
              <label className="form-label">Nombre de pila:</label>
              <input className="form-control" name="firstName"
                     value={form.firstName} onChange={onChange} placeholder="Introduce tu nombre" required/>
            </div>
            <div>
              <label className="form-label">Apellido:</label>
              <input className="form-control" name="lastName"
                     value={form.lastName} onChange={onChange} placeholder="Introduce tu apellido" required/>
            </div>

            <div>
              <label className="form-label">Deporte favorito:</label>
              <select className="form-select" name="sport" value={form.sport} onChange={onChange} required>
                <option value="">Seleccione un deporte</option>
                {sports.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="form-label d-block">Género:</label>
              {['male','female','not sure'].map(g => (
                <div className="form-check form-check-inline" key={g}>
                  <input className="form-check-input" type="radio" name="gender" id={`g-${g}`}
                         value={g} checked={form.gender===g} onChange={onChange} required/>
                  <label className="form-check-label" htmlFor={`g-${g}`}>{g}</label>
                </div>
              ))}
            </div>

            <div>
              <label className="form-label">Residente del departamento:</label>
              <select className="form-select" name="state" value={form.state} onChange={onChange} required>
                <option value="">Seleccione un lugar</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="age21" id="age21"
                     checked={form.age21} onChange={onChange}/>
              <label className="form-check-label" htmlFor="age21">21 años o más</label>
            </div>

            <div>
              <label className="form-label d-block">Modelos de coches propios:</label>
              <div className="d-flex flex-wrap gap-3">
                {cars.map(c => (
                  <div className="form-check" key={c}>
                    <input className="form-check-input" type="checkbox" id={`c-${c}`}
                           name="cars" value={c} checked={form.cars.includes(c)} onChange={onChange}/>
                    <label className="form-check-label" htmlFor={`c-${c}`}>{c}</label>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-success">Guardar cambios</button>
            <a className="btn btn-outline-success" href={`${API_URL}/excel`} target="_blank" rel="noreferrer">
              Descargar Excel
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}
