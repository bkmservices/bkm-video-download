const express = require('express');
const ytdl = require('ytdl-core');

const app = express();
const port = 3000;

// Route pour télécharger une vidéo YouTube
app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: 'Aucun lien fourni' });
  }

  try {
    // Vérifier si l'URL est valide
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'URL YouTube invalide' });
    }

    // Extraire les informations de la vidéo
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    // Répondre avec le lien de téléchargement direct
    res.json({
      download_url: format.url
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du téléchargement de la vidéo', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});
