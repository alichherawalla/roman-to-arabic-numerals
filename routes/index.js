import express from 'express'
import * as conversionController from '../controllers/conversionController/index'

const router = express.Router();

// routes for conversion
router.get('/convert-to-arabic', (req, res) => conversionController.convertRomanToArabic(req, res));

export default router;
