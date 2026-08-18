
const fs = require('fs');
const https = require('https');
const path = require('path');

const audioFiles = [
  'AUDIO_ANOTHERHIM.ogg',
  'AUDIO_DRONE.wav',
  'snd_menumove.wav',
  'snd_select.wav',
  'snd_text.wav',
  'snd_txtsans.wav',
  'AUDIO_APPEARANCE.wav'
];

fs.mkdirSync('public/audio', { recursive: true });

async function downloadFile(name) {
  return new Promise((resolve, reject) => {
    const url = 'https://undertale.jadenthejaded.uk/' + name;
    https.get(url, res => {
      if (res.statusCode !== 200) {
        console.error('Failed to download ' + name + ', status: ' + res.statusCode);
        resolve(false);
        return;
      }
      const fileStream = fs.createWriteStream(path.join('public/audio', name));
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log('Downloaded ' + name);
        resolve(true);
      });
    }).on('error', err => {
      console.error('Error downloading ' + name + ':', err);
      resolve(false);
    });
  });
}

async function main() {
  for (const f of audioFiles) {
    await downloadFile(f);
  }
}

main();

