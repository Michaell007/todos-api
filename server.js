const express = require('express');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route de base
app.get('/docs', (req, res) => {
  res.json({ 
    message: "API Todo Express sans base de données",
    endpoints: {
      "GET /api/todos": "Liste toutes les tâches",
      "GET /api/todos/:id": "Une tâche",
      "POST /api/todos": "Créer une tâche {title}",
      "PUT /api/todos/:id": "Modifier une tâche",
      "DELETE /api/todos/:id": "Supprimer une tâche"
    }
  });
});

// Routes API
app.use('/api/todos', todoRoutes);

// Gestion 404
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});