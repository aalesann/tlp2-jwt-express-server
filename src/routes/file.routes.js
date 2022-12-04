const router = require('express').Router();

const { uploadFile } = require('../controllers/file.controllers');

router.post('/upload-image', uploadFile);

module.exports = router;