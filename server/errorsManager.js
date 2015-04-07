module.exports = function(app){
app.use(function (err, req, res, next) {
    console.log("in error management error =" + JSON.stringify(err));
    if (err.name === "ValidationError") {
        res.json(400, err);
    }
    else {
        res.json(500, err);
    }
});
}