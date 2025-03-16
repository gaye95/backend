const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

const jwt= require('jsonwebtoken');

// Fonction d'inscription
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({ username, email, password: hashedPassword });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        // Répondre avec un message de succès
        return res.json({ status: true, message: 'User created successfully' });
    } catch (err) {
        // En cas d'erreur, renvoyer une réponse appropriée
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
);

// Fonction de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Vérifier si l'utilisateur existe
    if (!user) {
        return res.status(404).json({ error: 'User is not found' });
    }

    // Vérifier le mot de passe de l'utilisateur
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid password' });
    }

    // Créer et renvoyer un token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.KEY, { expiresIn: '1h' });
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

    return res.json({ status: true, message: 'User logged in successfully' });
});

module.exports = router;