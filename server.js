import app from "./src/app.js";

const PORT = process.env?.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error('¡Algo salió mal! 😞 el servicio no pudo iniciarse debido a un error:', err);
  } else {
    console.info(`¡Servicio escuchando peticiones en el pueto ${PORT}! 🚀`);
  }
});