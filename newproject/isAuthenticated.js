// isAuthenticated.js

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // Move to the next middleware or route
    }
    return res.status(401).json({ message: 'Not authenticated' });
};

module.exports = isAuthenticated;
