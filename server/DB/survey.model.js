const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String },
  workplace: { type: String },
  jobTitle: { type: String },
  experience: { type: Number },
  linkedin: { type: String },
  facebook: { type: String },
  lecture: { type: Boolean, default: false },
  advice: { type: Boolean, default: false },
  investor: { type: Boolean, default: false },
  teenagers: { type: Boolean, default: false },
  startup: { type: Boolean, default: false },
  founder: { type: Boolean, default: false },
  entrepreneur: { type: Boolean, default: false },
  networking: { type: Boolean, default: false },
  contentEvents: { type: Boolean, default: false },
  recruiting: { type: Boolean, default: false },
  resume: { type: Boolean, default: false },
  nextJob: { type: Boolean, default: false },
  firstJob: { type: Boolean, default: false },
  collaboration: { type: Boolean, default: false },
  promoteTechArea: { type: Boolean, default: false },
  promoteWomenTech: { type: Boolean, default: false },
  additionalInfo: { type: String }
}, { timestamps: true });

const surveyModel = mongoose.model('Survey', SurveySchema);
module.exports = surveyModel;