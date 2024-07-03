const surveyModel = require('./survey.model')

async function create(data) {
    return await surveyModel.create(data)
}

async function read(filter, isPopulate) {
    return await surveyModel.find(filter).populate(isPopulate ? 'msg' : '')
}

async function save(survey) {
    return await survey.save()
}

async function readOne(filter) {
    return await surveyModel.findOne(filter)
}

async function update(id, data) {
    return await surveyModel.findByIdAndUpdate(id, data, { new: true })
}


async function del(id) {
    return await surveyModel.deleteOne({ _id: id })
}

module.exports = { create, read, readOne, update, del, save }