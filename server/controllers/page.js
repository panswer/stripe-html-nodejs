const path = require('path');

const LoagIndex = (req, res) => {
    try {
        let pathIndex = path.resolve(__dirname, '../../public/index.html');
        res.sendFile(pathIndex);
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
}

module.exports = {
    LoagIndex
}