const Categoria = require("../models/categoriaModel");

// Crear una nueva categoría
const crearCategoria = async (req, res) => {
  try {
    const { nombre_categoria, descripcion } = req.body;

    const nuevaCategoria = await Categoria.create({
      nombre_categoria,
      descripcion,
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear la categoría", detalle: error.message });
  }
};

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

// Obtener una categoría por ID
const obtenerCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria)
      return res.status(404).json({ mensaje: "Categoría no encontrada" });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar la categoría" });
  }
};

// Actualizar una categoría
const actualizarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('ID recibido:', id);
    console.log('Body recibido:', req.body);

    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    await categoria.update(req.body);
    res.json({ mensaje: 'Categoría actualizada con éxito', categoria });
  } catch (error) {
    console.error('Error al actualizar categoría:', error.message);
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría
const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (!categoria)
      return res.status(404).json({ mensaje: "Categoría no encontrada" });

    await categoria.destroy();
    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
};
