// Middleware to check user role
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // The role from the decoded token

        // Check if the user's role is in the allowedRoles array
        if (allowedRoles.includes(userRole)) {
            return next();  // Proceed to the next middleware or route handler
        } else {
            return res.status(403).json({ message: 'Access denied' });  // Forbidden if role doesn't match
        }
    };
};

module.exports = roleMiddleware;
