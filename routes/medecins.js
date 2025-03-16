const express = require('express');
const router = express.Router();
const Medecin = require('../models/Medecin'); // Assurez-vous que ce modèle est correctement défini

// Ajouter un médecin
router.post("/medecins", async (req, res) => {
  try {
    const { name, email, phone, service, specialization } = req.body;
    const newMedecin = new Medecin({
      name,
      email,
      phone,
      service,
      specialization
    });
    await newMedecin.save();
    res.status(201).json(newMedecin); // Réponse avec le médecin ajouté
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout du médecin", error: err.message });
  }
});

// Récupérer tous les médecins
router.get("/medecins", async (req, res) => {
    const medecins = await Medecin.find();
    res.json(medecins);
  });
  

module.exports = router;  // C'est cette ligne qui exporte votre router
