const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/recherche', async (req, res) => {
  const plaque = req.query.plaque;
  const token = 'TON_TOKEN_API'; // Remplace ici par ton vrai token
  const url = `https://api.apiplaqueimmatriculation.com/get-vehicule-info?immatriculation=${plaque}&token=${token}&pays=FR`;

  try {
    const response = await axios.post(url);
    const data = response.data;
    res.json({
      marque: data.marque,
      modele: data.modele,
      energie: data.energie,
      code_moteur: data.code_moteur,
    });
  } catch (err) {
    res.status(500).json({ erreur: 'Erreur API ou plaque invalide' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('API prête sur port ' + port));
