'use strict';

const $ = require('jquery');
const {execShellFn} = require('./processController');

let initServerController = () => {
    $('.btn-start-server').on('click', () => {
        async function runAsyncShell() {
            
            await execShellFn('node', ['server'], 
                {
                    cwd: '../', 
                    shell: true
                },
                process.platform.toLowerCase()
            );

            // await execShellFn(/*process.platform === "win32" ? "npm.cmd" : */"npm", ['start'], 
            //     {
            //         cwd: '../CodeReviewer/istanbulPro', 
            //         shell: true
            //     },
            //     process.platform.toLowerCase()
            // );
        }
        
        runAsyncShell();
    });
    
    $('.btn-stop-server').on('click', () => {
        // execShellFn('cd D:/lynn_work_fe/svn/liuyipin/CodeReviewer/istanbulPro & PORT=8088 babel-node server');
        execShellFn('exit server');
    
    });
}

module.exports = {
    initServerController: initServerController
};