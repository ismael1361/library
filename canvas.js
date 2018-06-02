(function(win, root){
  var mul_table = [1, 57, 41, 21, 203, 34, 97, 73, 227, 91, 149, 62, 105, 45, 39, 137, 241, 107, 3, 173, 39, 71, 65, 238, 219, 101, 187, 87, 81, 151, 141, 133, 249, 117, 221, 209, 197, 187, 177, 169, 5, 153, 73, 139, 133, 127, 243, 233, 223, 107, 103, 99, 191, 23, 177, 171, 165, 159, 77, 149, 9, 139, 135, 131, 253, 245, 119, 231, 224, 109, 211, 103, 25, 195, 189, 23, 45, 175, 171, 83, 81, 79, 155, 151, 147, 9, 141, 137, 67, 131, 129, 251, 123, 30, 235, 115, 113, 221, 217, 53, 13, 51, 50, 49, 193, 189, 185, 91, 179, 175, 43, 169, 83, 163, 5, 79, 155, 19, 75, 147, 145, 143, 35, 69, 17, 67, 33, 65, 255, 251, 247, 243, 239, 59, 29, 229, 113, 111, 219, 27, 213, 105, 207, 51, 201, 199, 49, 193, 191, 47, 93, 183, 181, 179, 11, 87, 43, 85, 167, 165, 163, 161, 159, 157, 155, 77, 19, 75, 37, 73, 145, 143, 141, 35, 138, 137, 135, 67, 33, 131, 129, 255, 63, 250, 247, 61, 121, 239, 237, 117, 29, 229, 227, 225, 111, 55, 109, 216, 213, 211, 209, 207, 205, 203, 201, 199, 197, 195, 193, 48, 190, 47, 93, 185, 183, 181, 179, 178, 176, 175, 173, 171, 85, 21, 167, 165, 41, 163, 161, 5, 79, 157, 78, 154, 153, 19, 75, 149, 74, 147, 73, 144, 143, 71, 141, 140, 139, 137, 17, 135, 134, 133, 66, 131, 65, 129, 1];

  var shg_table = [0, 9, 10, 10, 14, 12, 14, 14, 16, 15, 16, 15, 16, 15, 15, 17, 18, 17, 12, 18, 16, 17, 17, 19, 19, 18, 19, 18, 18, 19, 19, 19, 20, 19, 20, 20, 20, 20, 20, 20, 15, 20, 19, 20, 20, 20, 21, 21, 21, 20, 20, 20, 21, 18, 21, 21, 21, 21, 20, 21, 17, 21, 21, 21, 22, 22, 21, 22, 22, 21, 22, 21, 19, 22, 22, 19, 20, 22, 22, 21, 21, 21, 22, 22, 22, 18, 22, 22, 21, 22, 22, 23, 22, 20, 23, 22, 22, 23, 23, 21, 19, 21, 21, 21, 23, 23, 23, 22, 23, 23, 21, 23, 22, 23, 18, 22, 23, 20, 22, 23, 23, 23, 21, 22, 20, 22, 21, 22, 24, 24, 24, 24, 24, 22, 21, 24, 23, 23, 24, 21, 24, 23, 24, 22, 24, 24, 22, 24, 24, 22, 23, 24, 24, 24, 20, 23, 22, 23, 24, 24, 24, 24, 24, 24, 24, 23, 21, 23, 22, 23, 24, 24, 24, 22, 24, 24, 24, 23, 22, 24, 24, 25, 23, 25, 25, 23, 24, 25, 25, 24, 22, 25, 25, 25, 24, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 23, 25, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 24, 22, 25, 25, 23, 25, 25, 20, 24, 25, 24, 25, 25, 22, 24, 25, 24, 25, 24, 25, 25, 24, 25, 25, 25, 25, 22, 25, 25, 25, 24, 25, 24, 25, 18];

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
        a.crossOrigin = "";
        a.crossOrigin = "Anonymous";
        a.onload = function(){
          c = c != null ? c : [this.width, this.height];
          self.context.drawImage(this, b[0], b[1], c[0], c[1]);
        }
        a.src = arguments[0];
        if(a.complete || a.complete === undefined){
          a.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          a.src = arguments[0];
        }
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
      this.context.arc(x, y, a, 0, 2 * Math.PI);
      this.context.fill();
      return this;
    },

    "getPixel" : function(a, b){
      a = a < 0 ? 0 : a > this.width() ? this.width() - 1 : a;
      b = b < 0 ? 0 : b > this.height() ? this.height() - 1 : b;
      var c = this.context.getImageData(a, b, a + 1, b + 1);
      return {r: c.data[0], g: c.data[1], b: c.data[2], a: c.data[3]};
    },

    "setPixel" : function(a, b, c){
      a = a < 0 ? 0 : a > this.width() ? this.width() - 1 : a;
      b = b < 0 ? 0 : b > this.height() ? this.height() - 1 : b;
      if(Array.isArray(c)){
        for(var i=0; i<4; i++){
          c[i] = typeof c[i] == "number" && c[i] < 256 ? Math.floor(c[i]) : 255;
        }
      }else if(typeof c == "object"){
        var nC = [];
        for(var i=0; i<4; i++){
          var k = i == 0 ? "r" : i == 1 ? "g" : i == 2 ? "b" : i == 3 ? "a" : "_c_";
          nC[i] = typeof c[k] == "number" && c[k] < 256 ? c[k] : 255;
        }
        c = nC;
      }else{return this;}
      var d = this.context.getImageData(a, b, a + 1, b + 1);
      for(var i=0; i<4; i++){
        d.data[i] = c[i];
      }
      this.context.putImageData(d, a, b);
      return this;
    },

    "pixelForEach" : function(a){
      if(typeof a != "function"){ return;}
      var b = this.context.getImageData(0, 0, this.width(), this.height());
      for(var c=0; c<this.height(); c++){
        for(var d=0; d<this.width(); d++){
          var e = (Math.round(d) + (Math.floor(c) * b.width)) * 4, f = [];
          f = a({r: b.data[e+0], g: b.data[e+1], b: b.data[e+2], a: b.data[e+3]}, d, c);
          if(Array.isArray(f)){
            for(var i=0; i<4; i++){
              b.data[e+i] = typeof f[i] == "number" && f[i] < 256 ? f[i] : 255;
            }
          }else if(typeof f == "object"){
            for(var i=0; i<4; i++){
              var k = i == 0 ? "r" : i == 1 ? "g" : i == 2 ? "b" : i == 3 ? "a" : "_c_";
              b.data[e+i] = typeof f[k] == "number" && f[k] < 256 ? f[k] : 255;
            }
          }
        }
      }
      this.context.putImageData(b, 0, 0);
      return this;
    },

    "filterBlur" : function(a, b, c, d, e){
      a = typeof a != 'number' ? 1 : a < 1 ? 1 : a > mul_table.length-1 ? mul_table.length-1 : a;
      b = typeof b != 'number' ? 0 : b < 0 ? 0 : b > this.width() ? this.width() : b;
      c = typeof c != 'number' ? 0 : c < 0 ? 0 : c > this.height() ? this.height() : c;
      d = typeof d != 'number' ? this.width() : d < 0 ? 0 : d > this.width() ? this.width() : d;
      e = typeof e != 'number' ? this.height() : e < 0 ? 0 : e > this.height() ? this.height() : e;
      if((b == null && c == null && d == null && e == null) || (d == b && e == c)){
        console.error('Set the image size for effect manufacturing!');
        return undefined;
      }
      var img = this.context.getImageData(b, c, d, e),
          px = img.data,
          sum = [], rgb = [], vmin = [], vmax = [],
          wm = img.width - 1, hm = img.height - 1, wh = img.width * img.height;
      for(var f=0; f<2; f++){
        var yw = 0, yi = 0;
        for(var y=0; y<img.height; y++){
          sum[0] = px[yw+0] * (a+1);
          sum[1] = px[yw+1] * (a+1);
          sum[2] = px[yw+2] * (a+1);
          for(var i=1; i<=a; i++){
            var p = yw + (((i > wm ? wm : i)) << 2);
            sum[0] += px[p++];
            sum[1] += px[p++];
            sum[2] += px[p++];
          }
          for(var x=0; x<img.width; x++){
            rgb[yi] = [sum[0], sum[1], sum[2]];
            if(y == 0){
              var p = x+(a+1);
              vmin[x] = (p < wm ? p : wm) << 2;
              p = x-a;
              vmax[x] = (p > 0 ? p << 2 : 0);
            }
            var p1 = yw + vmin[x];
            var p2 = yw + vmax[x];
            sum[0] += px[p1++] - px[p2++];
            sum[1] += px[p1++] - px[p2++];
            sum[2] += px[p1++] - px[p2++];
            yi++;
          }
          yw += (img.width << 2);
        }
        for(var x=0; x<img.width; x++){
          var yp = x;
          sum[0] = rgb[yp][0] * (a+1);
          sum[1] = rgb[yp][1] * (a+1);
          sum[2] = rgb[yp][2] * (a+1);

          for(var i=1; i<=a; i++){
            yp += (i > hm ? 0 : img.width);
            sum[0] += rgb[yp][0];
            sum[1] += rgb[yp][1];
            sum[2] += rgb[yp][2];
          }

          yi = x << 2;

          for(var y=0; y<img.height; y++){
            px[yi+0] = (sum[0] * mul_table[a]) >>> shg_table[a];
            px[yi+1] = (sum[1] * mul_table[a]) >>> shg_table[a];
            px[yi+2] = (sum[2] * mul_table[a]) >>> shg_table[a];
            if(x == 0){
              var p = y+(a+1);
              vmin[y] = (p < hm ? p : hm) * img.width;
              p = y-a;
              vmax[y] = (p > 0 ? p * img.width : 0);
            }
            var p1 = x + vmin[y];
            var p2 = x + vmax[y];
            sum[0] += rgb[p1][0] - rgb[p2][0];
            sum[1] += rgb[p1][1] - rgb[p2][1];
            sum[2] += rgb[p1][2] - rgb[p2][2];
            yi += img.width << 2;
          }
        }
      }
      this.context.putImageData(img, b, c);
    }
  }
})(window, window.JsRoot instanceof Object ? window.JsRoot : window.JsRoot = {});