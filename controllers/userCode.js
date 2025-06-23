const userCode =  (req, res) => {
    const { shortcode } = req.params;
    const record = shortUrls.get(shortcode);

    if (!record) {
        return res.status(404).send('Url Not Found');
    }

    const currentTime = new Date();
    const expiryTime = new Date(record.expiry);

    if (currentTime > expiryTime) {
        shortUrls.delete(shortcode);
        return res.status(410).json({
            message: 'Url has expired',
            success: false,
            error:true,
            
        });
    }

    res.redirect(record.originalUrl);
};