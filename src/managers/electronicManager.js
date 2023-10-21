const Electronic = require('../models/Electronic');

exports.getAll = () => Electronic.find().populate('owner');

exports.getOne = (electronicId) => Electronic.findById(electronicId).populate('owner');

exports.create = (electronicData) => Electronic.create(electronicData);

exports.buy = async (userId, electronicId) => {
    const electronic = await Electronic.findById(electronicId);

    electronic.buyers.push(userId);
    return electronic.save();
};

exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId);

exports.edit = (electronicId, electronicData) => Electronic.findByIdAndUpdate(electronicId, electronicData);

exports.search = async (name, type) => {
    let electronic = await Electronic.find().lean();
    //let crypto = await this.getAll();

    if (name) {
        electronic = electronic.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    if (type) {
        electronic = electronic.filter(x => x.type.toLowerCase() == type.toLowerCase());
    }
    return electronic;
}