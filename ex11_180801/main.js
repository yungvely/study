(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {}; // window 객체에 저장된 smg가 있으면 불러온다.
    win.smg.support = win.smg.support || {}; // window 객체에 저장된 smg.support가 있으면 불러온다.
    win.smg.support.common = win.smg.support.common || {}; // window 객체에 저장된 smg.support.common가 있으면 불러온다.

    var CST_EVENT = win.smg.support.common.customEvent, //가져온 win.smg.support.common의 customEvent을 저장한다.
        UTIL = win.smg.support.common.util, //가져온 win.smg.support.common의 util을 저장한다.
        BREAKPOINTS = win.smg.support.common.breakpoints, //가져온 win.smg.support.common의 breakpoints을 저장한다.
        PAGE = win.smg.support.page,//가져온 win.smg.support 의 page를 저장한다.
        pluginName = 'manualDownloadFilterNew', //사용할 plugin을 저장한다.
        filterpluginName = 'productManualDownloadNewPlugin', //사용할 plugin(filter)을 저장한다.
        personaPluginName = 'manualPersonaPlugin'; //사용할 plugin(persona)을 저장한다.

    win.smg.support[pluginName] = function (container, args) {
        var defParams = {
            obj : container,  //obj에 받은 컨테이너를 담고
            filterModule : '.manual-download-filter-new__module',  //filter 모듈박스
            personaAnchor : '.manual-download-filter-new__persona-box', //persona box
            ManualDownloadPlugins : [],
            personaAnchorPlugins : [],
            loadAfter : null
        }
        this.opts = UTIL.def(defParams, (args || {})); // defParams를 쓸수 있도록 opts에 저장한다.
        if (!(this.obj = $(this.opts.obj)).length) return; //this.obj가 존재하지 않으면 스톱
        this.init(); //init을 실행시킨다.
    };
    win.smg.support[pluginName].prototype = {
        init : function () {
            this.setElements(); //엘리먼트를 셋팅한다.
            this.manualDownloadPluginCall(); //manualDownloadPluginCall 함수를 호출한다.
        },
        setElements : function () {
            this.filterModule = this.obj.find(this.opts.filterModule); //defParams에 설정된 elem를 가져온다
            this.personaAnchor = this.obj.find(this.opts.personaAnchor); //defParams에 설정된 elem를 가져온다
        },
        manualDownloadPluginCall : function () {
            var _this = this; 
            for (var i = 0, max = this.filterModule.length; i < max; i++) { // 모듈박스가 있는 만큼 돌면서 
                (function (index) { // index에는 i가 들어오게 된다.
                    var target = _this.filterModule.eq(index); // i번째 모듈 박스
                    _this.opts.ManualDownloadPlugins.push(new win.smg.support[filterpluginName](target, {
                        //ManualDownloadPlugins 빈배열에 win.smg.support[filterpluginName]을 호출한다.
                        loadAfter : $.proxy(_this.loadAfterFunc, _this) // *** 이부분을 모름
                    }));
                })(i);
            }
            for (var i = 0, max = this.personaAnchor.length; i < max; i++) { // persona박스가 있는 만큼 돌면서 
                (function (index) { // index에는 i가 들어오게 된다.
                    var target = _this.personaAnchor.eq(index); // i번째 persona 박스
                    _this.opts.personaAnchorPlugins.push(new win.smg.support[personaPluginName](target));
                    //personaAnchorPlugins 빈배열에 win.smg.support[personaPluginName]을 호출한다.
                })(i);
            }
        },
        loadAfterFunc : function () {
            this.outCallback('loadAfter'); // outCallback 함수를 호출함
        },
        outCallback : function (ing) {
            var callbackObj = this.opts[ing]; // loadAfter를 받은 opts를 실행시킴
            if (callbackObj == null) return;
            callbackObj();
        },
        reInit : function () {
            var _this = this;
            for (var i = 0, max = this.opts.ManualDownloadPlugins.length; i < max; i++) {
                (function (index) {
                    var target = _this.opts.ManualDownloadPlugins[i];
                    target.reInit(); // *** reInit을 무엇을 부르는건지...
                })(i);
            }
        }
    };

    //filter plugin
    win.smg.support[filterpluginName] = function (container, args) {
        var defParams = {
            obj : container,
            anchorObj : '.support-anchor-navi',
            filterObj : '.manual-download-filter-new',
            filterArea : '.manual-download-filter-new__filters',
            filterWrap : '.manual-download-filter-new__list',
            filterLayerArea : '.manual-download-filter-new__list-group',
            filterListWrap : '.manual-download-filter-new__list-items',
            filterToggler : '.manual-download-filter-new__list-title',
            filterMoToggler : '.support-filter-btn', // 모바일 드롭다운
            filterActiveClass : 'filter-active', // pc 아코디언
            filterFixedClass : 'is-fixed', // 모바일 고정
            filterToggleClass : 'is-opened', // 모바일 열림
            filterToggleSpeed : 100,
            filterViewType : false,
            accessText : '.blind', 
            accessData : {
                accessAria : 'aria-expanded', // 모바일 드롭다운
                dataActive : 'accessbility-Active' // *** 모름
            },
            listWrap : '.manual-download-filter-new__content-list',
            listParent : 'ul',
            listBtnArea : '.manual-download-filter-new__content-cta',
            listToggleBtn : '.s-btn-text', // show more/less버튼
            listViewClass : // 리스트에 클레스 삭제 'is-show', // list에 is-show는 3개까지
            icoDownClass : 's-ico-down',  
            icoUpClass : 's-ico-up',
            duration : 500,
            scrollLock : true,
            scrollLockClass : 'hive-scroll-lock', // 모바일 드롭다운시 스크롤 고정
            scrollLockOpts : {
                scrollLocked : false,
                lockElements : 'html',
                appliedLock : {},
                prevStyles : {},
                prevScroll : {},
                lockStyles : {
                    'overflow-y' : 'scroll',
                    'position' : 'fixed',
                    'width' : '100%'
                }
            },
            focusOutObj : { // 레이어에 포커스가 벗어나지 않도록 도와주는 태그
                CLASS : 'hive-layer-focusout',
                CSS : {
                    'overflow' : 'hidden',
                    'position' : 'fixed',
                    'left' : 0,
                    'top' : 0,
                    'z-index' : -1,
                    'width' : 1,
                    'height' : 1,
                    'font-size' : '1px',
                    'line-height' : 0
                }
            },
            customEvent : '.' + pluginName + (new Date()).getTime(), // 고유의 값 생성
            viewType : null,
            loadAfter : null
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support[filterpluginName].prototype = { // win.smg.support[filterpluginName] 의 프로토 타입
        init : function () {
            this.setElements(); //this.opts의 받아온 요소들을 저장
            this.initOpts(); // 기본옵션 셋팅
            this.initLayout(); // 기본레이아웃 셋팅
            this.setLayout(); // layout함수 호출
            this.bindEvents(); // 이벤트셋팅 호출
        },
        setElements : function () {
            this.anchorObj = $(this.opts.anchorObj);
            this.filterObj = $(this.opts.filterObj); //this.obj == container
            this.filterArea = this.obj.find(this.opts.filterArea);
            this.filterWrap = this.filterArea.find(this.opts.filterWrap);
            this.filterLayerArea = this.filterArea.find(this.opts.filterLayerArea);
            this.filterListWrap = this.filterWrap.find(this.opts.filterListWrap);
            this.filterToggler = this.filterWrap.find(this.opts.filterToggler);
            this.filterMoToggler = this.filterArea.find(this.opts.filterMoToggler);
            this.listWrap = this.obj.find(this.opts.listWrap);
            this.listParent = this.listWrap.find(this.opts.listParent);
            this.listChild = this.listParent.children();
            this.listBtnArea = this.listWrap.find(this.opts.listBtnArea);
            this.listToggleBtn = this.listBtnArea.find(this.opts.listToggleBtn);
            this.accessText = this.filterWrap.find(this.opts.accessText);
        },
        initOpts : function () {
            var globalText = this.filterObj.data('global-text');
            // globalText 셋팅 ***
            this.globalText = {
                Collapse : (globalText && globalText.Collapse) ? $.trim(globalText.Collapse) : '',
                Expand : (globalText && globalText.Expand) ? $.trim(globalText.Expand) : '',
                showMore : (globalText && globalText.showMore) ? $.trim(globalText.showMore) : '',
                showLess : (globalText && globalText.showLess) ? $.trim(globalText.showLess) : ''
            };
            this.listViewNum = this.listWrap.data('view-list'); // list의 총 갯수를 카운트해서
            this.listNum = this.listChild.length;
        },
        initLayout : function () {
            this.filterToggleType = true; // *** 여기서만 씀
            this.listChild.removeClass(this.opts.listViewClass); // 리스트에 is-show 전부 삭제
            this.initFilterArea();  // initFilterArea 함수를 호출한다.
            this.initListView(); // initListView 함수를 호출한다.
        },
        initFilterArea : function () {
            var stickyWrapClass = this.filterArea.attr('class'),
                jsStickyWrapClass = 'js-' + stickyWrapClass;
            this.filterArea.wrap('<div class="' + jsStickyWrapClass + '"/>');
            this.filterObjWrap = this.filterArea.parent();
            var focusOutClass = this.opts.focusOutObj.CLASS, // hive-layer-focusout 레이어에서 아웃되지않게
                focusOutElements = '<span class="' + focusOutClass + '">""</span>';
            if (!this.filterArea.prev().hasClass(focusOutClass)) {
                this.filterArea.before(focusOutElements);
            }
            if (!this.filterArea.next().hasClass(focusOutClass)) {
                this.filterArea.after(focusOutElements);
            }
            this.prevFocusOutObj = this.filterArea.prev();
            this.nextFocusOutObj = this.filterArea.next();
            this.focusOutObj = this.filterArea.prev().add(this.filterArea.next());
            this.focusOutObj.css(this.opts.focusOutObj.CSS);
            // 레이어의 반복화를 위한 초기셋팅
        },
        moFocusInitLayout : function (type) {
            if (type) {
                this.focusOutObj.attr('tabIndex', 0);
            } else {
                this.focusOutObj.attr('tabIndex', -1);
            }
            // 모바일에서 레이어 팝업이 열렷을경우 안에서 포커스    
        },
        changeEvents : function (event) {
            var events = [],
                eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
                //인자값의 customEvent에 저장한다.
            }
            return events.join(' ');
        },
        bindEvents : function () {
            $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this)); // resizeFunc 함수실행
            this.filterToggler.on(this.changeEvents('click'), $.proxy(this.filterToggleFunc, this)); // filterToggleFunc 함수실행
            this.listToggleBtn.on(this.changeEvents('click'), $.proxy(this.listToggleFunc, this)); // listToggleFunc 함수실행
            this.listWrap.on(this.changeEvents('ajaxafter'), $.proxy(this.listAjaxAfter, this)); // listAjaxAfter 함수실행
        },
        bindResponsiveEvents : function (type) {
            // PC/ MO 타입에 따른 이벤트 실행
            if (type) {
                $(win).off(this.changeEvents('scroll'));
                this.filterMoToggler.off(this.changeEvents('click'));
            } else {
                $(win).on(this.changeEvents('scroll'), $.proxy(this.scrollFunc, this));
                this.filterMoToggler.on(this.changeEvents('click'), $.proxy(this.filterMoClickFunc, this));
            }
        },
        moFocusBindEvents : function (type) {
            // 모바일 포커스 on/off 이벤트 
            if (type) {
                this.prevFocusOutObj.on(this.changeEvents('focusin'), $.proxy(this.onPrevOut, this));
                this.nextFocusOutObj.on(this.changeEvents('focusin'), $.proxy(this.onNextOut, this));
            } else {
                this.prevFocusOutObj.off(this.changeEvents('focusin'));
                this.nextFocusOutObj.off(this.changeEvents('focusin'));
            }
        },
        onPrevOut : function () { // *** 포커스 주는건데..
            this.filterArea.find('a, input, button, select').filter(':visible').last().focus();
        },
        onNextOut : function () {
            this.filterArea.find('a, input, button, select').filter(':visible').first().focus();
        },
        resizeFunc : function () { //resize 될때 마다 함수를 호출한다,
            this.winWidth = UTIL.winSize().w;
            if (this.opts.resizeStart == null) {
                this.opts.resizeStart = this.winWidth;
                this.resizeAnimateFunc(); // resizeAnmateFunc 함수 실행 
            }
            win.clearTimeout(this.resizeEndTime); // 리사이즈 최적화
            this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 150);
        },
        resizeEndFunc : function () {
            this.opts.resizeStart = null;
            this.setLayout();
            if (UTIL.winSize().w <= BREAKPOINTS.MOBILE) { 
                //모바일일시 함수 실행
                this.createHeightFunc();
                this.fixedObjFunc();
                this.setFilterRange();
            }
            UTIL.cancelAFrame.call(win, this.resizeRequestFrame);
        },
        resizeAnimateFunc : function () {
            this.setLayout(); // setLayout 함수 실행
            if (UTIL.winSize().w <= BREAKPOINTS.MOBILE) {
                this.createHeightFunc();
                this.fixedObjFunc();
                this.setFilterRange();
            }
            this.resizeRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
        },
        setLayout : function () {
            if (!UTIL.isSupportTransform || UTIL.isSupportTransform && UTIL.winSize().w > BREAKPOINTS.MOBILE) {
                // 최신 브라우저 && pc 일때
                if (this.opts.viewType != 'pc') {
                    this.opts.viewType = 'pc';
                    this.setPcLayout(); //setPcLayout 함수 호출
                }
            } else {
                if (this.opts.viewType != 'mo') {
                    this.opts.viewType = 'mo';
                    this.setMoLayout(); //setMoLayout 함수 호출
                    this.bindResponsiveEvents(false);
                }
            }
        },
        setPcLayout : function () {
            this.opts.filterViewType = false;
            this.scrollLock.init.call(this, false); // ***
            this.bindOutsideEvents(false);
            this.moFocusInitLayout(false);
            this.moFocusBindEvents(false);
            // 모바일 필터 토글 시 position: fixed , top:0 되는것 css 해제
            this.filterMoToggler.attr(this.opts.accessData.accessAria, false);
            this.filterObjWrap.css('height', '');
            this.filterArea.show().css('top', '');
            // fixed와 toggle 클레스 초기화
            this.filterArea.removeClass(this.opts.filterFixedClass);
            this.filterArea.removeClass(this.opts.filterToggleClass);
        },
        setMoLayout : function () {
            // MO 에서 클래스  초기화 
            this.filterArea.removeClass(this.opts.filterFixedClass);
            this.filterArea.removeClass(this.opts.filterToggleClass);
        },
        scrollFunc : function () {
            this.fixedObjFunc(); //fixedObjFunc 함수 호출
            this.setFilterRange(); //setFilterRange 함수 호출
        },
        createHeightFunc : function () {
            if (!UTIL.isSupportTransform) {
                // 하위 브라우저  pc처럼 먹히게 하는코드
                this.filterObjWrap.css('height', '');
                this.filterArea.css('top', '');
            } else {
                // 최신브라우저면 
                if (UTIL.winSize().w > BREAKPOINTS.MOBILE) {
                    // pc일때 filterWrap에 height,top 주지 않음
                    this.filterObjWrap.css('height', '');
                    this.filterArea.css('top', '');
                } else {
                    this.anchorObjHeight = this.anchorObj.outerHeight(true);
                    this.filterObjHeight = this.filterArea.outerHeight(true);
                    this.filterObjPosition = (this.anchorObj.length) ? this.anchorObjHeight : 0; // anchorObj가 있으면 anchorObj의 높이값을 주고, 없으면 그냥 0을 준다 
                    this.filterObjWrap.css('height', this.filterObjHeight);
                    this.filterArea.css('top', this.filterObjPosition);
                }
            }
        },
        fixedObjFunc : function () {
            var winTop = $(win).scrollTop();

            var lockScroll = $('html').data('lockScroll'),
                lockType = (lockScroll != null) ? true : false,
                scrollTop = (lockType) ? lockScroll.top : winTop;
            // false 이면 scrollTop = winTop 

            var filterOffsetTop = (lockType) ? lockScroll.top + this.filterObjWrap.offset().top : this.filterObjWrap.offset().top - this.anchorObjHeight; // ***

            if (scrollTop >= filterOffsetTop) {
                if (!this.filterArea.hasClass(this.opts.filterFixedClass)) {
                    this.filterArea.addClass(this.opts.filterFixedClass);
                }
            } else {
                if (this.filterArea.hasClass(this.opts.filterFixedClass) && !lockType) {
                    this.filterArea.removeClass(this.opts.filterFixedClass);
                }
            }
            this.setPosition(); //setPosition 함수 호출
        },
        setFilterRange : function () { // *** 좀더 파악이 필요
            var winTop = $(win).scrollTop();

            var lockScroll = $('html').data('lockScroll'),
                lockType = (lockScroll != null) ? true : false,
                scrollTop = (lockType) ? lockScroll.top : winTop;
            //lockScroll(key)의 value를 가져온다

            var filterWrapHeight = this.obj.height(), // 현재 filter의 높이값
                filterOffsetTop = (lockType) ? lockScroll.top + this.obj.offset().top : this.obj.offset().top,
                filterEndRange = filterWrapHeight + filterOffsetTop - this.filterObjHeight;
            
            if (scrollTop >= filterEndRange) {
                this.filterArea.hide();
            } else {
                this.filterArea.show();
            }
        },
        setPosition : function () {
            if (this.opts.viewType === 'pc') {
                this.filterArea.css('top', '');
            } else {
                // mo  
                if (this.filterArea.hasClass(this.opts.filterFixedClass)) {
                    // is-fixed 클레스가 존재하면 고정값을 준다
                    this.filterArea.css('top', this.filterObjPosition);
                } else {
                    this.filterArea.css('top', '');
                }
            }
        },
        scrollLock : {            
            init : function (type) {
                if (!this.opts.scrollLock) return;
                var lockClass = this.opts.scrollLockClass,
                    lockOpts = this.opts.scrollLockOpts,
                    lockElements = $(lockOpts.lockElements);
                lockElements.toggleClass(lockClass, type);
                if (type) {
                    if (UTIL.isDevice && UTIL.isIOS) {
                        if (lockOpts.scrollLocked || (lockElements.data('lockScroll') != null)) return;
                        lockOpts.appliedLock = {};
                        this.scrollLock.saveStyles.call(this);
                        this.scrollLock.saveScrolls.call(this);
                        $.extend(lockOpts.appliedLock, lockOpts.lockStyles, {
                            'left' : - lockOpts.prevScroll.scrollLeft,
                            'top' : - lockOpts.prevScroll.scrollTop
                        });
                        lockElements.css(lockOpts.appliedLock);
                        lockElements.data('lockScroll', {
                            'left' : lockOpts.prevScroll.scrollLeft,
                            'top' : lockOpts.prevScroll.scrollTop
                        });
                        lockOpts.scrollLocked = true;
                    }
                } else {
                    if (UTIL.isDevice && UTIL.isIOS) {
                        if (!lockOpts.scrollLocked || (lockElements.data('lockScroll') == null)) return;
                        this.scrollLock.saveStyles.call(this);
                        for (var key in lockOpts.appliedLock) {
                            delete lockOpts.prevStyles[key];
                        }
                        lockElements.attr('style', $('<x>').css(lockOpts.prevStyles).attr('style') || '');
                        lockElements.data('lockScroll', null);
                        $(win).scrollLeft(lockOpts.prevScroll.scrollLeft).scrollTop(lockOpts.prevScroll.scrollTop);
                        lockOpts.scrollLocked = false;
                    }
                }
            },
            saveStyles : function () {
                var styleStrs = [],
                    styleHash = {},
                    lockOpts = this.opts.scrollLockOpts,
                    lockElements = $(lockOpts.lockElements),
                    styleAttr =  lockElements.attr('style');
                if (!styleAttr) return;
                styleStrs = styleAttr.split(';');
                $.each(styleStrs, function styleProp (styleString) {
                    var styleString = styleStrs[styleString];
                    if (!styleString) return;
                    var keyValue = styleString.split(':');
                    if (keyValue.length < 2) return;
                    styleHash[$.trim(keyValue[0])] = $.trim(keyValue[1]);
                });
                $.extend(lockOpts.prevStyles, styleHash);
            },
            saveScrolls : function () {
                var lockOpts = this.opts.scrollLockOpts;
                lockOpts.prevScroll = {
                    scrollLeft : $(win).scrollLeft(),
                    scrollTop : $(win).scrollTop()
                };
            }
        },
        filterMoClickFunc : function (e) {
            e.preventDefault();
            var filterOffsetTop = Math.ceil(this.filterObjWrap.offset().top - this.anchorObjHeight, 10);
            if (!this.opts.filterViewType) {
                this.opts.filterViewType = true;
                if (!this.filterArea.hasClass(this.opts.filterFixedClass)) {
                    // filter에 fixed 클래스가 붙지 않은 경우 애니메이션
                    $('html, body').stop().animate({
                        scrollTop : filterOffsetTop
                    }, this.opts.duration, $.proxy(function () {
                        this.filterMoToggleFunc();
                        win.setTimeout($.proxy(function () {
                            this.bindOutsideEvents(true);
                        }, this), 10);
                    }, this))
                } else {
                    // 이미 fixed 된 상태
                    this.filterMoToggleFunc();
                }
            }
        },
        filterMoToggleFunc : function () {
            this.filterArea.addClass(this.opts.filterToggleClass);
            win.setTimeout($.proxy(function () {
                this.scrollLock.init.call(this, true);
                this.bindOutsideEvents(true);
            }, this), 10);
            this.layerViewType = (this.filterArea.hasClass(this.opts.filterToggleClass)) ? true : false;
            if (this.layerViewType) {
                this.moFocusInitLayout(true);
                this.moFocusBindEvents(true);
            }
            this.filterMoToggler.attr(this.opts.accessData.accessAria, this.layerViewType);
        },
        bindOutsideEvents : function (type) {
            if (type) {
                this.filterLayerArea.on('clickoutside touchendoutside', $.proxy(this.onLayerOutsideFunc, this));
            } else {
                this.filterLayerArea.off('clickoutside touchendoutside');
            }
        },
        onLayerOutsideFunc : function (e) {
            e.preventDefault();
            win.setTimeout($.proxy(function () {
                this.opts.filterViewType = false;
                this.layerViewType = false;
                this.filterArea.removeClass(this.opts.filterToggleClass);
                this.filterMoToggler.attr(this.opts.accessData.accessAria, this.layerViewType);
                this.scrollLock.init.call(this, false);
                this.bindOutsideEvents(false);
                this.moFocusInitLayout(false);
                this.moFocusBindEvents(false);
                this.outCallback('loadAfter');
            }, this), 10);
        },
        filterToggleFunc : function (e) {
            e.preventDefault();
            this.filterViewFunc(e);
            this.accessbilityFunc(true);
        },
        filterViewFunc : function (e) {
            var target = $(e.currentTarget);
            var targetList = target.parent(this.opts.filterWrap),
            targetListWrap = targetList.find(this.opts.filterListWrap);
            if (!targetList.hasClass(this.opts.filterActiveClass)) {
                targetList.toggleClass(this.opts.filterActiveClass);
                targetListWrap.slideToggle(this.opts.filterToggleSpeed, $.proxy(function () {
                    this.filterViewAfterFunc();
                }, this));
            } else {
                targetListWrap.slideUp(this.opts.filterToggleSpeed, $.proxy(function () {
                    targetList.removeClass(this.opts.filterActiveClass);
                    this.filterViewAfterFunc();
                }, this));
            }
        },
        filterViewAfterFunc : function () {
            if (!UTIL.isSupportTransform || (UTIL.isSupportTransform && this.winWidth > BREAKPOINTS.MOBILE)) {
                this.outCallback('loadAfter');
            }
        },
        accessbilityFunc : function (type) {
            if (type) {
                var currentAccessType = !this.filterToggler.data(this.opts.accessData.dataActive),
                    globalTxt = (currentAccessType) ? this.globalText.Expand : this.globalText.Collapse;
                this.filterToggler.data(this.opts.accessData.dataActive, currentAccessType);
                this.filterToggler.find(this.opts.accessText).text(globalTxt);
            } else {
                this.listToggleBtn.toggleClass(this.opts.icoUpClass, this.currentAllView);
                this.listToggleBtn.toggleClass(this.opts.icoDownClass, !this.currentAllView);
                this.listToggleBtn.text(this.currentAllView ? this.globalText.showLess : this.globalText.showMore);
            }
        },
        initListView : function () {
            this.currentAllView = false;
            if (this.listNum <= this.listViewNum) {
                this.listBtnArea.hide();
            } else {
                this.listBtnArea.show();
            }
            for (var i = 0, max = this.listNum; i < max; i++) {
                var contChildTarget = this.listChild.eq(i);
                if (i < this.listViewNum) {
                    contChildTarget.addClass(this.opts.listViewClass);
                } else {
                    contChildTarget.removeClass(this.opts.listViewClass);
                }
            }
            this.listToggleBtn.toggleClass(this.opts.icoUpClass, this.currentAllView);
            this.listToggleBtn.toggleClass(this.opts.icoDownClass, !this.currentAllView);
            this.accessbilityFunc(false);
            this.outCallback('loadAfter');
        },
        listToggleFunc : function (e) {
            e.preventDefault();
            this.currentAllView = !this.currentAllView;
            this.setListLayout();
            this.scrollMoveFunc(this.listWrap);
            this.accessbilityFunc(false);
        },
        listAjaxAfter : function () {
            this.listChild = this.listParent.children();
            this.listNum = this.listParent.children().length;
            this.initListView();
        },
        setListLayout : function () {
            if (this.currentAllView) {
                this.listChild.addClass(this.opts.listViewClass);
            } else {
                this.listChild.eq(this.listViewNum - 1).addClass(this.opts.listViewClass).nextAll().removeClass(this.opts.listViewClass);
            }
            this.outCallback('loadAfter');
        },
        scrollMoveFunc : function (target) {
            if (!target.length) return;
            var scrollTop = Math.ceil(target.offset().top),
                winTop = $(win).scrollTop(),
                stickyHeight = PAGE.stickyArea(scrollTop),
                filterHeight = this.filterObjHeight,
                moveTopPosition = scrollTop - stickyHeight,
                moveTop = (!this.filterArea.hasClass(this.opts.filterFixedClass)) ? moveTopPosition : moveTopPosition - filterHeight;
            if (moveTop === winTop) return;
            $('html, body').animate({
                'scrollTop' : moveTop
            }, this.opts.duration);
        },
        outCallback : function (ing) {
            var callbackObj = this.opts[ing];
            if (callbackObj == null) return;
            callbackObj();
        },
        reInit : function () {
            this.resizeFunc(); 
        }
    };

    //persona plugin
    win.smg.support[personaPluginName] = function (container, args) {
        var defParams = {
            obj : container,
            activeClass : 'is-active',
            objResetBtn : '.s-btn-reset',
            disabledClass : 'is-disabled',
            checkedClass : 'is-checked',
            inputWrap : '.js-chkbox-wrap',
            windowClass : 's-detail-window',
            objInput : '.support-checkbox__input',
            customEvent : '.' + pluginName + (new Date()).getTime(),
            viewType : null,
            resizeStart : null,
            loadAfter : null
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support[personaPluginName].prototype = {
        init : function () {
            if (UTIL.winSize().w > BREAKPOINTS.MOBILE) {
                this.setElements();
                this.initLayout();
                this.resizeFunc();
                this.bindEvents();
            }
        },
        setElements : function () {
            this.objResetBtn = this.obj.find(this.opts.objResetBtn);
            this.objInput = this.obj.find(this.opts.objInput);
        },
        initLayout : function () {
            this.objResetBtn.toggleClass(this.opts.disabledClass, !this.objInput.prop('checked'));
            this.objResetBtn.prop('disabled', !this.objInput.prop('checked'));
        },
        changeEvents : function (event) {
            var events = [],
                eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
            }
            return events.join(' ');
        },
        bindEvents : function () {
            $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this));
        },
        resizeBindEvents : function (type) {
            if (type) {
                this.obj.on(this.changeEvents('focusin mouseenter mouseleave'), $.proxy(this.onHoverFunc, this));
                this.objInput.on(this.changeEvents('change'), $.proxy(this.onChangeFunc, this));
                this.objResetBtn.on(this.changeEvents('click'), $.proxy(this.onResetFunc, this));
            } else {
                this.obj.off(this.changeEvents('focusin mouseenter mouseleave'));
                this.objInput.off(this.changeEvents('change'));
                this.objResetBtn.off(this.changeEvents('click'));
            }
        },
        resizeFunc : function () {
            this.winWidth = UTIL.winSize().w;
            if (this.opts.resizeStart == null) {
                this.opts.resizeStart = this.winWidth;
                this.resizeAnimateFunc();
            }
            win.clearTimeout(this.resizeEndTime);
            this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 150);
        },
        resizeEndFunc : function () {
            this.opts.resizeStart = null;
            this.resizeControl();
            UTIL.cancelAFrame.call(win, this.resizeRequestFrame);
        },
        resizeAnimateFunc : function () {
            this.resizeControl();
            this.resizeRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
        },
        resizeControl : function () {
            if (!UTIL.isSupportTransform || UTIL.isSupportTransform && (this.winWidth > BREAKPOINTS.MOBILE)) {
                if (this.opts.viewType !== 'pc') {
                    this.opts.viewType = 'pc';
                    this.resizeBindEvents(true);
                }
            } else {
                if (this.opts.viewType !== 'mo') {
                    this.opts.viewType = 'mo';
                    this.resizeBindEvents(false);
                }
            }
        },
        onChangeFunc : function () {
            if (this.objInput.filter(':checked').length) {
                this.objResetBtn.removeClass(this.opts.disabledClass);
                this.objResetBtn.prop('disabled', false);
            } else {
                this.objResetBtn.addClass(this.opts.disabledClass);
                this.objResetBtn.prop('disabled', true);
            }
        },
        onResetFunc : function () {
            this.objInput.prop('checked', false);
            this.objInput.closest(this.opts.inputWrap).removeClass(this.opts.checkedClass);
            this.objResetBtn.addClass(this.opts.disabledClass);
            this.objResetBtn.prop('disabled', true);
            this.obj.triggerHandler('mouseleave');
        },
        onHoverFunc : function (e) {
            var target = $(e.currentTarget);
            if (target.hasClass(this.opts.windowClass)) return;
            if (e.type === 'mouseenter' || e.type === 'focusin') {
                if (!target.hasClass(this.opts.activeClass)) {
                    target.addClass(this.opts.activeClass);
                    this.bindOutsideEvents(target, true);
                }
            } else if (e.type === 'mouseleave' || e.type === 'focusout') {
                if (this.objInput.filter(':checked').length) return;
                this.bindOutsideEvents(target, false);
            }
            this.outCallback('loadAfter');
        },
        bindOutsideEvents : function (target, type) {
            if (type) {
                this.obj.removeClass(this.opts.activeClass);
                target.on('focusoutside', $.proxy(function () {
                    target.triggerHandler('mouseleave');
                }, this));
                target.addClass(this.opts.activeClass);
            } else {
                if (target) {
                    target.removeClass(this.opts.activeClass);
                    target.off('focusoutside');
                }
            }
        },
        outCallback : function (ing) {
            var callbackObj = this.opts[ing];
            if (callbackObj == null) return;
            callbackObj();
        },
    }
    //win.smg.support[filterpluginName] 필터 플러그인을 fn. 하듯 호출하는 부분
    win.smg.support.manualDownloadFilterNewCall = function (args) {
        var defParams = {   
            obj : '.manual-download-filter-new' //obj를 저장하고.
        };
        this.opts = UTIL.def(defParams, (args || {}));  //extand하는부분
        if (!(this.obj = $(this.opts.obj)).length) return; //없으면 실행안함
        this.init(); 
    };
    win.smg.support.manualDownloadFilterNewCall.prototype = UTIL.def({  // *** def를 왜 다시 붙이는건지...
        init : function () {
            this.callComponent(); // callComponent 함수를 호출한다.
            this.globalObjs(); // globalObjs 함수를 호출한다.
        },
        callComponent : function () {
            this.callPlugins = []; //플러그인 배열을 만들고
            for (var i = 0, max = this.obj.length; i < max; i++) {
                // 배열에 있는만큼 담고 globalObjsCall를 호출한다.
                this.callPlugins.push(new win.smg.support[pluginName](this.obj.eq(i), {
                    loadAfter : $.proxy(this.globalObjsCall, this)
                }));
            }
        },
        globalObjs : function () {
            for (var i = 0, max = this.callPlugins.length; i < max; i++) {
                //this.callPlugins의 개수만큼
                CST_EVENT.PAGEIS.PAGEOBJS.push(this.callPlugins[i]);
                // win.smg.support.common.customEvent의 this.callPlugins배열을 각각 집어넣는다.
            }
        },
        globalObjsCall : function () {
            CST_EVENT.PAGEIS.EVENT_MANAGER.trigger(CST_EVENT.PAGEIS.REPOSITION);
            // *** 추측컨데 페이지가 refresh 될때마다 이벤트를 불러온다...?
        }
    }, UTIL.emitter); // *** emitter를 모름...
    $(function () {
        win.supportManualDownloadFilterNew = new win.smg.support.manualDownloadFilterNewCall(); // 플러그인 즉시실행 함수구문
    });
})(window, window.jQuery, window.document);











/// 390line부터 다시 해석해야함..