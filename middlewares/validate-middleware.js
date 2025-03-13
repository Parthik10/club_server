const validate = (Schema) => async (req, res, next) => {
    try {
        // Validate request body using Zod
        const parsedBody = await Schema.parseAsync(req.body);
        req.body = parsedBody;
        next(); // Proceed to next middleware
    } catch (err) {
        console.error("❌ Validation Error:", err.errors); // Log detailed errors

        res.status(422).json({
            status: 422,
            message: "Fill details properly",
            errors: err.errors, // Send full validation errors for debugging
        });
    }
};

module.exports = validate;
