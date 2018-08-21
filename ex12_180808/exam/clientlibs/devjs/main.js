(function (win, $) {
    'use strict'
    win.smg = win.smg || {};
    win.smg.support = win.smg.support || {};
    win.smg.support.common = win.smg.support.common || {};

    var UTIL = win.smg.support.common.util,
        BREAKPOINTS = win.smg.support.common.breakpoints,
        PAGE = win.smg.support.page,
        pluginName = 'manualDownloadPlugin',
        personaPluginName = 'personaPlugin',
        headerSectionPluginName = 'filterSearchPlugin',
        filterModulePluginName = 'filterManualDownloadPlugin';


    win.smg.support[pluginName] = function (container, args) {
        var defParams = {
            container : container,
            personaObj : '.manual-download-filter-new__persona',
            headerObj : '.manual-download-filter-new__header',
            filterObj : '.manual-download-filter-new__module',
            personaBoxPlugins : [],
            headerSectionPlugins : [],
            filterModulePlugins : []
        }
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.container)).length) return;
        this.init();
    };
    win.smg.support[pluginName].prototype  = {
        init : function () {
            this.setElement();
	    	this.manualDownloadPluginCall();
        },
        setElement : function(){
            this.personaBox = this.obj.find(this.opts.personaObj);
            this.headerSection = this.obj.find(this.opts.headerObj);
            this.filterModule = this.obj.find(this.opts.filterObj);
        },
        manualDownloadPluginCall : function(){
        	// 플러그인을 호출함
            var _this = this; // for문이 돌기전에 this를 저장
            //filter-new__persona-box
            for(var i=0, max=this.personaBox.length; i<max; i++){
                (function(index){
                    var target = _this.personaBox.eq(index);
                    _this.opts.personaBoxPlugins.push(new win.smg.support[personaPluginName](target));
                })(i);
            }

            //filter-new__header
            for(var i=0, max=this.headerSection.length; i<max; i++){
                (function(index){
                    var target = _this.headerSection.eq(index);
                    _this.opts.headerSectionPlugins.push(new win.smg.support[headerSectionPluginName](target));
                })(i);
            }

            //filter-new__module
            for(var i=0, max=this.filterModule.length; i<max; i++){
                (function(index){
                    var target = _this.filterModule.eq(index);
                    _this.opts.filterModulePlugins.push(new win.smg.support[filterModulePluginName](target));
                })(i);
            }
        }
    };


    // personaPlugIn
    win.smg.support[personaPluginName] = function (container, args) {
    	var defParams = {
    		container : container,
    		personaWarp : '.manual-download-filter-new__persona-list',
    		personaBox : '.manual-download-filter-new__persona-box',
    		personaChkboxWrap : '.manual-download-filter-new__persona-btn',
            personaCheckbox : '.support-checkbox__input',
			resetBtn : '.s-btn-reset',
    		notHoverClass : 's-detail-window',
    		activeClass : 'is-active',
    		checkedClass : 'is-checked',
    		disabledClass : 'is-disabled'
    	}
    	this.opts = UTIL.def(defParams, (args || {}));
    	if (!(this.obj = $(this.opts.container)).length) return;
    	this.init();
    };
    win.smg.support[personaPluginName].prototype = {
    	init : function () {
    		this.setElements();
    		this.initLayout();
    		this.resizeFunc();
    		this.bindEvents();
    	},
    	setElements : function () {
    		this.personaWarp = this.obj.find(this.opts.personaWarp); // personaList
    		this.personaBox = this.personaWarp.find(this.opts.personaBox);  // persona 박스 
    		this.personaChkboxWrap = this.personaBox.find(this.opts.personaChkboxWrap); // 다운로드 선택박스 (클레스제어)
    		this.personaCheckbox = this.personaChkboxWrap.find(this.opts.personaCheckbox); // input checked 상태제어
    		this.resetBtn = this.personaBox.find(this.opts.resetBtn);
    	},
    	initLayout : function () {
    		// 첫세팅 초기화 체크/엑티브 클레스 삭제 체크안된상태 && 리셋버튼 disabled상태 
    		this.personaBox.removeClass(this.opts.activeClass);
    		this.personaChkboxWrap.removeClass(this.opts.checkedClass);
    		this.personaCheckbox.prop('checked', false);
    		this.resetBtn.addClass(this.opts.disabledClass).prop('disabled', true);
    	},
        bindEvents : function(){
            $(win).on('resize', $.proxy(this.resizeFunc, this));
        },
        resizeFunc : function(){
            //resize 체크 최적화
            clearTimeout(this.resizePointchk);
            this.resizePointchk = setTimeout($.proxy(this.checkLayout, this), 150);
        },
    	checkLayout : function () {
    		if (UTIL.winSize().w >= BREAKPOINTS.MOBILE) {
    			// pc
	    		this.personaBox.on('mouseenter mouseleave', $.proxy(this.onHoverFunc, this));
	    		this.personaCheckbox.on('change', $.proxy(this.onChangeFunc, this));
	    		this.resetBtn.on('click', $.proxy(this.onResetFunc, this));
    		} else {
    			// mo pc이벤트 제거
    			this.personaBox.off('mouseenter mouseleave');
    			this.personaCheckbox.off('change');
    			this.resetBtn.off('click');
    		}
    	},
    	onHoverFunc : function (e) {
    		var target = $(e.currentTarget),
                isChecked = target.find(this.personaCheckbox).filter(':checked').length;

    		if (target.hasClass(this.opts.notHoverClass)) return;
    		// 오버 이벤트가 필요가 없을때 클레스로 체크함
    		if (e.type === 'mouseenter') {
	    		target.addClass(this.opts.activeClass);
    		} else if (e.type === 'mouseleave' && !isChecked) {
    			// 체크상태가 아니면서 마우스가 떠나면 active상태 해제
	    		target.removeClass(this.opts.activeClass);
    		}
    	},
    	onChangeFunc : function (e) {
    		var target = $(e.currentTarget),
				targetWrap = target.closest(this.personaBox),
				targetActive = target.closest(this.personaChkboxWrap),
				targetGroup = targetWrap.find(this.personaCheckbox); 

    		if (target.filter(':checked').length) {
    			targetActive.addClass(this.opts.checkedClass);
    		} else {
    			targetActive.removeClass(this.opts.checkedClass); 		
    		}

    		if (targetGroup.filter(':checked').length) {
    			// 현재 personabox의 체크된 아이가 input이 있으면 resetBut 활성화
                targetWrap.addClass(this.opts.activeClass);
                targetWrap.find(this.resetBtn).removeClass(this.opts.disabledClass).prop('disabled', false);
    		} else {
    			targetWrap.find(this.resetBtn).addClass(this.opts.disabledClass).prop('disabled', true);
    		}
    	},
    	onResetFunc : function (e) {
    		var target = $(e.currentTarget),
    			targetWrap = target.closest(this.personaBox);

    		targetWrap.find(this.personaChkboxWrap).removeClass(this.opts.checkedClass);
    		targetWrap.find(this.personaCheckbox).prop('checked', false);
    		// reset버튼 다시 disabled상태
    		target.addClass(this.opts.disabledClass).prop('disabled', true);
    	}
    }
    // headerPlugIn (search && dropdown filter)
    win.smg.support[headerSectionPluginName] = function (container, args) {
    	var defParams = {
    		container : container,
    		searchWrap : '.support-input__wrap',
    		searchInput : '.support-input__input',
    		searchLabel : '.support-input__label',
            searchClear : '.support-input__clear',
    		dropdownWrap : '.js-select-wrap',
    		dropdown : '.support-select__placeholder',
    		dropdownPlaceholder : '.js-align-placeholder > span',
    		dropdownList : '.support-select__options',
            openClass : 'is-opened',
    		selectItem : 'li > a',
    		ariaBlindTxt : '.blind',
    	}
    	this.opts = UTIL.def(defParams, (args || {}));
    	if (!(this.obj = $(this.opts.container)).length) return;
    	this.init();
    };
    win.smg.support[headerSectionPluginName].prototype = {
    	init : function () {
    		this.setElements();
    		this.initOpts();
    		this.initLayout();
    		this.bindEvents();
    	},
    	setElements : function () {
    		this.searchWrap = this.obj.find(this.opts.searchWrap);
    		this.searchInput = this.searchWrap.find(this.opts.searchInput);
    		this.searchLabel = this.searchWrap.find(this.opts.searchLabel);
            this.searchClear = this.searchWrap.find(this.opts.searchClear);
    		this.dropdownWrap = this.obj.find(this.opts.dropdownWrap);
    		this.dropdown = this.dropdownWrap.find(this.opts.dropdown);
    		this.dropdownPlaceholder = this.dropdown.find(this.opts.dropdownPlaceholder);
    		this.dropdownList = this.dropdownWrap.find(this.opts.dropdownList);
    		this.selectItem = this.dropdownList.find(this.opts.selectItem);
    		this.ariaBlindTxt = this.dropdownWrap.find(this.opts.ariaBlindTxt);
    	},
    	initOpts : function () {
    		// global text 셋팅
    		var globalText = this.dropdownWrap.data('global-text');
    		this.globalText = {
    			collapse : (globalText && globalText.Collapse) ? $.trim(globalText.Collapse) : '',
    			expand : (globalText && globalText.Expand) ? $.trim(globalText.Expand) : ''
    		};
    	},
    	initLayout : function () {
    		this.ariaBlindTxt.text(this.globalText.expand);
            this.dropdownList.hide();
    		this.dropdownList.attr('aria-hidden', true);
    	},
    	bindEvents : function () {
            this.searchInput.on('focusin focusout keyup keydown', $.proxy(this.inputEventFunc, this));
            this.searchClear.on('click', $.proxy(this.inputClearFunc, this));
            this.dropdown.on('click', $.proxy(this.onClickDropdown, this));
            this.selectItem.on('click', $.proxy(this.onClickSelectItem, this));
    	},
    	inputEventFunc : function (e) {
    		var target = $(e.currentTarget);
    		if (e.type === 'focusin' || e.type === 'keyup' || e.type === 'keydown') {
	    		this.searchLabel.hide();
	    		// *** keyup keydown 2번이 찍히긴함...
	            target.val().length ? this.searchClear.show() : this.searchClear.hide();
            } else if (e.type === 'focusout' && !target.val().length) {
            	// text입력값이 없거나 포커스 아웃일때 placeholder 보임 
                this.searchLabel.show();    
            }
        },
        inputClearFunc : function () {
            this.searchInput.val('');
            this.searchClear.hide();
            this.searchLabel.show();
        },
    	onClickDropdown : function (e) {
            e.preventDefault();
            if (!this.dropdownList.filter(':visible').length) {
            	// dropdownlist가 보이지 않으면 
                this.openDropdownList();
            } else {
                this.closeDropdownList(); 
            }
    	},
        openDropdownList : function () {
			this.dropdownList.slideDown();
            this.dropdownList.attr('aria-hidden', false);
            this.dropdownWrap.addClass(this.opts.openClass);
    		this.ariaBlindTxt.text(this.globalText.collapse);
            this.bindOutsideEvent(true);
        },
        closeDropdownList : function () {
			this.dropdownList.slideUp();
            this.dropdownList.attr('aria-hidden', true);
            this.dropdownWrap.removeClass(this.opts.openClass);
    		this.ariaBlindTxt.text(this.globalText.expand);
            this.bindOutsideEvent(false);
        },
    	onClickSelectItem : function (e) {
            var target = $(e.currentTarget),
                selectText = target.text();
            e.preventDefault();

    		this.dropdownPlaceholder.text(selectText);
            this.closeDropdownList();
    	},
        bindOutsideEvent : function (type) {
            if (type) {
                this.dropdownWrap.on('clickoutside', $.proxy(this.closeDropdownList, this));
            } else {
                this.dropdownWrap.off('clickoutside');
            }
        }
    }

    // filterModulePlugin
    win.smg.support[filterModulePluginName] = function (container, args) {
        var defParams = {
            container : container,
            pluginContainer : '.manual-download-filter-new',
            filterContainer : '.manual-download-filter-new__module-aside',
            filterWrap : '.manual-download-filter-new__filters',
            filterMobileTab : '.manual-download-filter-new__tab',
            filterMobileTabBtn : '.manual-download-filter-new__tab-btn',
            filterListWrap : '.manual-download-filter-new__list-wrap',
            filterListArea : '.manual-download-filter-new__list',
            filterTitle : '.manual-download-filter-new__list-title',
            ariaBlindTxt : '.blind',
            filterList : '.manual-download-filter-new__list-items',
            filterInputWrap : '.support-checkbox',
            filterInput : 'input[type="checkbox"]',
            activeClass : 'filter-active',
            checkedClass : 'is-checked',
            // content 
            contentList : '.manual-download-filter-new__content-list',
            contentItem : 'li',
            showCtaWrap : '.manual-download-filter-new__content-cta',
            showCta : 'a',
            showClass : 'is-show',
            fixedClass : 'is-fixed',
            openClass : 'is-opened',
            showType : true,
            listCount : null,
            viewType : null
        }
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.container)).length) return;
        this.init();
    };
    win.smg.support[filterModulePluginName].prototype = {
        init : function () {
            this.setElements();
            this.initOpts();
            this.initLayout();
            this.bindEvents();
            this.resizeFunc();
        },
        setElements : function () {
            this.pluginContainer = $(this.opts.pluginContainer); //global text 제어
            this.filterContainer = this.obj.find(this.opts.filterContainer);
            this.filterWrap = this.obj.find(this.opts.filterWrap);
            this.filterMobileTab = this.filterWrap.find(this.opts.filterMobileTab);
            this.filterMobileTabBtn = this.filterMobileTab.find(this.opts.filterMobileTabBtn);
            this.filterListWrap = this.filterWrap.find(this.opts.filterListWrap);
            this.filterListArea = this.filterListWrap.find(this.opts.filterListArea);
            this.filterTitle = this.filterListWrap.find(this.opts.filterTitle);
            this.ariaBlindTxt = this.filterTitle.find(this.opts.ariaBlindTxt);
            this.filterList = this.filterListArea.find(this.opts.filterList);
            this.filterInputWrap = this.filterListArea.find(this.opts.filterInputWrap);
            this.filterInput = this.filterInputWrap.find(this.opts.filterInput);
            this.contentList = this.obj.find(this.opts.contentList);
            this.contentItem = this.contentList.find(this.opts.contentItem);
            this.showCtaWrap = this.contentList.find(this.opts.showCtaWrap);
            this.showCta = this.showCtaWrap.find(this.opts.showCta);
        },
        initOpts : function () {
            var globalText = this.pluginContainer.data('global-text');
            this.globalText = {
                Collapse : (globalText && globalText.Collapse) ? $.trim(globalText.Collapse) : '',
                Expand : (globalText && globalText.Expand) ? $.trim(globalText.Expand) : '',
                showMore : (globalText && globalText.showMore) ? $.trim(globalText.showMore) : '',
                showLess : (globalText && globalText.showLess) ? $.trim(globalText.showLess) : '' 
            };
            this.opts.listCount = this.contentList.data('view-list'); // 노출갯수를 가져온다
        },
        initLayout : function () {
            if (this.contentItem.length > this.opts.listCount) {
            	// 리스트가 노출갯수보다 많으면 show more 버튼을 보여준다
                this.showCtaWrap.show();
            } else {
                this.showCtaWrap.hide();
            }
            // 리스트를 그린다.
            this.viewContentFunc();
        },
        bindEvents : function () {
            $(win).on('resize', $.proxy(this.resizeFunc, this));
            this.filterTitle.on('click', $.proxy(this.onClickFilterToggler, this));
            this.filterInput.on('change', $.proxy(this.onChangeFilter, this));
            this.showCta.on('click', $.proxy(this.onClickMore, this));
        },
        resizeFunc : function () {
            clearTimeout(this.clearTime);
            this.clearTime = setTimeout($.proxy(this.checkLayout, this), 150);
        },
        checkLayout : function () {
            if (UTIL.winSize().w >= BREAKPOINTS.MOBILE && this.opts.viewType != 'PC' ) {
                this.opts.viewType = 'PC';
                $(win).off('scroll');
            } else if (UTIL.winSize().w < BREAKPOINTS.MOBILE && this.opts.viewType != 'MO' && UTIL.isSupportTransform) {
                this.opts.viewType = 'MO';
                this.initOffset();
                $(win).on('scroll', $.proxy(this.onScrollFunc, this));
                this.filterMobileTabBtn.on('click', $.proxy(this.onClickFilterTab, this));
            }
        },
        onClickFilterToggler : function (e) {
            var target = $(e.currentTarget),
                targetAriaTxt = target.find(this.ariaBlindTxt),
                targetListArea = target.closest(this.filterListArea),
                targetList = targetListArea.find(this.filterList);
            
            e.preventDefault();
            targetListArea.toggleClass(this.opts.activeClass);
            targetList.slideToggle();
            if (targetListArea.hasClass(this.opts.activeClass)) {
            	// filter active class로 제어하기
                targetAriaTxt.text(this.globalText.Collapse);
            } else {
                targetAriaTxt.text(this.globalText.Expand);
            }
        },
        onChangeFilter : function (e) {
            var target = $(e.currentTarget),
                targetWrap = target.closest(this.filterInputWrap);

            if (target.prop('checked')) {
            	// 체크상태 클레스 주기
                targetWrap.addClass(this.opts.checkedClass);
            } else {
                targetWrap.removeClass(this.opts.checkedClass);
            }
        },
        viewContentFunc : function () {
            for (var i = 0, max = this.contentItem.length; i < max; i++) {
                if (i < this.opts.listCount) {
                	// 리스트를 보여줌
                    this.contentItem.eq(i).addClass(this.opts.showClass);
                } else {
                	// 리스트를 숨김
                    this.contentItem.eq(i).removeClass(this.opts.showClass);
                }
            }
        },
        onClickMore : function (e) {
            var target = $(e.currentTarget);

            e.preventDefault();
            if (this.opts.showType) {
                this.opts.showType = false;
                target.removeClass('s-ico-down').addClass('s-ico-up');
                target.text(this.globalText.showLess);
                // 전부다 contentItem(list)전부 보여준다.
                this.contentItem.addClass(this.opts.showClass);
            } else {
                this.opts.showType = true;
                target.removeClass('s-ico-up').addClass('s-ico-down');
                target.text(this.globalText.showMore);
                // 다시 그린다.
                this.viewContentFunc();
            }
        },
        // 모바일 이벤트
        initOffset : function () {
            this.scrollTop = $(win).scrollTop();
            this.filterOffset  = this.filterWrap.offset().top;
            this.filterHeight = this.filterWrap.height();
            this.filterCurrentOffset = this.filterOffset - this.scrollTop;
            this.areaEndOffset = this.obj.offset().top + this.obj.height();

            this.filterContainer.css('height', this.filterHeight); // 스크롤시 부드럽게 되는 영역 확보
        },
        onScrollFunc : function () {
            this.scrollTop = $(win).scrollTop();

            if (this.scrollTop > this.filterOffset && this.scrollTop < this.areaEndOffset) {
            	// scroll top이 영역사이일 경우 fixed이벤트 
            	this.filterWrap.addClass(this.opts.fixedClass).animate({ top : 0 });
            } else {
            	this.filterWrap.removeClass(this.opts.fixedClass).animate({ top : '' });
            	if (this.filterWrap.hasClass(this.opts.openClass)) {
            		//드롭다운 메뉴가 열려있으면 영역을 벗어나게될 경우 닫을것
	                this.filterWrap.removeClass(this.opts.openClass);
            	}
            }
        },
        onClickFilterTab : function (e) {
        	// 모바일에서 리스트 오픈이 잘안됨 수정필요 ㅠㅠ 클릭아웃사이드 필요 
            e.preventDefault();

            if (!this.filterWrap.hasClass(this.opts.openClass)) {
                if (this.scrollTop < this.filterOffset) {
                	console.log(this.scrollTop,this.filterOffset);
                    $('html, body').animate({ scrollTop : this.filterOffset });
                }
                this.filterWrap.addClass(this.opts.openClass);
            } else {
                this.filterWrap.removeClass(this.opts.openClass);
            }
        } 
    }
   
    $(function(){
        new win.smg.support[pluginName]('.manual-download-filter-new');
    });
})(window, window.jQuery)