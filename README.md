Formulario React + Node + ExcelJS

Este proyecto corresponde a la **Tarea 3** del curso, donde se implementa un formulario web con **React + Vite + Bootstrap**, conectado a un backend desarrollado con **Node.js + Express + ExcelJS**.

El sistema permite capturar datos desde un formulario, enviarlos al servidor y **almacenarlos en un archivo Excel (.xlsx)**.

---

## Tecnologías utilizadas

- **Frontend:** React + Vite + Bootstrap 5  
- **Backend:** Node.js + Express + ExcelJS  
- **Despliegue:**  
  - Frontend en **GitHub Pages**  
  - Backend en **Render**

---

## 📦 Estructura del proyecto

tarea3-form/
├── public/
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ └── App.css
├── package.json
├── vite.config.js
├── .env.local
└── README.md

---

## ⚙️ Configuración local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/KizunaG/tarea3-form.git
   cd tarea3-form
   
Instalar dependencias:
npm install

Crear el archivo .env.local con la URL del backend:
VITE_API_URL=http://localhost:3000

(O la URL del backend en línea, por ejemplo:
VITE_API_URL=https://tarea3-api.onrender.com)

Ejecutar el entorno de desarrollo:
npm run dev


🧠 Funcionalidad principal
El formulario permite ingresar:

Nombre y Apellido

Deporte favorito

Género

Departamento de residencia

Confirmación de mayoría de edad

Modelos de coches propios

Al presionar Guardar cambios, los datos se envían al backend mediante fetch() en formato JSON.

El backend guarda cada registro en un archivo Excel con encabezados:

Fecha | Nombre | Apellido | Deporte | Género | Departamento | Mayoría de edad | Autos
El botón “Descargar Excel” permite descargar el archivo actualizado.

🌐 Despliegue en línea
🔸 Frontend en GitHub Pages
La app fue publicada automáticamente en:
https://kizunag.github.io/tarea3-form/

🔸 Backend en GitHub 
El código del backend fue publicado en:
https://github.com/KizunaG/tarea3-api.git

🔸 Backend en Render
API desplegada en:
 https://tarea3-api.onrender.com

