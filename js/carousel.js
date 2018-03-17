//(function($)
//{
//  $(document).ready(function(){
//    $('.apps-gallery-slides').not('.slick-initialized').slick({
//      slidesToShow: 2,
//      slidesToScroll: 2,
//      infinite: false,
//      dots: false,
//      arrows: true,
//      centerMode: false,
//      variableWidth: true,
//      responsive: [
//        {
//          breakpoint: 1192,
//          settings: {
//            slidesToShow: 1,
//            slidesToScroll: 1,
//            infinite: false,
//            dots: true,
//            arrows: true
//          }
//        },
//        {
//          breakpoint: 992,
//          settings: {
//            slidesToShow: 1,
//            slidesToScroll: 1,
//            infinite: false,
//            dots: true,
//            arrows: true
//          }
//        },
//        {
//          breakpoint: 768,
//          settings: {
//            slidesToShow: 1,
//            slidesToScroll: 1,
//            infinite: false,
//            dots: false,
//            arrows: false
//          }
//        },
//        {
//          breakpoint: 480,
//          settings: {
//            slidesToShow: 1,
//            slidesToScroll: 1,
//            infinite: false,
//            dots: false,
//            arrows: false
//          }
//        }
//        // You can unslick at a given breakpoint now by adding:
//        // settings: "unslick"
//        // instead of a settings object
//      ]
//    });
//
//    // app hover
//    $('.mobile-apps').find('.galleryTileCarouselTile').hover(function () {
//      $(this).find('.app-hover').clearQueue();
//      $(this).find('.app-hover').stop();
//      $(this).find('.app-hover').fadeIn('fast');
//    }, function () {
//      $(this).find('.app-hover').fadeOut('fast');
//    });
//
//    // resize overlays initially
//    setTimeout(function(){
//      $('.mobile-apps').find('.galleryTileCarouselTile').each(function () {
//        resizeOverlays($(this));
//      });
//    }, 500);    
//  });
//
//  // resize overlays on window resize
//  $(window).resize(function(){
//    $('.mobile-apps').find('.galleryTileCarouselTile').each(function () {
//      resizeOverlays($(this));
//    });
//  });
//})(jQuery);
//
//function resizeOverlays(ele) {
//  var width = ele.find('.galleryImage img').width();
//  var height = ele.find('.galleryImage img').height();
//  ele.find('.app-overlay').width(width);
//  ele.find('.app-overlay').height(height);
//  ele.find('.app-info').width(width);
//  ele.find('.app-info').height(height);
//}
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

(function($)
{
  $(document).ready(function(){
  // function and variables, 'unslick' while window size reach maximum width (641px)
    var maxWidth = 992;
    var slickVar = {
      slidesToShow: 5,
      slidesToScroll: 5,
      infinite: false,
      dots: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 1176,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: false,
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 768,
          settings: "unslick",
        },
        {
          breakpoint: 480,
          settings: "unslick",
        }
      ]
    };

    var runBuySlick = function() {
      $('.buy-gallery-slides').not('.slick-initialized').slick(slickVar);
    };

    // slick initialization while document ready
    runBuySlick();

    // listen to jQuery's window resize
    $(window).on('resize', function(){
      var width = $(window).width();
      if(width > maxWidth) {
        // reinit slick while window's width is less than maximum width (641px)
        runBuySlick();
      }
    });
  });

})(jQuery);

(function($, drupalSettings)
{
  // Add Filters text above facets.
  if (drupalSettings.mattel_config) {
    var strings = drupalSettings.mattel_config.js_strings;
    $('.path-card-library #block-exposedformcard-librarypage-1').prepend('<div class="search-results">' + strings.card_title + '</div>');
  }

  // Submit Card Search on clicking a checkbox.
  $('#block-exposedformcard-librarypage-1')
    .find('input, select')
    .on('change', function() {
      $(this).parents('form').submit();
    });

  $(document).ready(function() {
    // Attack Power Range slider
    var $attack_min = $("#edit-attack-min");
    var $attack_max = $("#edit-attack-max");
    // Create div for the range numbers.
    var $attack_info = $("<div id='attack-info'></div>").appendTo(".form-item-attack-min");
    // Create div for the slider.
    var $attack_slider = $("<div id='attack-slider'></div>").appendTo(".form-item-attack-min");
    $attack_slider.slider({
      range: true,
      min: 0,
      max: 70,
      values: [$attack_min.val(), $attack_max.val()],
      slide: function(event, ui) {
        $attack_min.val(ui.values[0]);
        $attack_max.val(ui.values[1]);
        $attack_info.text(ui.values[0]+" - "+ui.values[1])
      },
      stop: function() {
        $attack_min.change();
      }
    });
    $attack_min.val($attack_slider.slider("values", 0));
    $attack_max.val($attack_slider.slider("values", 1));
    $attack_info.text($attack_slider.slider("values", 0)+" - "+$attack_slider.slider("values", 1));

    // Defense Power Range slider
    var $defense_min = $("#edit-defense-min");
    var $defense_max = $("#edit-defense-max");
    // Create div for the range numbers.
    var $defense_info = $("<div id='defense-info'></div>").appendTo(".form-item-defense-min");
    // Create div for the slider.
    var $defense_slider = $("<div id='defense-slider'></div>").appendTo(".form-item-defense-min");
    $defense_slider.slider({
      range: true,
      min: 0,
      max: 100,
      values: [$defense_min.val(), $defense_max.val()],
      slide: function(event, ui) {
        $defense_min.val(ui.values[0]);
        $defense_max.val(ui.values[1]);
        $defense_info.text(ui.values[0]+" - "+ui.values[1])
      },
      stop: function() {
        $defense_min.change();
      }
    });
    $defense_min.val($defense_slider.slider("values", 0));
    $defense_max.val($defense_slider.slider("values", 1));
    $defense_info.text($defense_slider.slider("values", 0)+" - "+$defense_slider.slider("values", 1));
  });
})(jQuery, drupalSettings);

(function($)
{
  $(document).ready(function(){
    // Add indexes to the card modals.
    var $cards = $('.card-lib-modal');
    $cards.each(function(index) {
      $(this).attr('data-index', index);
    });
    $cards.first().addClass('first');
    $cards.last().addClass('last');

    // On a modal arrow nav click navigate to either the next or previous
    // modal. Will loop through the elements forward or backward.
    $('.card-nav').click( function(){
      // find the grandparent element
      var grandparent = $(this).closest(".view-card-library");
      // find the parent element
      var parent = $(this).closest("div.card-lib-modal");
      // get the index of the current modal from the parent element
      var index = parent.data('index');
      // set the next modal index
      var next_modal_index = index + 1;
      // set the previous modal index
      var prev_modal_index = index - 1;
      // get total number of siblings by getting the index of the last item
      var num_modals = grandparent.find('.last').data('index');
      // check if this is the first modal, if so then
      // the index will have to be adjusted so prev
      // will take the use to the last item
      if( parent.hasClass('first')) {
        prev_modal_index = num_modals;
      }
      // check if this is the last modal, if so then
      // the index will have to be adjusted so next
      // will take the use to the first item
      if( parent.hasClass('last')) {
        next_modal_index = 0;
      }
      // close all open modals
      $('.modal').modal('hide');
      //get the next modal id using the next index
      var next_modal_id = grandparent.find("[data-index='" + next_modal_index + "']").attr('id');
      //get the prev modal id using the prev index
      var prev_modal_id = grandparent.find("[data-index='" + prev_modal_index + "']").attr('id');
      // check if this is a previous click or a next click
      if($(this).hasClass('card-prev')) {
        // show the previous modal
        $('#' + prev_modal_id).modal('show');
      } else {
        // show the next modal
        $('#' + next_modal_id).modal('show');
      }
    });
  });
})(jQuery);

(function($)
{
  $(document).ready(function(){
    // On a modal arrow nav click navigate to either the next or previous
    // modal. Will loop through the elements forward or backward.
    $('.character-nav').click( function(){
      // find the grandparent element
      var grandparent = $(this).closest(".container-character-gallery");
      // find the parent element
      var parent = $(this).closest("div.character-modal");
      // get the index of the current modal from the parent element
      var index = parent.data('index');
      // set the next modal index
      var next_modal_index = index + 1;
      // set the previous modal index
      var prev_modal_index = index - 1;
      // get total number of siblings by getting the index of the last item
      var num_modals = grandparent.find('.last').data('index');
      // check if this is the first modal, if so then
      // the index will have to be adjusted so prev
      // will take the use to the last item
      if( parent.hasClass('first')) {
        prev_modal_index = num_modals;
      }
      // check if this is the last modal, if so then
      // the index will have to be adjusted so next
      // will take the use to the first item
      if( parent.hasClass('last')) {
        next_modal_index = 0;
      }
      // close all open modals
      $('.modal').modal('hide');
      //get the next modal id using the next index
      var next_modal_id = grandparent.find("[data-index='" + next_modal_index + "']").attr('id');
      //get the prev modal id using the prev index
      var prev_modal_id = grandparent.find("[data-index='" + prev_modal_index + "']").attr('id');
      // check if this is a previous click or a next click
      if($(this).hasClass('character-prev')) {
        // show the previous modal
        $('#' + prev_modal_id).modal('show');
      } else {
        // show the next modal
        $('#' + next_modal_id).modal('show');
      }
    });
  });
})(jQuery);

(function($)
{
  $(document).ready(function(){
    $('.character-gallery-slides').not('.slick-initialized').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      dots: true,
      arrows: true,
      centerMode: false,
      infinite: false,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1176,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: false,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows: false
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  });
})(jQuery);

(function ($) {
    // close the collapse menu when link is cliked
    // fixes problem for named anchors
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });


    function externalLink(link) {
        $(link).click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            window.open(this.href, '_blank');
        });
    }

    // make footer links open in new window
    // for all nav external links
    $(document).ready(function () {
        $('.link-container > div > a').each(function () {
            var a = new RegExp('/' + window.location.host + '/');
            if (!a.test(this.href)) {
                externalLink(this);
            }
        });

        $('#footer-nav > li > a:not(:first)').each(function () {
            externalLink(this);
        });

        // Add button to remove admin tabs from page until next page reload.
        var span = '<li><span class="glyphicon glyphicon-remove-circle" data-toggle="tooltip" data-original-title="Click this to remove admin tabs until next page reload."></span></li>';
        $('#block-mattel-battleclaw-local-tasks .local-tasks ul').prepend(span).find('.glyphicon').click(function () {
            // Trigger mouseout here to get rid of hover element.
            $(this).trigger('mouseout');
            $('#block-mattel-battleclaw-local-tasks').remove();
        });

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('#footer .footer-menu').click(function () {
                $(this).find('.dropdown').toggleClass("active");
                //                $('.drowdown').stop().slideUp();
                //                $(this).find('.dropdown').stop().slideToggle();
            });
        }

    });
})(jQuery);

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
var EventHook = (function () {
    return {
        /** Scroll event hook
         * @param attach [object] the DOM element to attach to (ex: window, default: window)
         * @param type [string] type of event to listen for
         * @param callback [function] function to call when event is triggered
         * @param options [string] specifies characteristics about the event listener
         */
        scroll: function (attach, type, callback, options) {
            attach = attach || window;
            if (typeof callback !== "function") {
                console.error(callback, "is not a function");
                return false;
            }
            attach.addEventListener(type, callback, options);
        }
    };
}());

// Generic events
jQuery(document).ready(function () {
    EventHook.$scroll = {
        classes: [
        "scrolled-off-origin-x",
        "scrolled-off-origin-y",
        "scrolled-x",
        "scrolled-y",
        "scrolled-up",
        "scrolled-down",
        "scrolled-left",
        "scrolled-right"
    ],
        direction: {
            x: 0,
            y: 0
        },
        event: null,
        preserve: {
            x: 0,
            y: 0
        }
    };
    EventHook.scroll(window, "scroll", function (event) {
        EventHook.$scroll.direction.x = window.scrollX - EventHook.$scroll.preserve.x;
        EventHook.$scroll.direction.y = window.scrollY - EventHook.$scroll.preserve.y;
        EventHook.$scroll.event = event;
        EventHook.$scroll.preserve.x = window.scrollX;
        EventHook.$scroll.preserve.y = window.scrollY;
        EventHook.$scroll.classes.map(function (c) {
            jQuery("body").removeClass(c);
        });
        if (window.scrollX !== 0) {
            jQuery("body").addClass("scrolled-off-origin-x");
        }
        if (window.scrollY !== 0) {
            jQuery("body").addClass("scrolled-off-origin-y");
        }
        if (EventHook.$scroll.direction.x < 0) {
            jQuery("body").addClass("scrolled-x scrolled-left");
        } else
        if (EventHook.$scroll.direction.x > 0) {
            jQuery("body").addClass("scrolled-x scrolled-right");
        }
        if (EventHook.$scroll.direction.y < 0) {
            jQuery("body").addClass("scrolled-y scrolled-up");
        } else
        if (EventHook.$scroll.direction.y > 0) {
            jQuery("body").addClass("scrolled-y scrolled-down");
        }
    });
});

// Global function so product feed can use this
function univarsalSlick(selector) {
    //    console.log(selector);
    var universalSlickOptions = {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
        },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
        },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "20vw"

                }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    };
    var $ = jQuery;

    // find the active index to figure out the left and right index deltas
    function dotIndexOffset(slick) {
        if (false && slick.$dots !== null) {
            var activeIndex = Math.round(slick.currentSlide / slick.options.slidesToScroll),
                dots = slick.$dots.find("li"),
                inBoundsI = 0;
            dots.map(function (i, o) {
                var offset = Math.abs(i - activeIndex);
                $(o).attr("data-active-offset", offset);
                if (offset > 6) {
                    $(o).attr("data-active-offset-out-of-bounds", true);
                } else {
                    $(o).attr("data-active-offset-out-of-bounds", false);
                    inBoundsI += 1;
                }
            });
        }
    }
    $(selector)
        .on("init", function (event, slick) {
            // Run speedbump anchor setup
            SpeedBump.link_setup();
            dotIndexOffset(slick);
        })
        .on("reInit", function (event, slick) {
            // Run speedbump anchor setup
            SpeedBump.link_setup();
            dotIndexOffset(slick);
        })
        .on("beforeChange", function (event, slick) {
            dotIndexOffset(slick);
        })
        .on("afterChange", function (event, slick) {
            dotIndexOffset(slick);
        })
        .slick(universalSlickOptions);
}
var gallery = (function () {
    //    console.log("trace:", "gallery");
    var $ = jQuery;
    var pager;
    var filterSelector = ".universal-gallery .filter";
    var tileSelector = ".universal-gallery .gallery-content.Grid .galleryTileCarouselTile[data-item-id]";
    var allSelector = ".universal-gallery .filter.all"
    var activeFiltersSelector = ".universal-gallery .filter.active";
    var pageSize = 12;
    var initialItems = 0;
    var itemHash;
    var activeFilterIDs;
    var activeItems;


    function initGalleryFiltering() {
        //        console.log("trace:", "initGalleryFiltering()");
        itemHash = buildItemHash();
        //        console.log("itemHash", itemHash);
        filterGallery();
    }

    function buildItemHash() {
        //        console.log("trace:", "buildItemHash()");
        return $(tileSelector).map(function (i, v) {
            return $(v).data();
        }).toArray();
    }

    function filterGallery() {
        //        console.log("trace:", "filterGallery()");
        activeFilterIDs = getActiveFilterIds();
        //        console.log("activeFilterIDs", activeFilterIDs);
        if (activeFilterIDs.length == 0) {
            activeItems = itemHash;
        } else {
            activeItems = _.filter(itemHash, filterActiveItems);
        }
        //        console.log("activeItems", activeItems);

        //console.log("FilterGallery", activeItems);
        //processActiveItems();
        processPaging();
    }

    function bufferGallery() {
        //        console.log("trace:", "bufferGallery()");
        var visible_elements,
            top,
            count = 0,
            max_cols = 3,
            activeItems_length,
            activeItems_delta;
        // Below max_cols we don't care, buffer to max_cols
        if (activeItems.length > max_cols) {
            // get active elements
            visible_elements = $(tileSelector).filter(".active");
            // get top of first active element (to check against)
            top = visible_elements.eq(0).offset().top;
            // loop over the first few (max_cols) to find out how many are in row
            for (var i = 0; i <= max_cols; i++) {
                if (typeof visible_elements.eq(i).offset() === "undefined" || top != visible_elements.eq(i).offset().top) {
                    break;
                }
                count += 1;
            }
        } else {
            // default to max_cols
            count = max_cols;
        }

        // remove all buffer elements
        $('.gallery-fill-items').remove();
        // round up active items base(count)
        activeItems_length = Math.ceil(activeItems.length / count) * count;
        // find delta of rounded and actual
        activeItems_delta = activeItems_length - activeItems.length;
        // loop over delta to add buffer elements
        while (activeItems_delta--) {
            $('.gridTileWrapper').append('<div class="gallery-fill-items galleryTileCarouselTile"></div>')
        }
    }

    function getActiveFilterIds() {
        //        console.log("trace:", "getActiveFilterIds()");
        return $(activeFiltersSelector).map(function (i, v) {
            return $(v).data("filter-id");
        }).toArray();
    }

    function processActiveItems(pageData) {
        //        console.log("trace:", "processActiveItems(pageData)");
        //        console.log("pageData", pageData);
        $(tileSelector).removeClass("active").hide();
        var itemSlice = activeItems.slice(pageData.slice[0], pageData.slice[1]);
        //        console.log("itemSlice", itemSlice);
        _.each(itemSlice, function (v) {
            $("#gallery-item-" + v.itemId).addClass("active").fadeIn("slow");
        });
        // Add empty buffer items
        bufferGallery();
        // if($(document).scrollTop() > 0){
        //   $('html, body').animate({
        //     scrollTop: $(".gallery-content.Grid").offset().top
        //   }, 500);
        // }
    }

    function filterActiveItems(v, i) {
        //        console.log("trace:", "filterActiveItems(v, i)");
        var intersect = _.intersection(activeFilterIDs, v.filterIds);
        return intersect.length > 0;
    }

    function processPaging() {
        //        console.log("trace:", "processPaging()");
        enablePaging();
        // if (activeItems > pageSize) {
        //   enablePaging();
        // } else {
        //   destroyPaging();
        // }
    }

    function enablePaging() {
        //        console.log("trace:", "enablePaging()");
        var activeItems_length = activeItems.length;
        //        console.log("activeItems_length", activeItems_length);
        pager = $(".gallery-content.Grid .gallery-pagination").paging(activeItems_length, {
            format: '< ncnnn >',
            perpage: pageSize,
            page: 1,
            lapping: 0,
            circular: true,
            onSelect: function (page) {
                processActiveItems(this);
            },
            onFormat: function (type) {
                var cssClass = this.value != this.page ? "" : "current";
                switch (type) {
                    case 'block': // n and c
                        return '<a class="border ' + cssClass + '">' + this.value + '</a>';
                    case 'next': // >
                        return '<a class="arrow next"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>';
                    case 'prev': // <
                        return '<a class="arrow prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>';
                    case 'first': // [
                        return '<a>first</a>';
                    case 'last': // ]
                        return '<a>last</a>';
                }
            }
        });
        //        console.log("pager", pager);
    }

    function destroyPaging() {
        //        console.log("trace:", "destroyPaging()");
        $(".gallery-content.Grid .gallery-pagination").html("");
    }


    jQuery(document).ready(function () {

        initGalleryFiltering();

        jQuery(window).resize(function () {
            bufferGallery();
        });

        univarsalSlick(jQuery(".universal-gallery .Slider"));

        $(".universal-gallery .filters-title").on("click", function () {
            $(".universal-gallery .filters-wrapper").toggleClass("expanded");
        });

        jQuery(filterSelector).on("click", function () {
            jQuery(this).toggleClass("active");
            filterGallery();
        });
    });

})();

(function($, drupalSettings)
{
  if (drupalSettings.mattel_config) {
    var strings = drupalSettings.mattel_config.js_strings;
    // Swap out header text on Category search facet for mobile browsers.
    if (jQuery.browser.mobile) {
      $('#edit-category--wrapper')
        .find('legend span')
        .text(strings.games_refine)
        .on('click', function() {
          $('#edit-category--wrapper')
            .find('.fieldset-wrapper')
            .toggle();
        });
    }

    // Add Search Results text above facets.
    $('.path-games #block-exposedformgame-searchpage-1').prepend('<div class="search-results">' + strings.games_title + '</div>');
  }

  // Submit Games Search on clicking a checkbox.
  $('#block-exposedformgame-searchpage-1')
    .find('.form-checkbox')
    .on('change', function() {
      $(this).parents('form').submit();
    });

  // Add buttons under Game Search title for search items selected.
  var $checked = $('#views-exposed-form-game-search-page-1 input[type=checkbox]:checked');
  if ($checked.length > 0) {
    $('.path-games #block-mattel-games-page-title')
      .append('<div class="search-params clearfix"></div>');
  }

  // Get query string as object.
  var queries = param();
  // If there is a title searched on, add that to the search box.
  if ('title' in queries) {
    $('#desktop-search-form, #mobile-search-form').find('#edit-title').val(queries.title);
    // If someone has search on title, add that to the checkbox form.
    $('<input type="hidden" name="title">').val(queries.title).appendTo('#views-exposed-form-game-search-page-1');
  }

  // Adds the things checked to under the Page title.
  $checked.each(
    function (index) {
      var queries = param();
      // Add checkbox searches to the title search form.
      $('<input type="hidden">').attr('name', this.name).val(queries[this.name]).appendTo('#desktop-search-form, #mobile-search-form');
      // Remove this parameter.
      delete queries[this.name];
      // Rebuild query string.
      var query_string = $.param(queries, true);
      if (query_string) {
        query_string = '?' + query_string;
      }
      var label = $(this).siblings('label')[0].innerText;

      $('.search-params')
        .append('<div class="search-param"><a href="/games'+query_string+'">'+label+'</a></div>');
    }
  );
})(jQuery, drupalSettings);

(function($)
{
  $(document).ready(function(){
    // 4 item carousel.
    $('.game-gallery-slides').not('.slick-initialized').not('.game-display-2').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      dots: true,
      arrows: true,
      centerMode: false,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1192,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            dots: false,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows: false
          }
        }
      ]
    });

    // 2 item carousel.
    $('.game-gallery-slides').not('.slick-initialized').not('.game-display-4').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: true,
        arrows: true,
        centerMode: false,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1192,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                    arrows: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                    arrows: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    arrows: false
                }
            }
        ]
    });

  });
})(jQuery);

(function ($) {

    $('.myCarousel').carousel({
        interval: false
    });

    // handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        var id = id_selector.substr(id_selector.length - 1);
        id = parseInt(id);
        $(this).parents('.image-and-text-carousel').find('.myCarousel').carousel(id);
        $(this).parents('ul').find('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
    });

})(jQuery);
 
(function($)
{


    $('.language-selector').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val(),
                hreflang: $this.children('option').eq(i).attr('hreflang'),
                url: $this.children('option').eq(i).attr('data-drupal-link-system-path')
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();


            var lang = $(this).attr('hreflang');
            var path = $(this).attr('url');

            if(path == '<front>') {
              path = '';
            }
            
            var fullPath = '/' + lang + '/' + path;
            window.location.href=fullPath;
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });


})(jQuery);

(function($)
{
	$(window).load(function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");;
	});
})(jQuery);

(function($){
  $(document).ready(function(){
      // Hover over nav items
      $('.main-nav-wrapper [data-dropdown="true"]').each(function(){
          $(this).mouseenter(function(){
              $(this).addClass("active");
          });
          $(this).mouseleave(function(){
              $(this).removeClass("active");
          });
      });
      
      // Hamburger nav item
      $('#nav-toggle-btn').click(function(){
         $(this).toggleClass("active"); 
         $(this).closest('#main-nav').toggleClass("active-mobile"); 
      });
  }); 
})(jQuery);
(function ($) {

    function matchHeightByRow() {
        var top_align = 0,
            groups = [],
            group = [],
            max_height = 0,
            selector = $(".match-height-row"),
            length = selector.length;
        selector.css({"height":"auto"});
        selector.each(function (i) {
            var top = Math.floor($(this).offset().top / 10);
            // find new rows of content
            if (top_align !== top) {
                // if the row is new and the group is populated
                if (group.length > 0) {
                    groups.push({
                        group: group,
                        height: max_height
                    });
                }
                // start new group
                group = [];
                max_height = 0;
                // add this obj to the new group
                top_align = top;
            }
            // add this obj to the group
            max_height = Math.max(max_height, $(this)[0].clientHeight);
            group.push($(this));
            // catch the last group
            if (i + 1 === length) {
                groups.push({
                    group: group,
                    height: max_height
                });
            }
        });
        groups.map(function (group) {
            group.group.map(function (element) {
                $(element).height(group.height);
            });
        });
    }
    $(document).ready(function () {
        matchHeightByRow();
        $(window).load(function () {
            matchHeightByRow();
        })
        $(window).resize(function () {
            matchHeightByRow();
        })
    })

})(jQuery);

(function($)
{
  $(document).ready(function(){
    // make sure modal appears above overlay
    $(document).on('show.bs.modal', '.modal', function () {
        $(this).appendTo('body');
      });
  });
})(jQuery);

function populateAppModal(id) {
  var header = jQuery('#app-modal-header-text').val();
  var body = jQuery('#app-modal-body-text').val();
  var back = jQuery('#app-modal-back-text').val();
  jQuery(id).find('#header-text').text(header);
  jQuery(id).find('#body-text').text(body);
  jQuery(id).find('#back-text').text(back);
}
function ptq(q)
{
    /* Query String Parser */
    /* semicolons are nonstandard but we accept them */
    var x = q.replace(/;/g, '&').split('&'), i, name, t;
    /* q changes from string version of query to object */
    for (q={}, i=0; i<x.length; i++)
    {
        t = x[i].split('=', 2);
        name = decodeURIComponent(t[0]);
        if (!q[name])
            q[name] = [];
        if (t.length > 1)
        {
            q[name][q[name].length] = decodeURIComponent(t[1]);
        }
        /* next two lines are nonstandard */
        else
            q[name][q[name].length] = true;
    }
    return q;
}

