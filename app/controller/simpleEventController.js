'use strict';

const $ = require('jquery');

const {remote} = require('electron');
const {Menu, MenuItem} = remote;
const menu = new Menu();


let eventHandler = () => {
    menu.append(new MenuItem({label: 'Open workspace folder', click() {
         console.log('item 1 clicked') 
    }}));

    menu.append(new MenuItem({label: 'Open ued folder', click() {
        console.log('item 1 clicked') 
    }}));

    menu.append(new MenuItem({label: 'Open cdn tools folder', click() {
        console.log('item 1 clicked') 
    }}));

    menu.append(new MenuItem({type: 'separator'}))

    
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      menu.popup(remote.getCurrentWindow())
    }, false)

    const tabsArr = $('.nav-button');
    const fnButtonsArr = $('.btn-action');
    
    fnButtonsArr.each((index, item) => {
        $(item).on('click', () => {
            console.log('show log')
            tabsArr.removeClass('tab-active-dashboard').removeClass('tab-active-config');
            $('.btn-show-log').addClass('tab-active-dashboard');
            $('.main-box')[0].scrollTop = $('.main-box')[0].scrollHeight; 
        });
    });
    
    tabsArr.each((index, item) => {
        let _this = $(item);
        _this.on('click', () => {
            tabsArr.removeClass('tab-active-dashboard').removeClass('tab-active-config');
    
            _this.closest('div').hasClass('item-dashboard') ? 
                _this.addClass('tab-active-dashboard') : _this.addClass('tab-active-config');
            $('.main-box')[0].scrollTop = $('.main-box')[0].scrollHeight;  
        });
    });
    
    
    const tabBoxArr = $('.tab-box');
    
    let timer1 = null;
    let timer2 = null;
    $('.btn-show-log, .btn-action').on('click', () => {
        clearTimeout(timer2);
        tabBoxArr.each((index, item) => {
            $(item).removeClass('active-tab');
    
            if ($(item).hasClass('log-tab-box')) {
                $(item).show().addClass('active-tab');
            } else {
                timer1 = setTimeout(() => {
                    $(item).hide();
                }, 400);
            }   
        });

        $('.main-box')[0].scrollTop = $('.main-box')[0].scrollHeight; 
    });
    
    
    $('.btn-config-path').on('click', () => {
        clearTimeout(timer1);
        tabBoxArr.each((index, item) => {
            $(item).removeClass('active-tab');
    
            if ($(item).hasClass('config-path-tab-box')) {
                $('.main-box')[0].scrollTop = 0; 
                $(item).show().addClass('active-tab');
            } else {
                timer2 = setTimeout(() => {
                    $(item).hide();
                }, 400);
            }   
        });
    });
    

    //init show first active tab
    $('.log-tab-box').addClass('active-tab');
    $('.config-path-tab-box').hide();
}


module.exports = {
    initSimpleEventHanlder: eventHandler
}
