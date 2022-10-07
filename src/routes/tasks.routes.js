const router = require('express').Router();
const validarJWT = require('../middlewares/validar-jwt');
const Tasks = require('../models/Tasks');

router.post('/task', [
    validarJWT
], async (req, res) => {
    const { title, description } = req.body;

    const task = new Tasks({
        title,
        description,
        userId: req.user.uid
    });
    const newTask = task.save();

    return res.json(newTask)
});


router.get('/task', [
    validarJWT
], async (req, res) => {

    const tasks = await Tasks.find({ userId: req.user.uid });

    return res.json(tasks);
})

module.exports = router;