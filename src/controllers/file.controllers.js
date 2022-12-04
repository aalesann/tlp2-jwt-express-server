const File = require('../models/File');
const ctrlFile = {};

ctrlFile.uploadFile = async (req, res) => {
    try {
        const { file } = req.files;
        const { name, mimetype, size } = file;
        const exthname = mimetype.split('/')[1];
        const path = `./src/public/files/${name}`;
        const newFile = new File({ name, exthname, path });
        await newFile.save();
        await file.mv(path);
        res.json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};




module.exports = ctrlFile;