exports.validateContactForm = (req, res, next) => {
    const { name, email, subject, message } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    // Kiểm tra độ dài các trường
    if (name.length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Name must be at least 2 characters long'
        });
    }

    if (subject.length < 3) {
        return res.status(400).json({
            success: false,
            message: 'Subject must be at least 3 characters long'
        });
    }

    if (message.length < 10) {
        return res.status(400).json({
            success: false,
            message: 'Message must be at least 10 characters long'
        });
    }

    next();
}; 