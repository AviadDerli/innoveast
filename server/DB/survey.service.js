const surveyController = require('./survey.controller');

async function createSurvey(data) {
    const survey = await surveyController.create(data);
    return survey;
}

async function getAllSurveys() {
    const surveys = await surveyController.read();
    return surveys;
}

async function readSurvey(filter, isPopulate) {
    const surveys = await surveyController.read(filter, isPopulate);
    return surveys;
}

async function readOneSurvey(filter) {
    const survey = await surveyController.readOne(filter);
    return survey;
}


async function updateSurvey(id, data) {
    const survey = await surveyController.update(id, data);
    return survey;
}

async function deleteSurvey(id) {
    const survey = await surveyController.del(id);
    return survey;
}

module.exports = {
    createSurvey,
    readSurvey,
    readOneSurvey,
    updateSurvey,
    deleteSurvey,
    getAllSurveys,
}