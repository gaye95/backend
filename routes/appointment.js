const express= require ('express');

const Appointment= require('../models/Appointment');

const router = express.Router();

// Route pour ajouter un rendez-vous
router.post("/appointments", async (req, res) => {
  try {
    const { patientName, doctorName, service, date, time, reason } = req.body;

    const newAppointment = new Appointment({
      patientName,
      doctorName,
      service,
      date,
      time,
      reason
    });

    await newAppointment.save();
    res.status(201).json({ message: "Rendez-vous créé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});
router.get("/appointments", async (req, res) => {
  try {
    const rvs = await Appointment.find();  // Récupérer tous les rendez-vous depuis la base de données
    res.status(200).json(rvs);  // Retourne les rendez-vous avec un statut 200 OK
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    res.status(500).json({ message: "Erreur interne du serveur lors de la récupération des rendez-vous." });  // Retourner une erreur 500 en cas de problème
  }
});

module.exports = router;

