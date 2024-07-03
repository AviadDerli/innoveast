const express = require('express');
const router = express.Router();
const serveyService = require('./survey.service');

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const survey = await serveyService.createSurvey(req.body);
        console.log({ survey });
        res.status(201).json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const surveys = await serveyService.readSurvey(req.query);
        res.status(200).json(surveys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const survey = await serveyService.readOneSurvey({ _id: req.params.id });
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const survey = await serveyService.updateSurvey(req.params.id, req.body);
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const survey = await serveyService.deleteSurvey(req.params.id);
        res.status(200).json(survey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;