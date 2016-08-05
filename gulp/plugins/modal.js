var _modalTemplateTempDiv = document.createElement('div');

$.modalStack = [];

$.modal = function(params) {
    params = params || {};
    var modalHTML = '';
    if (defaults.modalTemplate) {
        if (!$._compiledTemplates.modal) $._compiledTemplates.modal = t7.compile(defaults.modalTemplate);
        modalHTML = $._compiledTemplates.modal(params);
    } else {
        var buttonsHTML = '';
        if (params.buttons && params.buttons.length > 0) {
            for (var i = 0; i < params.buttons.length; i++) {
                buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
            }
        }
        var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
        var afterTextHTML = params.afterText ? params.afterText : '';
        var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical' : '';
        modalHTML = '<div class="modal ' + noButtons + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML + '</div></div>';
    }

    _modalTemplateTempDiv.innerHTML = modalHTML;

    var modal = $(_modalTemplateTempDiv).children();

    $(defaults.modalContainer).append(modal[0]);

    // Add events on buttons
    modal.find('.modal-button').each(function(index, el) {
        $(el).on('click', function(e) {
            if (params.buttons[index].close !== false) $.closeModal(modal);
            if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
            if (params.onClick) params.onClick(modal, index);
        });
    });
    $.openModal(modal);
    return modal[0];
};

$.pickerModal = function(pickerModal, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof pickerModal === 'string' && pickerModal.indexOf('<') >= 0) {
        pickerModal = $(pickerModal);
        if (pickerModal.length > 0) {
            if (removeOnClose) pickerModal.addClass('remove-on-close');
            $(defaults.modalContainer).append(pickerModal[0]);
        } else return false; //nothing found
    }
    pickerModal = $(pickerModal);
    if (pickerModal.length === 0) return false;
    pickerModal.show();
    $.openModal(pickerModal);
    return pickerModal[0];
};
$.openModal = function(modal) {
    if (defaults.closePrevious) $.closeModal();
    modal = $(modal);
    var isModal = modal.hasClass('modal');
    if ($('.modal.modal-in:not(.modal-out)').length && defaults.modalStack && isModal) {
        $.modalStack.push(function() {
            $.openModal(modal);
        });
        return;
    }
    var isPopover = modal.hasClass('popover');
    var isPopup = modal.hasClass('popup');
    var isLoginScreen = modal.hasClass('login-screen');
    var isPickerModal = modal.hasClass('picker-modal');
    var isToast = modal.hasClass('toast');
    if (isModal) {
        modal.show();
        modal.css({
            marginTop: -Math.round(modal.outerHeight() / 2) + 'px'
        });
    }
    if (isToast) {
        modal.show();
        modal.css({
            marginLeft: -Math.round(modal.outerWidth() / 1.18 / 2) + 'px' //
        });
    }

    var overlay;
    if (!isLoginScreen && !isPickerModal && !isToast) {
        if ($('.modal-overlay').length === 0 && !isPopup) {
            $(defaults.modalContainer).append('<div class="modal-overlay"></div>');
        }
        if ($('.popup-overlay').length === 0 && isPopup) {
            $(defaults.modalContainer).append('<div class="popup-overlay"></div>');
        }
        overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
    }

    //Make sure that styles are applied, trigger relayout;
    var clientLeft = modal[0].clientLeft;

    // Trugger open event
    modal.trigger('open');

    // Picker modal body class
    if (isPickerModal) {
        $(defaults.modalContainer).addClass('with-picker-modal');
    }

    // Classes for transition in
    if (!isLoginScreen && !isPickerModal && !isToast) overlay.addClass('modal-overlay-visible');
    modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function(e) {
        if (modal.hasClass('modal-out')) modal.trigger('closed');
        else modal.trigger('opened');
    });
    return true;
};
$.closeModal = function(modal) {
    modal = $(modal || '.modal-in');
    if (typeof modal !== 'undefined' && modal.length === 0) {
        return;
    }
    var isModal = modal.hasClass('modal');
    var isPopover = modal.hasClass('popover');
    var isPopup = modal.hasClass('popup');
    var isLoginScreen = modal.hasClass('login-screen');
    var isPickerModal = modal.hasClass('picker-modal');

    var removeOnClose = modal.hasClass('remove-on-close');

    var overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
    if (isPopup) {
        if (modal.length === $('.popup.modal-in').length) {
            overlay.removeClass('modal-overlay-visible');
        }
    } else if (!isPickerModal) {
        overlay.removeClass('modal-overlay-visible');
    }

    modal.trigger('close');

    // Picker modal body class
    if (isPickerModal) {
        $(defaults.modalContainer).removeClass('with-picker-modal');
        $(defaults.modalContainer).addClass('picker-modal-closing');
    }

    if (!isPopover) {
        modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function(e) {
            if (modal.hasClass('modal-out')) modal.trigger('closed');
            else modal.trigger('opened');

            if (isPickerModal) {
                $(defaults.modalContainer).removeClass('picker-modal-closing');
            }
            if (isPopup || isLoginScreen || isPickerModal) {
                modal.removeClass('modal-out').hide();
                if (removeOnClose && modal.length > 0) {
                    modal.remove();
                }
            } else {
                modal.remove();
            }
        });
        if (isModal && defaults.modalStack) {
            $.modalStackClearQueue();
        }
    } else {
        modal.removeClass('modal-in modal-out').trigger('closed').hide();
        if (removeOnClose) {
            modal.remove();
        }
    }
    return true;
};


var defaults = $.modal.prototype.defaults = {
    modalContainer: document.body
};

$(function() {
    $(document).on('click', '.close-picker', function() {
        $.closeModal('.modal.modal-in');
    });
});
