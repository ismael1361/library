(function(win, root){
  win.Canvas = function(){
    if(arguments.length > 0 && typeof arguments[0] == 'string' && arguments[0] instanceof win.Get){
      if(typeof arguments[0] == 'string'){
        this.canvas = Get('#'+arguments[0]);
      }else if(arguments[0] instanceof win.Get){
        this.canvas = document.createElement('canvas');
        arguments[0].append(Get(this.canvas));
      }
    }else{
      this.canvas = document.createElement('canvas');
      win.Get(document.body).prepend(Get(this.canvas));
    }

    this.context = this.canvas.getContext('2d');
  }

  win.Canvas.prototype = {
    "width" : function(){
      if(arguments.length > 0 && typeof arguments[0] == 'number'){
        this.canvas.width = arguments[0];
      }
      return this.canvas.width;
    },

    "height" : function(){
      if(arguments.length > 0 && typeof arguments[0] == 'number'){
        this.canvas.height = arguments[0];
      }
      return this.canvas.height;
    },

    "resize" : function(){
      if(arguments.length > 0 && typeof arguments[0] == 'number' && typeof arguments[1] == 'number'){
        var a = this.width(arguments[0]), b = this.height(arguments[1]);
        return [a, b];
      }
      var a = this.width(), b = this.height();
      return [a, b];
    },

    "drawImg" : function(){
      var a = arguments.length > 0 && arguments[0] instanceof Image ? arguments[0] : new Image(), 
          b = Array.isArray(arguments[1]) ? arguments[1].length >= 2 ? arguments[1] : [arguments[1][0], arguments[1][0]] : [0, 0], 
          c = Array.isArray(arguments[2]) ? arguments[2].length >= 2 ? arguments[2] : [arguments[2][0], arguments[2][0]] : null;

      b = [typeof b[0] == 'number' ? b[0] : 0, typeof b[1] == 'number' ? b[1] : 0];
      c = c != null && typeof c[0] == 'number' && typeof c[1] == 'number' ? c : null;

      if(arguments.length > 0 && typeof arguments[0] == 'string'){
        var self = this;
        a.onload = function(){
          self.drawImg(a, b, c);
        }
        a.src = arguments[0];
      }else if(a instanceof Image){
        c = c != null ? c : [a.width, a.height];
        this.context.drawImage(a, b[0], b[1], c[0], c[1]);
      }
      return this;
    },

    "text" : function(a, b){
      b = !b || !(b instanceof Object)? {} : b;
      this.context.fillStyle = typeof b.fill == 'string' ? b.fill : '#000';
      this.context.font = typeof b.font == 'string' ? b.font : '15px Verdana';
      this.context.textAlign = typeof b.align == 'string'? b.align : 'left';
      this.context.fillText(typeof a == 'string' ? a : '', typeof b.x == 'number'? b.x : 0, typeof b.y == 'number'? b.y : 0, typeof b.width == 'number'? b.width : undefined);
      return this;
    },

    "rect" : function(a, b, c){
      a = typeof a == 'number' ? a : 15;
      b = typeof b == 'number' ? b : 15;
      c = !c || !(c instanceof Object)? {} : c;
      this.context.fillStyle = typeof c.fill == 'string' ? c.fill : '#000';
      var x = typeof c.x == 'number'? c.x : 0, y = typeof c.y == 'number'? c.y : 0;
      this.context.fillRect(x, y, a, b);
      return this;
    },

    "circle" : function(a, b, c){
      a = typeof a == 'number' ? a : 15;
      b = typeof b == 'number' ? b : 15;
      a = a > b ? a/2 : b/2;
      c = !c || !(c instanceof Object)? {} : c;
      this.context.beginPath();
      this.context.fillStyle = typeof c.fill == 'string' ? c.fill : '#000';
      var x = typeof c.x == 'number'? c.x : 0, y = typeof c.y == 'number'? c.y : 0;
      this.context.arc(x+a, y+a, a, 0, 2 * Math.PI);
      this.context.fill();
      return this;
    }
  }
})(window, window.JsRoot instanceof Object ? window.JsRoot : window.JsRoot = {});