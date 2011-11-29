/**
 * hideShow v1.0 jQuery Plugin
 * 
 * 1) add hide/show links to all matched elements
 * 2) toggle display of target element on clicking hide/show links
 * 
 * Requirements
 * jQuery 1.4.4+ 
 * 
 * @param object options - configuration options
 * - string/jQuery selector    target    (default:".hide-show-target")    // target element to be shown/hidden
 * - string/jQuery selector    parent    (default:"fieldset")             // parent element containing hide show functionality
 * - string                    hideLink  (default:"Hide")                 // text value for hide link
 * - string                    showLink  (default:"Show")                 // text for show link
 *   
 */

// create closure
(function($) {
    
    // plugin definition
    $.fn.hideShow = function(options) {
       
        // init vars 
        var settings;
        
        // extend default settings with those provided
        settings = $.extend(
            {},
            $.fn.hideShow.defaults,
            options
        );    
        
        /*****************************************
             * Add hide/show links to trigger element
             * 
             * @param jQuery - hideShow target
             * 
             * @returns void
             ****************************************/
        function addLinks($trigger) {
                
            // init vars
            var hideText,
                showText,                
                links;                   
            
            // get link text values
            hideText = $trigger.data('hide-text') || settings.hideText;
            showText = $trigger.data('show-text') || settings.showText;
    
            // build links html
            links = '<span> <a href="#hide">' + hideText + '</a><a href="#show" style="display:none;">' + showText + '</a></span>';
            
            // add links to trigger
            $trigger.append(links);          
    
        }
    
        /******************************* 
        * Hide or show the target (and links)
        * 
        * @param jQuery - hideShow target
        * 
            * @returns void
        *******************************/
        function toggleDisplay($trigger) {
    
            $trigger.delegate('a', 'click', function(e) {
    
                // init vars
                var $this,
                    $target,
                    $triggerLinks;
                
                // cache jQuery object
                $this = $(this);
    
                // get "active" target element
                $target = $this.closest(settings.parent).find(settings.target);
    
                // get "active" hide/show links
                $triggerLinks = $this.siblings('a').andSelf();
               
                // toggle visibility of target and trigger links
                $triggerLinks.add($target).toggle();
            
                // prevent link navigation
                e.preventDefault();
            });
        }       
        
        
        // iterate each matched element
        return this.each(function() {
            
            // init vars
            var $this;
                        
            // cache jQuery object
            $this = $(this);
            
            
            /***********************
            *  main function calls
            ***********************/
            
            addLinks($this);        
            toggleDisplay($this);
  
        });
        
    };
    
    // plugin default settings
    $.fn.hideShow.defaults = {
        target : '.hide-show-target',
        parent : 'fieldset',
        hideText: 'Hide',
        showText: 'Show'
    };

// end closure
})(jQuery);
