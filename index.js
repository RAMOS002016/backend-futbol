const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client'); // 👉 importar Prisma
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// Nueva ruta para consultar usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

const bcrypt = require('bcrypt');

app.post('/usuarios', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el saltRounds recomendado

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol
      }
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// 🔁 CRUD para Jugadores

// GET - obtener todos los jugadores
app.get('/jugadores', async (req, res) => {
  try {
    const jugadores = await prisma.jugador.findMany();
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener jugadores' });
  }
});

// POST - crear un nuevo jugador
app.post('/jugadores', async (req, res) => {
  const { nombre, edad, posicion, equipo } = req.body;
  try {
    const nuevoJugador = await prisma.jugador.create({
      data: { nombre, edad: Number(edad), posicion, equipo }
    });
    res.status(201).json(nuevoJugador);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear jugador' });
  }
});

// PUT - actualizar jugador por ID
app.put('/jugadores/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, posicion, equipo } = req.body;
  try {
    const jugadorActualizado = await prisma.jugador.update({
      where: { id: Number(id) },
      data: { nombre, edad: Number(edad), posicion, equipo }
    });
    res.json(jugadorActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar jugador' });
  }
});

// DELETE - eliminar jugador por ID
app.delete('/jugadores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.jugador.delete({
      where: { id: Number(id) }
    });
    res.json({ mensaje: 'Jugador eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar jugador' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});

// 🔁 CRUD para ENTRENADORES

// GET - todos los entrenadores
app.get('/entrenadores', async (req, res) => {
  try {
    const entrenadores = await prisma.entrenador.findMany();
    res.json(entrenadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener entrenadores' });
  }
});

// POST - nuevo entrenador
app.post('/entrenadores', async (req, res) => {
  const { nombre, especialidad, telefono } = req.body;
  try {
    const nuevo = await prisma.entrenador.create({
      data: { nombre, especialidad, telefono }
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear entrenador' });
  }
});
// 🔁 CRUD para ENTRENAMIENTOS

// GET
app.get('/entrenamientos', async (req, res) => {
  try {
    const entrenamientos = await prisma.entrenamiento.findMany();
    res.json(entrenamientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener entrenamientos' });
  }
});

// POST
app.post('/entrenamientos', async (req, res) => {
  const { titulo, descripcion, fecha, entrenador } = req.body;
  try {
    const nuevo = await prisma.entrenamiento.create({
      data: {
        titulo,
        descripcion,
        fecha: new Date(fecha),
        entrenador
      }
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear entrenamiento' });
  }
});
// 🔁 CRUD para ASISTENCIA

// GET
app.get('/asistencias', async (req, res) => {
  try {
    const asistencias = await prisma.asistencia.findMany();
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
});

// POST
app.post('/asistencias', async (req, res) => {
  const { jugadorId, fecha, presente } = req.body;
  try {
    const nueva = await prisma.asistencia.create({
      data: {
        jugadorId: Number(jugadorId),
        fecha: new Date(fecha),
        presente: Boolean(presente)
      }
    });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear asistencia' });
  }
});