function param() {
    return ptq(location.search.substring(1).replace(/\+/g, ' '));
}

var poster = (function(id) {
    bindEvents();

    function bindEvents(){
      //poster image
      jQuery("#posterBackground").on('load', function() {
        var src = jQuery(this).attr("src");
        jQuery(this).hide(); // prevent memory leaks as @benweet suggested
        //jQuery('.insideWrapper').css('background-image', 'url(' + src + ')');
      });
      //product click
      jQuery(".product").on("click", function(e){
        e.preventDefault();
        jQuery(this).toggleClass("gotIt");
        toggleCookie(e.currentTarget.dataset.sku);
      });

      //download click
      jQuery(".download-click a, .download-poster-it .image-and-text-text a, #poster").on("click", function(e){
        e.preventDefault();
        //console.log("Downloading Poster");
        buildPDF();
      });

      jQuery(document).ready(function(){
        applyCookieValuesToPoster();
        applyCookieValuesToGallery();
      });

    }


    function applyCookieValuesToGallery(){
      var cookies = getVehicleArray();
      for(var i = 0; i < cookies.length; i++){
       var vehicle = jQuery(".product[data-sku='" + cookies[i] + "']");
       vehicle.addClass("gotIt");
      }
    }

    function applyCookieValuesToPoster(){
      var cookies = getVehicleArray();
      for(var i = 0; i < cookies.length; i++){
       if (cookies[i] && cookies[i] !== '') {
        var vehicle = jQuery("." + cookies[i]);
        vehicle.addClass("isSelected");
       }
      }
    }

    function getVehicleArray(){
      var cookie = Cookies.get("vehicles");
      if(cookie){
        return JSON.parse(cookie);
      } else {
        return [];
      }
    }

    function setVehicleArray(arr){
      Cookies.set("vehicles", JSON.stringify(_.uniq(arr)));
    }

    function buildPDF(){
      var options = {};
      var pdf = new jsPDF('p', 'pt', 'a4');
      var poster = jQuery("#poster");
      poster.toggleClass("hidden");
      setTimeout(function(){
        pdf.addHTML(poster, 0, 0, options, function() {
          //pdf.save('FastandFuriousPoster2017.pdf');
          pdf.output('datauri');

          jQuery("#poster").toggleClass("hidden");
        });
      }, 0);
    }

    function toggleCookie(sku){
      console.log("toggleCookie", sku);
      var vehicle_array = getVehicleArray()
      if(_.indexOf(vehicle_array, sku) == -1){
        //it's not in there so let's add it
        vehicle_array.push(sku);
      } else {
        // it was in there so lets remove it
        vehicle_array = _.without(vehicle_array, sku);
      }
      setVehicleArray(vehicle_array);
    }

})();

(function ($) {
    $(document).ready(function () {
        if (typeof productFeedJSON !== "undefined") {
            var template = null,
                parent = null,
                section = null,
                AJAX;
            // fetch template
            template = $("#productFeedJSON-template");
            // find parent
            parent = template.parent();
            // find section
            section = template.closest('section');
            // string-fy template
            template = template.html().replace(/\n|\r|\t/g, '');
            // remove template
            $("#productFeedJSON-template").remove();
            productFeedJSON = productFeedJSON.replace(/\&amp\;/, "&");
            console.log(productFeedJSON);
            AJAX = {
                type: "GET",
                url: productFeedJSON,
                dataType: 'json',
                //cache: false,
                crossDomain: true,
                dataType: 'jsonp',
                success: function (response) {
                    // replace template tokens and append
                    response.map(function (r, i) {
                        if (r.image !== null && r.image !== "") {
                            //console.log(r);
                            var new_template = template;
                            new_template = new_template.replace(/\[\%url\%\]/g, r.url);
                            new_template = new_template.replace(/\[\%topic\%\]/g, r.topic);
                            new_template = new_template.replace(/\[\%image\%\]/g, '<img src="' + r.image + '" id="product-feed-img-' + i + '" />');
                            new_template = new_template.replace(/\[\%title\%\]/g, r.title.split("|")[0].trim());
                            //console.log($(new_template));
                            parent.append($(new_template));
                            $('#product-feed-img-' + i).load(function () {
                                //console.log($(this), $(this).context.naturalHeight, $(this).context.naturalWidth);
                                if ($(this).context.naturalHeight >= $(this).context.naturalWidth) {
                                    $(this).addClass("portrait");
                                } else {
                                    $(this).addClass("landscape");
                                }
                            })
                        }
                    });
                    $(".product-gallery").addClass("universal-gallery");

                    // * univarsalSlick() lives in gallery.js (as of jan 9 2018)
                    univarsalSlick(jQuery(".product-gallery .Slider"));
                },
                error: function (response) {
                    console.warn("Product feed JSON", response);
                    section.remove();

                }
            };

            $.ajax(AJAX);
        }
    });
})(jQuery);

(function ($) {
    $(document).ready(function () {
        $(".promo-gallery-slides:not(.slide-qty-1)").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 6000,
            responsive: [ 
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: false,
                    }
                } //,
//                {
//                    breakpoint: 769,
//                    settings: {
//                        slidesToShow: 2,
//                        slidesToScroll: 2
//                    }
//                },
//                {
//                    breakpoint: 481,
//                    settings: {
//                        slidesToShow: 1,
//                        slidesToScroll: 1,
//                        arrows: false,
//                        centerMode: true,
//                        centerPadding: "20vw",
//                        dots: false
//
//                    }
//                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]

        });
    })
})(jQuery);

