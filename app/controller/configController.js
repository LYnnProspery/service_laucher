'use strict';

const $ = require('jquery');
const fs = require('fs');
const path = require('path');
const swal = require('sweetalert');
const dialog = require('electron').remote.dialog;

const LOCAL_CONFIG_PATH = '../localserver.json';
let lastestConfig = {};

let initConfig = () => {
    let config = '';

    readLocalConfig()
    .then((configData) => {
        config = JSON.parse(configData);

        renderConfig(config);
    })
    .catch((err) => {
        // alert('Error during saving, err:' + err);
        // swal("Save Error!", err, "error");
        console.log(err);
    });
};

let initModifyConfigHandler = () => {
    $('.config-path-tab-box .btn-confirm-config-path').on('click', () => {
        let config = {
            // name: '' || $('.config-item-name').text(),
            port: '' || $('.config-item-port').val(),
            localWorkSpace: '' || $('.config-item-localworkspace').text(),
            svn: '' || $('.config-item-svn').val(),
            ued: '' || $('.config-item-ued').text(),
            trunk: '' || $('.config-item-trunk').text()
        };
        
        // isConfigValidate(config) && saveLocalConfig();
        if (isConfigValidate(config)) {
            saveLocalConfig(config)
            .then(() => {
                swal("Save success!", "Your config saved success!", "success");
                lastestConfig = config;
            })
            .catch((err) => {
                swal("Save Error!", err, "error");
            });
    
        } else {
            swal("Config invalide!", 'Config is incomplete, please check again', "error");
        }
    
    });

    $('.btn-cancel-config-path').on('click', () => {
        
        $('.config-item-port').val(lastestConfig.port);
        $('.config-item-localworkspace').text(lastestConfig.localWorkSpace);
        $('.config-item-svn').val(lastestConfig.svn);
        $('.config-item-ued').text(lastestConfig.ued);
        $('.config-item-trunk').text(lastestConfig.trunk);
    });

    $('.config-path-tab-box .container button').on('click', function() {
        let _this = $(this);
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
          }, function (files) {
              console.log(files[0]);
              _this.text(files[0]);
        });
    });
};


function isConfigValidate(config) {
    console.log(config)
    for (let key of Object.keys(config)) {
        console.log(key, config[key].trim())
        if (config[key].trim() === '') {
            return false;
        }
    }
    return true;
}
 
function saveLocalConfig(config) {
    let formattedConfig = {
        "cnName": "CDN管理工具",
        "port": parseInt(config.port),
        "cdnConfig": {
            "trunkLocalPath": config.trunk,
            "uedLocalPath": config.ued,
            "workspace": config.localWorkSpace,
            "workspaceUrl": config.svn,
        }
    }
    return new Promise((resolve) => {
        let writeStream = fs.createWriteStream(LOCAL_CONFIG_PATH);
        
        writeStream.end(JSON.stringify(formattedConfig), () => {
            resolve();
        });
    });
}

function readLocalConfig() {
    return new Promise((resolve) => {
        fs.readFile(LOCAL_CONFIG_PATH, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            resolve(data);
        });
    });
}

function renderConfig(data) {

    let port = data.port,
        localWorkSpace = data.cdnConfig.workspace,
        svn = data.cdnConfig.workspaceUrl,
        ued = data.cdnConfig.uedLocalPath,
        trunk = data.cdnConfig.trunkLocalPath;

    lastestConfig = {
        port: port,
        localWorkSpace: localWorkSpace,
        svn: svn,
        ued: ued,
        trunk:trunk 
    };

    $('.config-item-port').val(port);
    $('.config-item-localworkspace').text(localWorkSpace);
    $('.config-item-svn').val(svn);
    $('.config-item-ued').text(ued);
    $('.config-item-trunk').text(trunk);
}

module.exports = {
    initConfig: initConfig,
    initModifyConfigHandler: initModifyConfigHandler
    
}