const express = require('express');
const cors = require('cors'); // Si vous utilisez CORS
const mongoose = require('mongoose');
const medecinsRouter = require('./routes/medecins'); // Importez vos routes
const appointmentRoutes = require('./routes/appointment'); // Importez vos routes
const  userRouter  = require('./routes/user');
require('dotenv').config(); // Assurez-vous de charger dotenv en haut du fichier

const app = express();

// Middleware CORS (optionnel si vous avez des problèmes de CORS)

app.use(cors());

// Middleware pour parser les données JSON
app.use(express.json());

// Utilisation du router des médecins
app.use('/api', medecinsRouter); // Assurez-vous que vous définissez bien le bon chemin de route
app.use("/appointment", appointmentRoutes); // Assurez-vous que vous définissez bien le bon chemin de route
app.use('/auth', userRouter);


// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/connexion', {
})
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(err => console.error("Erreur de connexion à MongoDB", err));

// Démarrage du serveur
const port = 5000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
