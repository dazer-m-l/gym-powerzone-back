const Lead = require('../models/leandsModels');

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener leads' });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead no encontrado' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el lead' });
  }
};

exports.createLead = async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);
    res.status(201).json({ message: 'Lead creado', lead: newLead });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el lead' });
  }
};

exports.patchLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead no encontrado' });
    }

    await lead.update(req.body);

    res.json({ message: 'Lead actualizado parcialmente', lead });
  } catch (error) {
    console.error('Error en PATCH Lead:', error.message);
    res.status(500).json({ error: 'Error al actualizar parcialmente el lead' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const [updated] = await Lead.update(req.body, {
      where: { leads_id: req.params.id }
    });
    if (updated === 0) return res.status(404).json({ error: 'Lead no encontrado' });
    res.json({ message: 'Lead actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el lead' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const deleted = await Lead.destroy({ where: { leads_id: req.params.id } });
    if (deleted === 0) return res.status(404).json({ error: 'Lead no encontrado' });
    res.json({ message: 'Lead eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el lead' });
  }
};
