const express = require('express');
const { TodoModel } = require('../models/todo'); 
const router = express.Router();

router.get('/', (req, res) => {
    TodoModel.findAll()
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            console.error('Error fetching todos:', err);
            res.status(500).json({ error: 'Internal Server Error' });
    });
});

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Lấy danh sách items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Danh sách items
 */
router.get('/hello', (req, res) => {
  res.json([{ id: 1, name: 'Item One' }]);
});


router.post('/', async (req, res) => {
    if (req.body === undefined || req.body.title === undefined || req.body.title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    let existingTodo = await TodoModel.findOne({ where: { title: req.body.title } });
    if (existingTodo) {
        return res.status(400).json({ error: 'Todo with this title already exists' });
    }
    
    let saved = {
        title: req.body.title   
    };

    TodoModel.create(saved).then(todo => {
        res.status(201).json(todo);
    }).catch(err => {
        console.error('Error creating todo:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});
/**
 * @swagger
 * /todos/completed/{id}:
 *   get:
 *     summary: Lấy thông tin todo theo ID và trạng thái hoàn thành
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID của todo
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: completed
 *         description: Trạng thái hoàn thành của todo
 *         required: true
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Todo update successfully
 */
router.patch('/complete/:id', async (req, res) => {
    let existingTodo = TodoModel.findByPk(req.path.id);
    if (existingTodo === null) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    existingTodo.completed = req.params.completed
    await existingTodo.save();
    res.json(existingTodo);
})

module.exports = { router };