import app from './server';

app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${process.env.PORT}!`);
});

