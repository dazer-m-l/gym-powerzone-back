const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leandsController');

router.get('/', leadsController.getAllLeads);
router.get('/:id', leadsController.getLeadById);
router.post('/', leadsController.createLead);
router.put('/:id', leadsController.updateLead);
router.patch('/:id', leadsController.patchLead);
router.delete('/:id', leadsController.deleteLead);

module.exports = router;
