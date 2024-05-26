const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Registration endpoint
const register = async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, userType, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            userType,
            password: hashedPassword
        });
        await user.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
};

// Login endpoint
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id, userType: user.userType }, "whjg72tb6732t", {
            expiresIn: '1 hour'
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };