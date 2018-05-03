'use strict';



const {spawn} = require('child_process');

const $ = require('jquery');

let cpPid = null;

let execShellFn = (command, args) => {
    let childProcess = spawn(command, args);

    
    command === 'exit server' && (() => {
        console.log(cpPid)
        process.kill(parseInt(cpPid));
    })();
    
    childProcess.stdout.on('data', (data) => {
        cpPid = childProcess.pid;
        $('.log-tab-box').append(`<p>${data}</p>${childProcess.pid}${cpPid}`);

        $('.log-tab-box')[0].scrollTop = $('.log-tab-box')[0].scrollHeight;  

    });

    childProcess.on('exit', function (code) {
        $('.log-tab-box').append('child process exited with code ' + code + '\n');
    });

    childProcess.stderr.on('data', function (data) {
        $('.log-tab-box').append('stderr: ' + data + '\n');
    });

};



module.exports = {
    execShellFn: execShellFn
};