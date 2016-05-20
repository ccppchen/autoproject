/*======================================================
************   Modals   ************
======================================================*/
/*jshint unused: false*/
/* global $:true */ 
+function ($) {
  "use strict";
    $.fn.transitionEnd = function(callback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
            i, dom = this;

        function fireCallBack(e) {
            /*jshint validthis:true */
            if (e.target !== this) return;
            callback.call(this, e);
            for (i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (i = 0; i < events.length; i++) {
                dom.on(events[i], fireCallBack);
            }
        }
        return this;
    };
    var _modalTemplateTempDiv = document.createElement('div');
    $.modal = function (params) {
        params = params || {};
        var modalHTML = '';
        var buttonsHTML = '';
        if (params.buttons && params.buttons.length > 0) {
            for (var i = 0; i < params.buttons.length; i++) {
                buttonsHTML += '<button class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</button>';
            }
        }
        var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
        var afterTextHTML = params.afterText ? params.afterText : '';
        var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical' : '';
        modalHTML = '<div class="modal ' + noButtons + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML + '</div></div>';
        
        _modalTemplateTempDiv.innerHTML = modalHTML;

        var modal = $(_modalTemplateTempDiv).children();

        $(defaults.modalContainer).append(modal[0]);
        
        // Add events on buttons
        modal.find('.modal-button').each(function (index, el) {
            $(el).on('click', function (e) {
                if (params.buttons[index].close !== false) $.closeModal(modal);
                if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
                if (params.onClick) params.onClick(modal, index);
            });
        });
        $.openModal(modal);
        return modal[0];
    };
    $.alert = function (text, title, callbackOk) {
        if (typeof title === 'function') {
            callbackOk = arguments[1];
            title = undefined;
        }
        return $.modal({
            text: text || '',
            title: typeof title === 'undefined' ? defaults.modalTitle : title,
            buttons: [ {text: defaults.modalButtonOk, bold: true, onClick: callbackOk} ]
        });
    };
    $.confirm = function (text, title, callbackOk, callbackCancel) {
        if (typeof title === 'function') {
            callbackCancel = arguments[2];
            callbackOk = arguments[1];
            title = undefined;
        }
        return $.modal({
            text: text || '',
            title: typeof title === 'undefined' ? defaults.modalTitle : title,
            buttons: [
                {text: defaults.modalButtonCancel, onClick: callbackCancel},
                {text: defaults.modalButtonOk, bold: true, onClick: callbackOk}
            ]
        });
    };
    
    //显示一个消息，会在2秒钟后自动消失
    $.toast = function(msg, time) {
      var $toast = $("<div class='modal toast'></div>").append(msg).appendTo(document.body);
      $.openModal($toast);
      setTimeout(function() {
        $.closeModal($toast);
      }, time || 2000);
    };
    $.openModal = function (modal) {
        if(defaults.closePrevious) $.closeModal();
        modal = $(modal);
        var isModal = modal.hasClass('modal');
        if ($('.modal.modal-in:not(.modal-out)').length && defaults.modalStack && isModal) {
            $.modalStack.push(function () {
                $.openModal(modal);
            });
            return;
        }
        var isPopup = modal.hasClass('popup');
        var isToast = modal.hasClass('toast');

        if ($('.modal-overlay').length === 0 && !isPopup) {
            $(defaults.modalContainer).append('<div class="modal-overlay"></div>');
        }

        // Trugger open event
        modal.trigger('open');

        // Classes for transition in
        if (!isToast) $('.modal-overlay').addClass('modal-overlay-visible');
        modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
            if (modal.hasClass('modal-out')) modal.trigger('closed');
            else modal.trigger('opened');
        });
        return true;
    };
    $.closeModal = function (modal) {
        modal = $(modal || '.modal-in');
        if (typeof modal !== 'undefined' && modal.length === 0) {
            return;
        }
        var isModal = modal.hasClass('modal');
        var isPopup = modal.hasClass('popup');
        var isPickerModal = modal.hasClass('picker-modal');

        var removeOnClose = modal.hasClass('remove-on-close');

        var overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
        if (isPopup){
            if (modal.length === $('.popup.modal-in').length) {
                overlay.removeClass('modal-overlay-visible');    
            }  
        }
        else if (!isPickerModal) {
            overlay.removeClass('modal-overlay-visible');
        }

        modal.trigger('close');

        modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
            if (modal.hasClass('modal-out')) modal.trigger('closed');
            else modal.trigger('opened');

            if (isPopup) {
                modal.removeClass('modal-out').hide();
                if (removeOnClose && modal.length > 0) {
                    modal.remove();
                }
            }
            else {
                modal.remove();
            }
        });
        return true;
    };

    var defaults = $.modal.prototype.defaults = {
      modalButtonOk: '知道了',
      modalButtonCancel: '取消',
      modalContainer : document.body,
      modalCloseByOutside: true,
      closePrevious: false  //close all previous modal before open
    };

    /*购物车编辑提示*/
    // $.modal({
    //     text: '确认将这15个商品删除？',
    //     buttons: [
    //         {
    //             text: '取消',
    //             onClick: function() {

    //             }
    //         },
    //         {
    //             text: '确定',
    //             onClick: function() {

    //             }
    //         }
    //     ]
    // });

    /*购物车－不能合并结算*/
    // $.modal({
    //     title: '<span style="color:#666;">抱歉，全球购直邮/保税商品/百联卡<br />需单独结算</span>',
    //     text: '<div class="shop-choose">' +
    //             '<ul>' + 
    //                 '<li>' +
    //                     '<label>' +
    //                         '<input type="radio" name="shop-choose" value="" placeholder="">' +
    //                         '<h2 class="shop-title">全球购自营商品</h2>' + 
    //                         '<p class="shop-text">包含直邮/保税商品（0）</p>' +
    //                     '</label>' +
    //                 '</li>' +
    //                 '<li>' +
    //                     '<label>' +
    //                         '<input type="radio" name="shop-choose" value="" placeholder="">' +
    //                         '<h2 class="shop-title">全球购自营商品</h2>' + 
    //                         '<p class="shop-text">包含直邮/保税商品（0）</p>' +
    //                     '</label>' +
    //                 '</li>' +
    //                 '<li>' +
    //                     '<label>' +
    //                         '<input type="radio" name="shop-choose" value="" placeholder="">' +
    //                         '<h2 class="shop-title">全球购自营商品</h2>' + 
    //                         '<p class="shop-text">包含直邮/保税商品（0）</p>' +
    //                     '</label>' +
    //                 '</li>' +
    //             '</ul>' +
    //         '</div>',
    //     buttons: [
    //       {
    //         text: '返回购物车',
    //         onClick: function() {
              
    //         }
    //       },
    //       {
    //         text: '去结算',
    //         onClick: function() {
              
    //         }
    //       }
    //     ]
    // });

    /*价格变化提示*/
    // $.modal({
    //     title: '部分商品价格发生变化<br />请确认后再下单',
    //     text: '',
    //     buttons: [
    //       {
    //         text: '返回购物车选择',
    //         onClick: function() {
    //           // $.toast("数量超出范围了~", 2000);
    //           // $.toast("商品不能再减少了~", 2000);
    //           // $.toast("商品不能购买更多了~", 2000);
    //           $.toast('<div><img src="../img/icon-check.png" style="width:auto;height:.7rem;margin-right:.25rem;vertical-align: middle;" alt="" /><span style="vertical-align: middle;">收藏成功</span></div><p style="color:#999; line-height: .9rem; margin-top: .5rem;">您可以在我的i百联,<br />我收藏的商品中找到</p>')
    //         }
    //       },
    //       {
    //         text: '继续下单',
    //         onClick: function() {
              
    //         }
    //       }
    //     ]
    // });

    /*选择赠品*/
    // $.modal({
    //     title: '所选商品满足满赠/换购条件<br />尚未选择赠品/换购商品',
    //     text: '',
    //     buttons: [
    //       {
    //         text: '返回购物车选择',
    //         onClick: function() {
    //           // $.toast("数量超出范围了~", 2000);
    //           // $.toast("商品不能再减少了~", 2000);
    //           // $.toast("商品不能购买更多了~", 2000);
    //           $.toast('<div><img src="../img/icon-check.png" style="width:auto;height:.7rem;margin-right:.25rem;vertical-align: middle;" alt="" /><span style="vertical-align: middle;">收藏成功</span></div><p style="color:#999; line-height: .9rem; margin-top: .5rem;">您可以在我的i百联,<br />我收藏的商品中找到</p>')
    //         }
    //       },
    //       {
    //         text: '继续下单',
    //         onClick: function() {
              
    //         }
    //       }
    //     ]
    // });
    
    /*全球购订单超额*/
    // $.modal({
    //     title: '根据海关总署规定，全球购单笔订单总价不可超过2000元，请返回购物车修改',
    //     buttons: [
    //       {
    //         text: '返回购物车',
    //         onClick: function() {
    //           $
    //         }
    //       }
    //     ]
    // });

    /*运费规则说明*/
    // $.alert('<div style="margin-left:-.5rem; margin-right: .5rem;width:13.8rem; padding: .75rem 1.25rem 0;text-align:left;font-size:.6rem;line-height:1.05rem;border-top: 1px solid #e7e7e7;"><p>1.全球购跨境保税商品从不同保税区仓库发货，需要向海关及国检进行订单信息申报、备案及清关等操作，货物配送到您手中的配送时间会有所不同，一般您下单支付成功后3-5个工作日左右发货。</p><p>2.如遇上海关国检抽检、节假日或其他不可抗力（海关系统维护、航班延误、地震、冰灾、交通事故等）导致的异常情况，将会影响订单发货时效。</p></div>', '<span style="font-weight:bolder;font-size:.9rem;">运费规则</span>');

    /*toast提示*/
    // $.toast("数量超出范围了~", 200000);
    // $.toast("商品不能再减少了~", 2000);
    // $.toast("商品不能购买更多了~", 2000);
    // $.toast('<div><img src="../img/icon-check.png" style="width:auto;height:.7rem;margin-right:.25rem;vertical-align: middle;" alt="" /><span style="vertical-align: middle; font-size: 0.7rem;">收藏成功</span></div><p style="color:#999; line-height: .9rem; margin-top: .4rem;font-size:.6rem;">您可以在我的i百联,<br />我收藏的商品中找到</p>', 200000);
}($);
