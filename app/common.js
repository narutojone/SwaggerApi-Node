exports.validateEmail = function(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

exports.validatePhone = function(value) {
    var phoneno = /^\+?([0-9]{1})\)?[- ]?([0-9]{3})[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
    return value.match(phoneno);
}

exports.Gender = Object.freeze({
    Male: 1,
    Female: 2
});

exports.sendNormalResponse = function(res, success, message, data) {
    var result = {
      result: { success: success,
                message: message,
                code: 200 },
      data: data
    };

    console.log(result);
    res.status(200).json(result);
}

exports.sendBadResponse = function(res, success, message, data) {
    var result = {
      result: { success: success,
                message: message,
                code: 500 },
      data: data
    };

    console.log(result);
    res.status(200).json(result);
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
