function handleCustomError(error) {
    if (error && error.message) {
        throw new Error(error.message);
    } else {
        const internalError = new Error('Internal Server Error');
        internalError.status = 500;
        throw internalError;
    }
}

const internalError = (error, res) => {
    console.error(error);

    try {
        handleCustomError(error);
    } catch (customError) {
        res.status(500).json({
            message: customError.message,
        });
        return;
    }
    res.status(500).json({
        message: 'Internal server error',
    });
};
export {
    internalError,
};