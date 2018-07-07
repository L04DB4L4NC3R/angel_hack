const cp = require("child_process");
const util = require("util");

cp.exec = util.promisify(cp.exec);




exports.rm = (file)=>{
    return new Promise((resolve,reject)=>{
        cp.exec(`rm -rf ${file}`)
        .then(d=>resolve(d))
        .catch(err=>reject(err));
    })
}