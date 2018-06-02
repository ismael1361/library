(function(win, root){
  root.extend = function(a, b){
    for(var c in b){
      if(typeof a[c] == 'object' || a[c] instanceof Array){
        a[c] = this.extend(a[c], b[c]);
      }else{
        a[c] = b[c];
      }
    } 
    return a;
  }

  root.each = function(a, b){
    if(typeof a.splice == 'function'){
      for(var c = 0; c < a.length; c += 1){
        b(c, a[c]);
      }
    }else{
      for(var d in a){
        b(d, a[d]);
      }
    }
  }

  root.grep = function(a, b){
    var c = []; 
    for(var d = 0; d < a.length; d += 1){
      var e = a[d]; 
      if(b(e)){c.push(e);}
    } 
    return c;
  }

  root.parser = (function(){return new window.DOMParser()}());

  root = root.extend(root, {'hasClass': function(a, b){
      var c = (a.getAttribute('class') || '').split(/\s+/g); 
      for(var d in c){
        if(c[d] == b){
          return true;
        }
      } 
      return false;
    },

    'addClass': function(a, b){
      if(this.hasClass(a, b) == false){
        var c = (a.getAttribute('class') || '').split(/\s+/g); 
        c.push(b); 
        a.setAttribute('class', c.join(' '));
      } 
      return false;
    },

    'removeClass': function(a, b){
      if(this.hasClass(a, b) == true){
        var c = (a.getAttribute('class') || '').split(/\s+/g), 
        d = new Array(); 
        for(var e in c){
          if(c[e] != b){
            d.push(c[e]);
          }
        } 
        a.setAttribute('class', d.join(' '));
      } 
      return false;
    },

    'matches': function(a, b){
      if(a.nodeType != 1){
        console.log('ok', a.nodeType);
        return false;
      }else if(!b){
        return true;
      } 
      var c = b.split(/[,\s]+/g); 
      for(var d = 0; d < c.length; d += 1){
        var e = c[d]; 
        if(e.substring(0, 1) == '#'){
          throw 'not supported:' + e;
        }else if(e.substring(0, 1) == '.'){
          if(this.hasClass(a, e.substring(1))){
            return true;
          }
        }else{
          if(a.tagName.toUpperCase() == e.toUpperCase()){
            return true;
          }
        }
      } 
      return false;
    },

    'html': function(a){
      var b = this.parser.parseFromString('<div xmlns="http://www.w3.org/1999/xhtml">'+a+'</div>','text/xml').firstChild, 
          c = []; 
      while(b.firstChild){
        c.push(b.firstChild); 
        b.removeChild(b.firstChild);
      }
      c.__proto__ = fn; 
      return c;
    },

    'pxToNum': function(a){
      if(!a || typeof a != 'string' || a.length <= 2 || a.charAt(a.length - 2) != 'p' || a.charAt(a.length - 1) != 'x'){
        return 0;
      } 
      return +a.substring(0, a.length - 2);
    }
  });

  win.Get = function(a){
    if(typeof a == 'string'){
      if(a.charAt(0) == '<'){
        return root.html(a);
      }else{
        var b = document.querySelectorAll(a), 
            c = []; 
        for(var d = 0; d < b.length; d += 1){
          c.push(b.item(d));
        } 
        c.__proto__ = win.Get.fn; 
        return c;
      }
    }else if(typeof a == 'object' && a != null){
      if(a.__proto__ == win.Get.fn){
        return a;
      }else{
        var c = []; 
        c.push(a); 
        c.__proto__ = win.Get.fn; 
        return c;
      }
    }else{
      var c = []; 
      c.__proto__ = win.Get.fn; 
      return c;
    }
  }

  win.Get.fn = {
    'attr' : function(a){
      if(arguments.length == 1){
        if(typeof a == 'string'){
          return this.getAttribute(a);
        } 
        for(var b in a){
          this.setAttribute(b, a[b]);
        }
      }else if(arguments.length == 2){
        this.setAttribute(a, arguments[1]);
      } 
      return this;
    },

    'prop' : function(a){
      if(arguments.length == 1){
        if(typeof a == 'string'){
          return this[a];
        } 
        for(var b in a){
          this[b] = a[b];
        }
      }else if(arguments.length == 2){
        this[a] = arguments[1];
      } 
      return this;
    },

    'css' : function(a){
      if(arguments.length == 1){
        if(typeof a == 'string'){
          return this.style[a];
        } 
        for(var b in a){
          this.style[b] = a[b];
        }
      }else if(arguments.length == 2){
        this.style[a] = arguments[1];
      } 
      return this;
    },

    'val' : function(){
      if(arguments.length == 0){
        return this.value || '';
      }else if(arguments.length == 1){
        this.value = arguments[0];
      } 
      return this;
    },

    'on' : function(a, b){
      var c = a.split(/\s+/g); 
      for(var d = 0; d < c.length; d += 1){
        this.addEventListener(c[d], b);
      } 
      return this;
    },

    'off' : function(a, b){
      var c = a.split(/\s+/g); 
      for(var d = 0; d < c.length; d += 1){
        this.removeEventListener(c[d], b);
      } 
      return this;
    },

    'offset' : function(){
      var a = {left:0, top:0}, 
          b = null; 
      for(var c = this; c.parentNode != null; c = c.parentNode){
        if(c.offsetParent != null){
          b = c; break;
        }
      } 
      if(b != null){
        for(var c = b; c.offsetParent != null; c = c.offsetParent){
          a.left += c.offsetLeft; 
          a.top += c.offsetTop;
        }
      } 
      for(var c = this; c.parentNode != null && c != document.body; c = c.parentNode){
        a.left -= c.scrollLeft; 
        a.top -= c.scrollTop;
      } 
      return a;
    },

    'append' : function(a){
      if(typeof a == 'string'){
        a = root.html(a);
      } 
      for(var b = 0; b < a.length; b += 1){
        this.appendChild(a[b]);
      } 
      return this;
    },

    'prepend' : function(a){
      if(typeof a == 'string'){
        a = root.html(a);
      } 
      for(var b = 0; b < a.length; b += 1){
        if(this.firstChild){
          this.insertBefore(a[b], this.firstChild);
        }else{
          this.appendChild(a[b]);
        }
      } 
      return this;
    },

    'insertBefore' : function(a){
      var b = a[0]; 
      b.parentNode.insertBefore(this, b); 
      return this;
    },

    'insertAfter' : function(a){
      var b = a[0]; 
      if(b.nextSibling){
        b.parentNode.insertBefore(this, b.nextSibling);
      }else{
        b.parentNode.appendChild(this);
      } 
      return this;
    },

    'remove' : function(){
      if(this.parentNode){
        this.parentNode.removeChild(this);
      } 
      return this;
    },

    'detach' : function(){
      if(this.parentNode){
        this.parentNode.removeChild(this);
      } 
      return this;
    },

    'parent' : function(){
      return Get(this.parentNode);
    },

    'closest' : function(a){
      for(var b = this; b != null; b = b.parentNode){
        if(root.matches(b, a)){
          return Get(b);
        }
      } 
      return Get();
    },

    'children' : function(a){
      var b = [], 
          c = this.childNodes; 
      for(var d = 0; d < c.length; d += 1){
        if(root.matches(c.item(d), a)){
          b.push(c.item(d));
        }
      } 
      b.__proto__ = fn; 
      return b;
    },

    'index' : function(a){
      return Array.prototype.indexOf.call(Get(this).parent().children(a), this);
    },

    'find' : function(a){
      var b = [], 
          c = this.querySelectorAll(a); 
      for(var d = 0; d < c.length; d += 1){
        b.push(c.item(d));
      } 
      b.__proto__ = fn; 
      return b;
    },

    'clone' : function(){return Get(this.cloneNode(true));},

    'focus' : function(){this.focus(); return this;},

    'select' : function(){this.select(); return this;},

    'submit' : function(){this.submit(); return this;},

    'scrollLeft' : function(){
      if(arguments.length == 0){
        return this.scrollLeft;
      } 
      this.scrollLeft = arguments[0]; 
      return this;
    },

    'scrollTop' : function(){
      if(arguments.length == 0){
        return this.scrollTop;
      } 
      this.scrollTop = arguments[0]; 
      return this;
    },

    'html' : function(){
      if(arguments.length == 0){
        return this.innerHTML;
      } 
      this.innerHTML = arguments[0]; 
      return this;
    },

    'text' : function(){
      if(typeof this.textContent != 'undefined'){
        if(arguments.length == 0){
          return this.textContent;
        } 
        this.textContent = arguments[0]; 
        return this;
      }else{
        if(arguments.length == 0){
          return this.innerText;
        } 
        this.innerText = arguments[0]; 
        return this;
      }
    },

    'outerWidth' : function(a){
      var b = this.offsetWidth; 
      if(a){
        var c = window.getComputedStyle(this, null); 
        return b + root.pxToNum(c.marginLeft) + root.pxToNum(c.marginRight);
      } 
      return b;
    },

    'innerWidth' : function(){
      var a = window.getComputedStyle(this, null); 
      return this.offsetWidth - root.pxToNum(a.borderLeftWidth) - root.pxToNum(a.borderRightWidth);
    },

    'width' : function(){
      if(this == window){
        return this.innerWidth;
      } 
      var a = window.getComputedStyle(this, null); 
      return this.offsetWidth - root.pxToNum(a.borderLeftWidth) - root.pxToNum(a.borderRightWidth) - root.pxToNum(a.paddingLeft) - root.pxToNum(a.paddingRight);
    },

    'outerHeight' : function(a){
      var b = this.offsetHeight; 
      if(a){
        var c = window.getComputedStyle(this, null); 
        return b + root.pxToNum(c.marginTop) + root.pxToNum(c.marginBottom);
      } 
      return b;
    },

    'innerHeight' : function(){
      var a = window.getComputedStyle(this, null); 
      return this.offsetHeight - root.pxToNum(a.borderTopWidth) - root.pxToNum(a.borderBottomWidth);
    },

    'height' : function(){
      if(this == window){
        return this.innerHeight;
      } 
      var a = window.getComputedStyle(this, null); 
      return this.offsetHeight - root.pxToNum(a.borderTopWidth) - root.pxToNum(a.borderBottomWidth) - root.pxToNum(a.paddingTop) - root.pxToNum(a.paddingBottom);
    },

    'getSize' : function(){
      var a = (this.width || this.innerWidth || this.clientWidth), 
          b = (this.height || this.innerHeight || this.clientHeight); 
      return {width: a, height: b}
    },

    'addClass' : function(a){
      root.addClass(this, a); 
      return this;
    },

    'removeClass' : function(a){
      root.removeClass(this, a); 
      return this;
    },

    'hasClass' : function(a){
      return root.hasClass(this, a);
    },

    'getPath' : function(){
      var a = String(this.tagName).toLocaleLowerCase();
      if(this.id){
          a += '#'+this.id;
      }else if(this.classList.length > 0){
          for(var b = 0; b<this.classList.length; b++){
              a += '.'+this.classList[b];
          }
      }
      return a;
    },

    'getAllPath' : function(){
      var a = [], b = this.parentNode;
      a.push(Get(this).getPath());
      while(b){
          if(!b.tagName || b.tagName == 'BODY' || b.tagName == 'HTML'){break;}
          var c = String(b.tagName).toLocaleLowerCase();
          if(b.id){
              c += '#'+b.id;
              b=b.parentNode;
          }else if(b.classList && b.classList.length > 0){
              for(var d = 0; d<b.classList.length; d++){
                  c += '.'+b.classList[d];
              }
          }
          a.unshift(c);
          b=b.parentNode;
      }
      return a.join(" > ");
    }
  };

  root.each(win.Get.fn, function(a, b){
    win.Get.fn[a] = function(){
      var c = null; 
      for(var d = 0; d < this.length; d += 1){
        var e = this[d], 
            g = b.apply(e, arguments); 
        if(e !== g){
          if(g != null && g.__proto__ == fn){
            if(c == null){c = [];} 
            c = c.concat(g);
          }else{
            return g;
          }
        }
      } 
      if(c != null){
        c.__proto__ = fn; 
        return c;
      }
      return this;
    };
  });

  win.Get.fn = root.extend(win.Get.fn, {
    each : function(a){
      for(var b = 0; b < this.length; b += 1){
        a.call(this[b], b);
      } 
      return this;
    },
  
    getDom : function(){
      return this.length > 0? this[0] : null;
    },
  
    first : function(){
      return Get(this.length > 0? this[0] : null);
    },
  
    last : function(){
      return Get(this.length > 0? this[this.length - 1] : null);
    }
  });

  win.KEYCODE = {"BACKSPACE": 8, "TAB": 9, "ENTER": 13, "SHIFT": 16, "CTRL": 17, "ALT": 18, "BREAK": 19, "PAUSE": 19, "CAPS_LOCK": 20, "ESCAPE": 27, "PAGE_UP": 33, "PAGE_DOWN": 34, "END": 35, "HOME": 36, "LEFT_ARROW": 37, "UP_ARROW": 38, "RIGHT_ARROW": 39, "DOWN_ARROW": 40, "INSERT": 45, "DELETE": 46, "NUMBER_0": 48, "NUMBER_1": 49, "NUMBER_2": 50, "NUMBER_3": 51, "NUMBER_4": 52, "NUMBER_5": 53, "NUMBER_6": 54, "NUMBER_7": 55, "NUMBER_8": 56, "NUMBER_9": 57, "LETTER_A": 65, "LETTER_B": 66, "LETTER_C": 67, "LETTER_D": 68, "LETTER_E": 69, "LETTER_F": 70, "LETTER_G": 71, "LETTER_H": 72, "LETTER_I": 73, "LETTER_J": 74, "LETTER_k": 75, "LETTER_l": 76, "LETTER_M": 77, "LETTER_N": 78, "LETTER_O": 79, "LETTER_P": 80, "LETTER_Q": 81, "LETTER_R": 82, "LETTER_S": 83, "LETTER_T": 84, "LETTER_U": 85, "LETTER_V": 86, "LETTER_W": 87, "LETTER_X": 88, "LETTER_Y": 89, "LETTER_Z": 90, "LEFT_WINDOW_KEY": 91, "RIGHT_WINDOW_KEY": 92, "SELECT_KEY": 93, "NUMPAD_0": 96, "NUMPAD_1": 97, "NUMPAD_2": 98, "NUMPAD_3": 99, "NUMPAD_4": 100, "NUMPAD_5": 101, "NUMPAD_6": 102, "NUMPAD_7": 103, "NUMPAD_8": 104, "NUMPAD_9": 105, "MULTIPLY": 106, "ADD": 107, "SUBTRACT": 109, "DECIMAL_POINT": 110, "DIVIDE": 111, "F1": 112, "F2": 113, "F3": 114, "F4": 115, "F5": 116, "F6": 117, "F7": 118, "F8": 119, "F9": 120, "F10": 121, "F11": 122, "F12": 123, "NUM_LOCK": 144, "SCROLL_LOCK": 145, "SEMI_COLON": 186, "EQUAL_SIGN": 187, "COMMA": 188, "DASH": 189, "PERIOD": 190, "FORWARD_SLASH": 191, "GRAVE_ACCENT": 192, "OPEN_BRACKET": 219, "BACK_SLASH": 220, "CLOSE_BRAKET": 221, "SINGLE_QUOTE": 222};

  win.KEYUP = null;
  win.KEYPRESS = null;
  win.KEYDOWN = null;
  win.onKey = null;

  root.keyPressed = function(a){
    if(a.type == 'keyup'){
      win.KEYUP = a.keyCode;
    }else if(a.type == 'keypress'){
      win.KEYPRESS = a.keyCode;
    }else if(a.type == 'keydown'){
      win.KEYDOWN = a.keyCode;
    }
    if(win.onKey != null && typeof win.onKey == "function"){win.onKey(a.keyCode);}
  }

  document.addEventListener('keyup', root.keyPressed);
  document.addEventListener('keypress', root.keyPressed);
  document.addEventListener('keydown', root.keyPressed);

}(window, window.JsRoot instanceof Object ? window.JsRoot : window.JsRoot = {}));