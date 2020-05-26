import app from './app';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server Started at Port ${port}`);
});
