const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
    try {
        const propertyDetails = req.body;
        const property = new Property(propertyDetails);
        property.seller = req.user._id;
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id).populate('seller');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProperty = async (req, res) => {
    if (req.user.userType !== 'seller') {
        return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }

    const { id } = req.params;
    const updates = req.body;

    try {
        const property = await Property.findByIdAndUpdate(id, updates, { new: true });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    if (req.user.userType !== 'seller') {
        return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }

    const { id } = req.params;

    try {
        const property = await Property.findByIdAndDelete(id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPropertiesBySeller = async (req, res) => {
    try {
        const properties = await Property.find({ seller: req.user._id });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
