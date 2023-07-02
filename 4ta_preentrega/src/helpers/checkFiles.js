module.exports = function checkFiles(files, arg, options) {

    const find = files.find(e => e.name === arg)
    console.log("🚀 ~ file: checkFiles.js:4 ~ checkFiles ~ find:", find)
    if (find) {
        return options.fn(this);

    } else {
        return options.inverse(this);
    }
};