var SpeedBump = (function () {
    var $ = jQuery;
    return {
        link_setup: function () {
            // FIND EXTERNAL LINKS
            $.expr[":"].external = function (a) {
                // DO NOT INCLUDE THE FOLLOWING MATCHES: EMAIL LINKS, TELEPHONE LINKS, HOSTNAME

                // DEBUG...
                //  console.log(a);
                // link
                //  console.log(a.href);

                // not email link
                //  console.log("!a.href.match(/^mailto\:/)", !a.href.match(/^mailto\:/));
                // not telephone link
                //  console.log("!a.href.match(/^tel\:/)", !a.href.match(/^tel\:/));
                // not carousel selector
                //  console.log("!a.id.match(/^carousel-selector-/)", !a.id.match(/^carousel-selector-/));
                // not empty
                //  console.log("a.href !== ''", a.href !== '', "a.href !== null", a.href !== null);
                // not corp site
                //  console.log("a.hostname !== 'corporate.mattel.com'", a.hostname !== 'corporate.mattel.com');
                // not current site
                //  console.log("a.hostname !== location.hostname", a.hostname !== location.hostname);

                return (
                    // not in a app modal 
                    $(a).parents('.app-modal').length == 0 &&
                    // not email link
                    !a.href.match(/^mailto\:/) &&
                    // not telephone link
                    !a.href.match(/^tel\:/) &&
                    // not carousel selector
                    !a.id.match(/^carousel-selector-/) &&
                    // not empty
                    a.href !== '' && a.href !== null &&
                    // not corp site
                    a.hostname !== 'corporate.mattel.com' &&
                    // not current site
                    a.hostname !== location.hostname
                );
            };
            // ADD EXTERNAL LINK CLASS .ext_link FOR STYLING
            $("a:external").addClass("ext_link");

            // ADD INTERSTITIAL ATTRIBUTES IF ALLOWED BY CMS
            $('a:external').each(function () {
                // ADD TARGET _BLANK IF ALLOWED
                if (!$(this).attr("target")) {
                    $(this).attr("target", "_blank");
                }
                if ($(this).closest('[data-show-interstitial]').attr('data-show-interstitial') != 0) {
                    // ADD BOOTSTRAP DATA-TOGGLE ATTRIBUTE TO THE LINKS
                    $(this).attr('data-toggle', 'modal');
                    // ADD BOOTSTRAP DATA-TARGET ATTRIBUTE TO THE LINKS
                    $(this).attr('data-target', '#speedbump-general');
                }
            });

            // ADD THE LINK AND TITLE TO THE MODAL WINDOW
            $(function () {
                $('a.ext_link').on('click', function (e) { 
                    var url = $(this).attr('href'),
                        title = $(this).attr('title'),
                        target = $(this).attr('target');
                    if (target && target.length && target === '_blank') {
                        $('#general_url_link').attr('target', target);
                        $('#general_url_link').attr('href', url);
                    } else {
                        $('#general_url_link').attr('href', url);
                    }

                });
            });

            $(document).on('click', '#general_url_link', function () {
                $('#speedbump-general').modal('hide');
            });
        }
    };
}());

jQuery(document).ready(function () {
    SpeedBump.link_setup();
});

(function($)
{
  var currentlyPlaying = 0;
  var videoCounter = 0;
  var eventAutoplayHolder;
  var nowPlayingTextData;

  function videoGallerySlickSliderSettings() {
    console.log("video_gallery.js");
    return {
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: false,
      arrows: true,
      centerMode: false,
      infinite: false,
      centerPadding: '60px',
      variableWidth: true,
      autoplay: false,
      swipe: true,
      responsive: [
        {
          breakpoint: 1176,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            centerMode: false,
            autoplay: false,
            swipe: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true,
            dots: false,
            autoplay: false,
            swipe: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            centerPadding: '10px',
            swipe: true,
            centerMode: false,
            infinite: false
          }
        }
      ]
    };
  }

  // load slock slider
  function videoGallerySlickSlider() {
    var settings = videoGallerySlickSliderSettings();
    $('.video-gallery-slides').slick(settings).show();
  }

  // this function consolidates the changes to the now playing icon
  function changeToNowPlaying(slide, nowPlayingTextData) {

    // remove the now playing from all instances on page
    $('.video-gallery-slide').removeClass('playingNow');
    $('.playing-overlay').empty();
    $('.playing-overlay').addClass('slide-overlay');
    $('.playing-overlay').removeClass('playing-overlay');

    // add now playing to the current element
    slide.addClass('playingNow');
    var slide_overlay = slide.find('.slide-overlay')
    slide_overlay.addClass('playing-overlay');
    slide_overlay.removeClass('slide-overlay');
    slide_overlay.html('<span>' + nowPlayingTextData + '</span>' );
  }

  // DO THIS ONE AT A TIME !!!
  function videoGallerySlickSliderIndividual(e) {
    var settings = videoGallerySlickSliderSettings();
    console.log("video", e);
    e.find('.video-gallery-slides').slick(settings).show();
  }

  $(document).on('click','.video-gallery-slide > .video-slide-inner > a',function() {
    $(".running-video-details").html($(this).find("> span").html());
    // get the gallery container element
    var container = $(this).closest('.video-gallery-carousel-container');
    // get the now playing text
    var now_playing_text = container.data('now-playing-text');
    // get the parent element of this slide
    var slide = $(this).closest('.video-gallery-slide');
    // get the first player above the gallery
    var player = $('.ooyala-video-player');
    //
    var playerid = player.attr('id');
    //
    var playerIndex = playerid.substring(playerid.lastIndexOf("-")+1,playerid.length);
    //
    playerIndex--;
    //
    var video_id = slide.data('video-id');
    // set the new video to be played
    MattelVideoPlayer.ooPlayerInstances.players[playerIndex].setEmbedCode(video_id);
    // play the new video
    MattelVideoPlayer.ooPlayerInstances.players[playerIndex].play();
    // move now playing icon
    changeToNowPlaying(slide, now_playing_text);

    // scroll to the video player.
    $('html, body').animate(
      { scrollTop: player.offset().top },
      'slow'
    );
  });

  $(document).ready(function(){

    // find each gallry container to load the videos from ooyala
    $('.video-gallery-carousel-container').each(function(){
      var curr_div = $(this);
      //console.log("Current Carousel", $(this));
      // get the div to load the carousel into
      var carousel_div = $(this).find('.video-gallery-slides');
      // get the playlist id (json) for the container
      var video_list_id = $(this).data('video-list-id');
      // initialize empty string to hold carousel HTML
      var carousel = '';
      // check that the json exists
      if(video_list_id && video_list_id.length) {
        // create asyncronous call
        $.ajax({
          //use the video list if as the url endpoint
          url: video_list_id,
          gallery: $(this),
          //
          type: 'GET',

          error: function(a,b,c){
            console.log("Video Error", a,b,c);
          },
          // on successful call to the enpoint, run function
          success: function(res) {
            // parse to useable variables
            var json = JSON.parse(res);
            // asign item list to more readable variable
            var itemList = json.items.item;
            // initilize the counter
            var counter = 0;
            // loop through videos returned from the ajax call
            for (var key in itemList) {
              // assign title to variable
              var title = itemList[key].title;
              // assign description to variable
              var desc = itemList[key].description;
              // assign thumbnail image to variable
              var thumb = itemList[key].thumbnail;
              // if first item add playing now
              var playingNow = counter === 0 ? 'playingNow' : '';
              // assign the content id to a variable
              var contentid = itemList[key].contentid;
              // build the carousel HTML
              carousel += '<div id="video-gallery-slide-' + key + '"  class="video-gallery-slide" data-video-id="' + contentid + '">';
              carousel += '  <div class="video-slide-inner">';
              carousel += '    <a data-tracking-id="videos|play|' + title + '|videos - landing page|null">';
              carousel += '      <div class="video-thumbnail">';
              carousel += '        <div class="slide-overlay"></div>';
              carousel += '        <img src="'+ thumb +'" />';
              carousel += '      </div>';
              carousel += '      <span>';
              carousel += '        <h4>'+ title +'</h4>';
              carousel += '        <p>'+ desc +'</p>';
              carousel += '      </span>';
              carousel += '    </a>';
              carousel += '  </div>';
              carousel += '</div>';
              // increment the counter
              counter++;
            }
            // load the carousel html into the template
            carousel_div.html(carousel);
            videoGallerySlickSliderIndividual(this.gallery);
          }
        });
      }
    });

  });
})(jQuery);

