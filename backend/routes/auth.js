const router = require('express').Router();
router.post('/login', (req, res) => res.json({ message: 'Fake login for demo' }));
module.exports = router;