const connectDB = require('../models/db');
const generateCode = require('../utils/generateCode');
const Log = require('../middleware/logger');

exports.createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  const db = await connectDB();

  let code = shortcode || generateCode();
  const expiry = new Date(Date.now() + validity * 60000).toISOString();

  try {
    await db.run(
      'INSERT INTO shorturls(url, shortcode, expiry) VALUES (?, ?, ?)',
      [url, code, expiry]
    );
    await Log('backend', 'info', 'controller', `Short URL created: ${code}`);
    res.status(201).json({ shortLink: `http://localhost:3000/${code}`, expiry });
  } catch (err) {
    await Log('backend', 'error', 'controller', err.message);
    res.status(400).json({ error: 'Shortcode already exists or invalid input' });
  }
};

exports.redirectShortUrl = async (req, res) => {
  const { shortcode } = req.params;
  const db = await connectDB();

  const result = await db.get(
    'SELECT url, expiry FROM shorturls WHERE shortcode = ?',
    [shortcode]
  );

  if (!result) {
    await Log('backend', 'warn', 'controller', 'Shortcode not found');
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (new Date(result.expiry) < new Date()) {
    await Log('backend', 'warn', 'controller', 'Shortcode expired');
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  res.redirect(result.url);
};
