~function () {
    class ajaxClass {
        // send ajax
        init () {
            // THIS:_THIS
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(!/^[23]\d{2}$/.test(xhr.status)) return;
                if(xhr.readyState === 4) {
                    let result = xhr.responseText;
                    // DATA-TYPE
                    try {
                        switch (this.dataType.toUpperCase()) {
                            case 'TEXT' :
                            case 'HTML' :
                                break;
                            case 'JSON' :
                                result = JSON.parse(result);
                                break;
                            case 'XML' :
                                result = xhr.responseXML;
                        }
                    }catch (e) {

                    }
                    this.success(result);
                }
            };

            // DATE
            if (this.data !== null) {
                this.formatData();
                if (this.isGET) {
                    this.url += this.querySymbol() + this.data;
                    this.data = null;
                }
            }

            // CACHE
            this.isGET ? this.cacheFn() : null;

            xhr.open(this.method, this.url, this.async);
            xhr.send(this.data);
        }

        // CONVERT THE PASSED OBJECT DATA TO STRING DATA
        formatData () {
            // THIS:_THIS
            if (Object.prototype.toString.call(this.data) === '[object Object]') {
                let obj = this.data,
                    str = ``;
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        str += `${key}=${obj[key]}&`;
                    }
                }
                this.data = str.replace(/&$/g, '');
            }
        }

        cacheFn () {
            // THIS:_THIS
            !this.cache ? this.url += `${this.querySymbol()}_=${Math.random()}` : null;
        }

        querySymbol () {
            // THIS:_THIS
            return this.url.indexOf('?') > -1 ? '&' : '?';
        }
    }

    // INIT PARAMETERS
    Window.ajax = function ({
                                url = null,
                                method = null,
                                type = 'GET',
                                data = null,
                                dataType = 'JSON',
                                cache = true,
                                async = true,
                                success = null
    } = {}) {
        let _this = new ajaxClass();
        ['url','method','data','dataType','cache','async','success'].forEach(item => {
            if (item === 'method') {
                _this.method = method || type;
                return;
            }
            if (item === 'success') {
                _this.success = typeof success === 'function' ? success : new Function();
                return;
            }
            _this[item] = eval(item);
        });
        _this.isGET = /^(GET|DELETE|HEAD)$/i.test(_this.method);
        _this.init();
        return _this;
    };
}();