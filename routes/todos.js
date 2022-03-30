const router = require("express").Router();
const jwt = require("jsonwebtoken");

let Todo = require("../models/todo.model");

const verifyToken = (req, res, next) => {
    const token = req.body.token;
    const username = req.body.username;
    tokenValid = jwt.verify(
        token,
        process.env.DB_AUTH_KEY,
        (error, decoded) => {
            if (decoded) {
                if (decoded.username == username) {
                    next();
                } else {
                    res.status(400).json({ error: "unauthorized" });
                }
            } else res.status(400).json({ error });
        }
    );
};

router.use(verifyToken);
router.route("/add").post(verifyToken, (req, res) => {
    const todo = Todo(req.body.todo);

    todo.save()
        .then(() =>
            res.status(200).json({
                error: null,
                message: "Successfully added task.",
            })
        )
        .catch((error) => res.status(400).json({ error }));
});

router.route("/fetch").get(verifyToken, (req, res) => {
    const username = req.body.username;

    Todo.find({ username })
        .then((todos) => res.status(200).json({ error: null, body: todos }))
        .catch((error) => res.status(400).json({ error }));
});

router.route("/update").post(verifyToken, (req, res) => {
    const newTodo = req.body.todo;
    const todo_id = req.body.id;

    Todo.updateOne({ _id: todo_id }, newTodo)
        .then(() =>
            res
            .status(200)
            .json({ error: null, message: "Successfully updated task" })
        )
        .catch((error) => res.status(400).json({ error }));
});

router.route("/delete").delete(verifyToken, (req, res) => {
    Todo.findByIdAndDelete(req.body.id)
        .then(() =>
            res
            .status(200)
            .json({ error: null, message: "Successfully deleted task" })
        )
        .catch((error) => res.status(400).json({ error }));
});

module.exports = router;