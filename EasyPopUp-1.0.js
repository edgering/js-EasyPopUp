/**
 *  Easy PopUp 1.0
 *    
 *
 */

(function() {
     
  this.Modal = function() {
        
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;      
    this.transitionEnd = EPU_transitionSelect();

    // Define option defaults 
    
    var defaults = {
      autoOpen: false,
      className: 'fade-and-drop',
      baseClass: '',
      closeButton: true,
      content: "",
      maxWidth: '80%',
      minWidth: '40%',
      overlay: true
    }

    // Create options by extending defaults with the passed in arugments
    
    if (arguments[0] && typeof arguments[0] === "object") 
    {                        
      this.options = EPU_extendDefaults(defaults, arguments[0]);      
      this.options = EPU_extendDefaults(defaults, arguments[0].content.dataset);
    }

    // Parse data attributes

    if(this.options.autoOpen === true || this.options.autoOpen == 'true')
    { 
      this.open();      
    }
    
    /*
    window.onkeydown = function( event ) {
      if ( event.keyCode == 27 ) {
          this.close();
      }
    };
    */    
  }

  Modal.onkeydown = function( event ) {
  
    console.log(123);
  
  };

  // Public Methods

  Modal.prototype.close = function(){
    
    var me = this;
    
    this.modal.className = this.modal.className.replace(" epu-open", "");  
    this.overlay.className = this.overlay.className.replace(" epu-open","");
    
    this.modal.addEventListener(this.transitionEnd, function()
    {
      me.modal.parentNode.removeChild(me.modal);
    });
    
    this.overlay.addEventListener(this.transitionEnd, function()
    {
      if(me.overlay.parentNode)
      { 
        me.overlay.parentNode.removeChild(me.overlay);
      }
    });
  }

  Modal.prototype.open = function(){
    
    buildOut.call(this);
    EPU_initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    
    this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " epu-open epu-anchored" : " epu-open");
    this.overlay.className = this.overlay.className + " epu-open";
  }
  
  Modal.prototype.esc = function(){
     this.close();      
  }
  
  
  

  // Private Methods

  function buildOut() {

    var content, contentHolder, docFrag;

    /*
     * If content is an HTML string, append the HTML string.
     * If content is a domNode, append its content.
     */

    if (typeof this.options.content === "string") 
    {
      content = this.options.content;
    } 
    else 
    {
      content = this.options.content.innerHTML;
    }

    // Create a DocumentFragment to build with
    
    docFrag = document.createDocumentFragment();

    // Create modal element
    
    this.modal = document.createElement("div");
    this.modal.className = "epu-modal " + this.options.className;
    
    if (this.options.minWidth !== false)
    {
      this.modal.style.minWidth = EPU_setUnits(this.options.minWidth);
    }
    
    if (this.options.maxWidth !== false)
    {
      this.modal.style.maxWidth = EPU_setUnits(this.options.maxWidth);
    }

    // If closeButton option is true, add a close button
    
    if (this.options.closeButton === true) 
    {      
      this.closeButton = document.createElement("button");
      this.closeButton.className = "epu-close close-button";
      this.closeButton.innerHTML = "&times;";
      this.modal.appendChild(this.closeButton);
    }

    // If overlay is true, add one
    
    if (this.options.overlay === true) 
    {
      this.overlay = document.createElement("div");
      this.overlay.className = "epu-overlay " + this.options.className;
      
      docFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    
    contentHolder = document.createElement("div");
    contentHolder.className = "epu-content";
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    
    document.body.appendChild(docFrag);
  }

  function EPU_setUnits(unit) {
    
    if (unit ==  parseFloat(unit))
    {
      unit = unit + 'px';
    }
    
    return unit;
  }

  function EPU_extendDefaults(source, properties) {
    var property;
    
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function EPU_initializeEvents(){
    
    if (this.closeButton) 
    {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) 
    {
      this.overlay.addEventListener('click', this.close.bind(this));
    }
  }

  function EPU_transitionSelect(){
    var el = document.createElement("div");
    
    if (el.style.WebkitTransition)
    { 
      return "webkitTransitionEnd";
    }
    
    if (el.style.OTransition)
    { 
      return "oTransitionEnd";
    }
    
    return 'transitionend';
  }
}());

/**
 *  Search & assign to element 
 *  by id="epu"
 *
 */

var myContent = document.getElementById('epu');

if (myContent !== null)
{

  var myModal = new Modal({
    content: myContent
  });

  var triggerButton = document.getElementById('trigger');

  if (triggerButton !== null)
  {
    triggerButton.addEventListener('click', function() {
      myModal.open();
    });
  }
}
