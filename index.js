const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoute');

// => Middleware
app.use(cors());
app.use(express.json());

// => Mongoose DB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/authentication")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// => Server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// => All Global Error Handler
app.use((err, req, res, next) => {
    err.statsCode = err.statsCode || 500;
    err.status = err.status || 'error';

    res.status((err.statsCode)).json({
        status: err.status,
        message: err.message
    });
})

// => Routes
app.use('/api/auth', authRouter);
