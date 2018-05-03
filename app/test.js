// const {spawn} = require('child_process');
// // const ls = spawn('node\ -v');
// // const ls = spawn('node stdoutDemo.js');
// // const ls = spawn('cd', {cwd: '/home/ubuntu/distro'});
// // const ls = spawn('cat', ['package.json'], {cwd: '../CodeReviewer/istanbulPro'})
// const ls = spawn('dir');

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// // const { spawn } = require('child_process');
// // const grep = spawn('grep', ['ssh']);

// // grep.on('close', (code, signal) => {
// //   console.log(
// //     `child process terminated due to receipt of signal ${signal}`);
// // });

// // // Send SIGHUP to process
// // grep.kill('SIGHUP');

let newsSubpageRender = function(
  {
    spid,
    newsRequestOptions = {
      url = DEFAULT_NEWS_REQUEST_URL,
      query,
      retnum = 8,
      cache_time = 300,
      pageturn = 1

    },
    recommendRequest = {
      url = DEFUALT_RECOMMEND_REQUEST_URL,
      channel = '推荐',
      limit = 8
    }
  }
  ) {
    console.log(newsRequestOptions)
}

newsSubpageRender({
  spid: 123,
  newsRequestOptions: {
    query: 123
  }
})