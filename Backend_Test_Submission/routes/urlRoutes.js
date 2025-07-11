const express = require('express');
const router = express.Router();
const { createShortUrl, redirectShortUrl } = require('../controllers/urlcontroller');

router.post('/shorturls', createShortUrl);
router.get('/:shortcode', redirectShortUrl);

module.exports = router;
