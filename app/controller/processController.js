'use strict';

const {spawn, exec} = require('child_process');

const $ = require('jquery');

// const fixPath = require('fix-path')();

// const highlight = require('highlight-bash-syntax')

let cpPidsArr = [];

let execShellFn = (command, args, options, platform) => {

    return new Promise((resolve) => {
        if (command === 'exit server') {
            console.log('taskkill /f /t /pid ' + cpPidsArr[0]);
            if (platform == 'darwin') {

            } else {
                exec('taskkill /f /t /pid ' + cpPidsArr[0]);
                // exec('taskkill /f /t /pid ' + global.childProcessPidArr[0]);
                
            }
            // process.kill(cpPidsArr[0]);
            // spawn('taskkill',['/f /t /pid' + cpPidsArr[0]]);

            return ;    
        }
        console.log(command, args, options)
        let childProcess = spawn(command, args, options);
        let pid = childProcess.pid;
            
        // command === 'exit server' && (() => {
        //     console.log(pid22, cpPidsArr)
        //     process.kill(parseInt(pid22), 'SIGNUP');
        // })();
        
        childProcess.stdout.on('data', (data) => {
            pid = childProcess.pid;
            cpPidsArr.indexOf(pid) == -1 && cpPidsArr.push(pid);
            // global.childProcessPidArr.indexOf(pid) == -1 && global.childProcessPidArr.push(pid);
            
            
            $('.log-tab-box code').append(`<p>${(new Buffer(data.join(',').replace(/(27,91,48,109,)|(27,91,48,109)|(27,91,51,54,109)|(27,91,51,50,109)/g, '').split(','))).toString().replace(/(GET)/g, '<i style="color: green">$1</i>')}</p>`);
            console.log(data);

            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
              });
            // $('.log-tab-box').append(`<p>${highlight(data)}</p>`);
            
            $('.main-box')[0].scrollTop = $('.main-box')[0].scrollHeight;  
            
            console.log(pid, cpPidsArr)
        });
    
        childProcess.on('exit', function (code) {
            $('.log-tab-box code').append('child process exited with code ' + code + '\n');
            cpPidsArr.splice(cpPidsArr.indexOf(pid), 1);
            console.log(pid, cpPidsArr)
            resolve();
        });
    
        childProcess.stderr.on('data', function (data) {
            $('.log-tab-box code').append('stderr: ' + data + '\n');
        });
    });

};



module.exports = {
    execShellFn: execShellFn
};