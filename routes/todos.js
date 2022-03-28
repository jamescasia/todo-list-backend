const router = require("express").Router();
let Todo = require("../models/todo.model");

/** TODO
 * delete whole database
 * 
 * 
 * */

router.route("/add").post((req, res) => {
    const todo = Todo(req.body);
    todo
        .save()
        .then(() =>
            res.status(200).json({ error: null, message: "Successfully added task." })
        )
        .catch((error) => res.status(400).json({ error }));
});

router.route("/:username").get((req, res) => {
    const username = req.params.username;
    Todo.find({ username })
        .then((todos) => res.status(200).json({ error: null, body: todos }))
        .catch((error) => res.status(400).json({ error }));
});

router.route("/:id").post((req, res) => {
    const newTodo = req.body;

    Todo.updateOne({ _id: req.params.id }, newTodo)
        .then(() =>
            res
            .status(200)
            .json({ error: null, message: "Successfully updated task" })
        )
        .catch((error) => res.status(400).json({ error }));
});

router.route("/:id").delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() =>
            res
            .status(200)
            .json({ error: null, message: "Successfully deleted task" })
        )
        .catch((error) => res.status(400).json({ error }));
});

module.exports = router;