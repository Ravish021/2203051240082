const shortUrls = new Map();

const shorturl = (req, res) => {
    const { url, validity = 30, shortcode } = req.body;
    try {
        new URL(url);
    } catch (err) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
 
    let finalCode = shortcode || crypto.randomBytes(3).toString('hex');

    if (shortUrls.has(finalCode)) {
        return res.status(409).json({ 
            error: 'In Use You can use other url' ,
            success: false
            
        });
    }

    const expiry = new Date(Date.now() + validity * 60000).toISOString();

    shortUrls.set(finalCode, {
        originalUrl: url,
        expiry
    });

    return res.status(201).json({
        shortLink: `http://localhost:${PORT}/${finalCode}`,
        expiry
    });
};