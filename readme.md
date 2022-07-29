## Stocks Backend
---

#### Para Ejecutar el backend en local (Puerto 5000)
```bash
    npm start
```

#### Para correr los tests
```bash
    npm test
```

---

### Rutas habilitadas
* (GET) /api/stocks/all - Traer todo el historial de stocks.
* (GET) /api/stocks/:symbol - Traer los datos de una .compañia por medio de su symbol y añadirlo al historial de busqueda.
* (PUT) /api/stocks/:symbol - Actualizar los datos de una compañia que se encuentre en el historial.
* (DELETE) /api/stocks/:symbol - Borrar los datos de una compañia del historial.

---

### Detalles

1. El historial de busqueda se guardara en un archivo JSON ubicado en ./backend/utils/data/data.json.
2. Para correr el proyecto correctamente por primera vez, el archivo .json mencionado anteriormente, debe contener un array vacio, donde se almacenará el historial de busqueda del usuario.


## Stocks Frontend
---

### Para ejecutar la aplicación del lado del frontend, solo deberá abrir el archivo frontend/index.html en el navegador
