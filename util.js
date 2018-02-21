JIE.util = (function(JIE){
    var castToFloat = function(f, d) {
        f = +f;
        if(!f && f !== 0) f = d;
        return f;
    };
    var castToGetSet = function(o) {
        return {
             get: function(k) {return o[k];}
            ,set: function(k, v) {o[k] = v;}
            };
    };
    var StridedArray;
    StridedArray = function(opts) {
        if(this.window == this) return new StridedArray(opts);
        var offset, stride, array, gs;
        offset = castToFloat(opts.offset);
        stride = castToFloat(opts.stride, 1);
        gs = castToFloat(opts.groupSize, 1);
        array = opts.array;
        if(!opts.getSet) {
            array = castToGetSet(array);
            array.getLength = function() {
                return array.get('length');
            };
        }
        this.__o = offset;
        this.__s = stride;
        this.__gs = gs;
        this.__a = array;
    };
    StridedArray.prototype = {
         getIndex: function(i) {
            var d = (i / this.__gs) | 0
               ,m = i % this.__gs;
            return d * this.__s + m + this.__o;
        }
        ,invGetIndex: function(i) {
            var d, m, mm;
            i -= this.__o;
            d = (i / this.__s) | 0;
            m = i % this.__s;
            if(m >= this.__gs) throw new this.constructor.InvGetIndexException();
            
        }
    };
    var InvGetIndexException = function() {
        
    };
    InvGetIndexException.prototype = {};
    StridedArray.InvGetIndexException = InvGetIndexException;
})(JIE);