var lastPlayedIndex = 0;
(function($)
{
  var currentlyPlaying = 0;
  var videoCounter = 0;
  var eventAutoplayHolder;
  var nowPlayingTextData;

  var media = $('#main-player-enchantimals');
  var autoPlayHolder = $('#main-player-wrapper').find('.ooyala-video-player').data('autoplay');
  var tolerancePixel = 0;


  function videoSlickSliderSettings() {
    return {
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: false,
      arrows: true,
      centerMode: false,
      infinite: false,
      centerPadding: '60px',
      variableWidth: true,
      autoplay: false,
      swipe: true,
      responsive: [
        {
          breakpoint: 1176,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            centerMode: false,
            autoplay: false,
            swipe: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: true,
            dots: false,
            autoplay: false,
            swipe: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            centerPadding: '10px',
            swipe: true,
            centerMode: false,
            infinite: false
          }
        }
      ]
    };
  }

  function videoSlickSlider() {
    var settings = videoSlickSliderSettings();
    $('.video-player-gallery-slides').not('.slick-initialized').slick(settings).fadeIn();
  }

  $(document).ready(function(){
    var fullPlaylist = [];
    var videoListEndpoint = $('#main-player-enchantimals').data('video-list-id');
    var autoPlay = $('#main-player-enchantimals').data('autoplay');
    var videoGalleryTitle =  $('#main-player-enchantimals').data('video-gallery-title');
    nowPlayingTextData = $('.video-player-carousel-container').data('now-playing-text');
    // if the endpoint is set from the CMS, then make the ajax call to the API
    if(videoListEndpoint && videoListEndpoint.length){
      $.ajax({
        url: videoListEndpoint,
        type: 'GET',
        success: function(res) {
          var json = JSON.parse(res);
          var itemList = json.items.item;
          // initialize empty string to hold player HTML
          var player = '';
          // initialize empty string to hold carousel HTML
          var carousel = '';
          // initilize the counter
          var counter = 0;
          // loop through videos returned from the ajax call
          for (var key in itemList) {
            // assign title to variable
            var title = itemList[key].title;
            // assign description to variable
            var desc = itemList[key].description;
            // assign thumbnail image to variable
            var thumb = itemList[key].thumbnail;
            // get a true or false string based on the autoplay setting
            var autoPlayInner = autoPlay > 0 ? 'true' : 'false';
            // if first item add playing now
            var playingNow = counter === 0 ? 'playingNow' : '';

            var nowplayingtext = counter === 0 ? '<span>' + nowPlayingTextData + '</span>'  : '';
            // if first item use the playing overlay, otherwise use the slide overlay class
            var overlay = counter === 0 ? 'playing-overlay' : 'slide-overlay';
            // assign the content id to a variable
            var contentid = itemList[key].contentid;
            // add the id into the full play list array
            fullPlaylist.push(contentid);
            // initilize the empty html for the player

            // initialize empty html for the carousel
            // the first item is loaded as the main video player
            if(counter === 0) {
              // build the player HTML
              player += '<div class="player-wrapper" id="main-player-wrapper">';
              player += '  <div class="ooyala-video-player" id="main-player-container" data-video-id="' + contentid + '" data-autoplay="'+ autoPlayInner +'"> </div>';
              player += '</div>';
              player += '<div class="running-video-details">';
              player += '  <h4>'+ title + '</h4>';
              player += (desc === 'NULL') ? '' : '  <p>' + desc + '</p>';
              player += '</div>';
            }

            // build the carousel HTML
            carousel += '<div id="video-player-gallery-slide-' + key + '"  class="video-player-gallery-slide '+ playingNow +'" data-video-id="' + contentid + '">';
            carousel += '  <div class="video-slide-inner">';
            carousel += '    <a data-tracking-id="homepage|play|' + title + '|homepage|null">';
            carousel += '      <div class="video-thumbnail">';
            carousel += '        <div class="'+ overlay +'">' + nowplayingtext + '</div>';
            carousel += '        <img src="'+ thumb +'" />';
            carousel += '      </div>';
            carousel += '      <span>';
            carousel += '        <h4>'+ title +'</h4>';
            carousel += (desc === 'NULL') ? '' : '        <p>'+ desc + '</p>';
            carousel += '      </span>';
            carousel += '    </a>';
            carousel += '  </div>';
            carousel += '</div>';

            // increment the counter
            counter++;
          }

          // load the player html into the template
          $('#main-player-enchantimals').html(player);
          // load the carousel html into the template
          $('#video-list').html(carousel);

          MattelVideoPlayer.init();

        }
      });
    }
    setTimeout(function(){
      videoSlickSlider();
    }, 3000);
  });

  $(window).on('resize', function(){
      //$('.video-player-gallery-slides').slick("unslick");
      videoSlickSlider();
  });

  $('#main-player-enchantimals').on('dividchanged', function() {
     //console.log('in bind2');
    if(MattelVideoPlayer.ooyalaApiLoaded) {
      //console.log('in bind');
      var player = $('#main-player-wrapper').find('.ooyala-video-player');
      eventAutoplayHolder = player.data('autoplay');
      var playerid = player.attr('id');
      var playerIndex = playerid.substring(playerid.lastIndexOf("-")+1,playerid.length);
      playerIndex--;

      // MattelVideoPlayer.ooPlayerInstances.players[playerIndex].mb.subscribe(OO.EVENTS.PLAYED, "completed", function() {
      //   var currentVid = $('.playingNow');
      //   var videoId = currentVid.data('video-id');
      //   currentlyPlaying++;
      //   var nextSlide = $('.video-player-gallery-slide').filter('[data-slick-index="'+currentlyPlaying +'"]');
      //   if(nextSlide && nextSlide.length){
      //     currentVid.removeClass('playingNow');
      //     var overlayHolder = currentVid.find('.playing-overlay');
      //     overlayHolder.removeClass('playing-overlay');
      //     overlayHolder.html('');
      //     overlayHolder.addClass('slide-overlay');
      //     MattelVideoPlayer.ooPlayerInstances.players[playerIndex].setEmbedCode(nextSlide.data('video-id'));
      //     MattelVideoPlayer.ooPlayerInstances.players[0].play();
      //     var title = nextSlide.find('h4').text();
      //     var desc = nextSlide.find('p').text();
      //     var updDetails = '<h4>'+ title  +'</h4>';
      //     updDetails += (desc === 'NULL') ? '' : '<p>' + desc + '</p>';
      //     $('.running-video-details').html(updDetails);
      //
      //   }
      //
      // });

      MattelVideoPlayer.ooPlayerInstances.players[playerIndex].mb.subscribe(OO.EVENTS.PLAYING, "Playing", function() {
        checkMedia();
        var currentVideoId = MattelVideoPlayer.ooPlayerInstances.players[playerIndex].getEmbedCode();
        var currentSlide = $('.video-player-gallery-slide').filter('[data-slick-index="'+currentlyPlaying +'"]');
        currentSlide.addClass('playingNow');
        var overlay = currentSlide.find('.slide-overlay');
        overlay.removeClass('slide-overaly');
        overlay.addClass('playing-overlay');
        overlay.html('<span>' + nowPlayingTextData + '</span>' );
      });

      MattelVideoPlayer.ooPlayerInstances.players[playerIndex].mb.subscribe(OO.EVENTS.PLAYED, "completed", function(event) {
        //console.log("Video Completed", event);
        var player = MattelVideoPlayer.ooPlayerInstances.players[playerIndex];
        //console.log("Player", player);
        var currentVideoId = MattelVideoPlayer.ooPlayerInstances.players[playerIndex].getEmbedCode();
        //console.log("Current Video", currentVideoId);
        //gets all things with a data-video-id, finds where in the list the current video is, plays the next one.
        var videos = $('[data-video-id]');
        //console.log("Videos", videos);
        var nextVideo = null;
        //not going to last video, because there isn't a next video!!!
        for(var i = lastPlayedIndex; i < videos.length - 1; i++){
          var video = videos[i];
          var videoId = $(video).data("video-id");
          if(videoId == currentVideoId){
            //check that the nextVideo isn't the same as the last for playlist players
            if($(videos[i+1]).data("video-id") != currentVideoId){
              nextVideo = videos[i+1];
            lastPlayedIndex = i+1;
            break
          }
          }
        }
        if(nextVideo){
          //console.log(nextVideo);
          $(nextVideo).find("a").click();
          // setTimeout(function(){
          //   console.log("playingh")
          //   MattelVideoPlayer.ooPlayerInstances.players[0].play();
          // }, 2000);

        }
        // $('[data-video-id]').each(function(index, element){
        //   console.log("Video Id", b.data("video-id"));
        //   if(b.data("video-id") == currentVideoId){
        //     //it's a match, get the next video
        //     console.log("Next Video", video[index+1]);
        //     videos[index+1].click();
        //   }
        // });
      });
    }
   });

   $(document).on('click','.video-player-gallery-slide > .video-slide-inner > a',function() {
      var slideId = $(this).parent().parent().data('slick-index');
      currentlyPlaying = slideId;
      var videoId = $(this).parent().parent().data('video-id');
      var player = $('#main-player-wrapper').find('.ooyala-video-player');
      var playerid = player.attr('id');
      var playerIndex = playerid.substring(playerid.lastIndexOf("-")+1,playerid.length);
      playerIndex--;
      var currentVid = $('.playingNow');
      if(MattelVideoPlayer.ooPlayerInstances.players[playerIndex]) {
        if(currentVid.length) {
          currentVid.removeClass('playingNow');
          var overlayHolder = currentVid.find('.playing-overlay');
          overlayHolder.removeClass('playing-overlay');
          overlayHolder.html('');
          overlayHolder.addClass('slide-overlay');
        }
        MattelVideoPlayer.ooPlayerInstances.players[playerIndex].setEmbedCode(videoId);
        MattelVideoPlayer.ooPlayerInstances.players[playerIndex].play();
        $(this).parent().parent().addClass('playingNow');
        var nowPlaying = $(this).parent().find('.slide-overlay');
        nowPlaying.removeClass('slide-overlay');
        nowPlaying.addClass('playing-overlay');
        nowPlaying.html('<span>' + nowPlayingTextData + '</span>' );
      }
      var title = $(this).find('h4').text();
      var desc = $(this).find('p').text();
      var updDetails = '<h4>'+ title  +'</h4>';
      updDetails += (desc === 'NULL') ? '' : '<p>' + desc + '</p>';
      $('.running-video-details').html(updDetails);

     // scroll to the video player.
     $('html, body').animate(
       { scrollTop: player.offset().top },
       'slow',
     function(){ checkMedia()});
   });

   function checkMedia(){
       // Get current browser top and bottom
       var scrollTop = $(window).scrollTop() + tolerancePixel;
       var scrollBottom = $(window).scrollTop() + $(window).height() - tolerancePixel;

       media.each(function(index, el) {
           var yTopMedia = $(this).offset().top;
           var yBottomMedia = $(this).height() + yTopMedia;

           if(scrollTop < yBottomMedia && scrollBottom > yTopMedia){ //view explaination in `In brief` section above
             //console.log("Visible play");
             MattelVideoPlayer.ooPlayerInstances.players[0].play();
            //  if(videoCounter === 0 && eventAutoplayHolder){
            //    var player = $('#main-player-wrapper').find('.ooyala-video-player');
            //    var playerid = player.attr('id');
            //    var playerIndex = playerid.substring(playerid.lastIndexOf("-")+1,playerid.length);
            //    if(!isNaN(playerIndex)){
            //      playerIndex--;
            //      if(MattelVideoPlayer.ooPlayerInstances.players[playerIndex]) {
            //          MattelVideoPlayer.ooPlayerInstances.players[playerIndex].play();
            //          videoCounter++;
            //      }
            //    }
            //  }
           } else {
             //console.log("Hidden pause");
             if(MattelVideoPlayer.ooPlayerInstances.players && MattelVideoPlayer.ooPlayerInstances.players.length > 0){
               MattelVideoPlayer.ooPlayerInstances.players[0].pause();
           }
            //  var player = $('#main-player-wrapper').find('.ooyala-video-player');
            //  var playerid = player.attr('id');
            //  if(playerid && playerid.length){
            //    var playerIndex = playerid.substring(playerid.lastIndexOf("-")+1,playerid.length);
            //    if(!isNaN(playerIndex)){
            //      playerIndex--;
            //      if(MattelVideoPlayer.ooPlayerInstances.players[playerIndex]) {
            //          MattelVideoPlayer.ooPlayerInstances.players[playerIndex].pause();
            //      }
            //    }
            //  }


           }
       });

       //}
   }
   $(document).on('scroll', checkMedia);

})(jQuery);

//# sourceMappingURL=../css/theme.min.js.map
