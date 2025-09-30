const Joi = require('joi');

// User registration validation schema
const userRegistrationSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(10)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must not exceed 10 characters',
            'any.required': 'Name is required'
        }),
    lastName: Joi.string()
        .min(2)
        .max(10)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must not exceed 10 characters',
            'any.required': 'Name is required'
        }),
    
    // username: Joi.string()
    //     .alphanum()
    //     .min(3)
    //     .max(30)
    //     .required()
    //     .messages({
    //         'string.empty': 'Username is required',
    //         'string.alphanum': 'Username must contain only alphanumeric characters',
    //         'string.min': 'Username must be at least 3 characters long',
    //         'string.max': 'Username must not exceed 30 characters',
    //         'any.required': 'Username is required'
    //     }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    
    password: Joi.string()
        .min(6)
        .max(128)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must not exceed 128 characters',
            'any.required': 'Password is required'
        })
});

// User login validation schema (accepts either username or email)
const userLoginSchema = Joi.object({
    email: Joi.string().email().allow(null, ''),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
})
.or('email')
.messages({
    'object.missing': 'Email is required'
});

const userProfileUpdateSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must not exceed 50 characters'
        }),
    // password: Joi.string()
    //     .min(6)
    //     .max(128)
    //     .optional()
    //     .messages({
    //         'string.empty': 'Password is required',
    //         'string.min': 'Password must be at least 6 characters long',
    //         'string.max': 'Password must not exceed 128 characters',
    //     })
});

// Validation helper function
const validateRequest = (schema, data) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    
    if (error) {
        const errorMessage = error.details
            .map(detail => detail.message)
            .join(', ');
        return { isValid: false, error: errorMessage, value: null };
    }
    
    return { isValid: true, error: null, value };
};

module.exports = {
    userRegistrationSchema,
    userLoginSchema,
    userProfileUpdateSchema,
    validateRequest
};