var VueRouteLaravel = {};

VueRouteLaravel.install = function(Vue, config) {

    var nameroute = '';
    var serializeparams = '';

    var cf = {
        baseroute: '',
        axios: null,
        queryString: null,
        csrf_token: '',
        headers: {
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        },
    };

    for (var property in config) {
        cf[property] = config[property];
    }

    /**
     * redirect redireccionar.
     * @return redirect
     */
    Vue.redirect = function() {
        cf.axios.get(cf.baseroute + nameroute + serializeparams)
            .then(response => {
                window.location.href = response.data;
            }).catch(response => {
                console.error(response)
            });
    }

    /**
     * url description
     * @return String return url string.
     */
    Vue.url = function() {
        return cf.axios.get(cf.baseroute + nameroute + serializeparams)
            .then(response => {
                return response.data
            })
            .catch(response => {
                console.error(response)
            });
    }


    /**
     * validateDependences description
     * Valida si se cargaron las configuraciones
     * @return Boolean 
     */
    Vue.validateDependences = function() {

        if (cf.baseroute.length == 0) {
            console.log('Required route controller.')
            return false
        }

        if (cf.axios != null && cf.queryString != null) {
            if (cf.csrf_token.length > 0) {
                cf.axios.defaults.headers.common['X-CSRF-TOKEN'] = cf.csrf_token
            }
            cf.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
            return true;
        }

        console.log('Plugin required Axios - query-string.')
        return false;
    }

    /**
     * get Data AXIOS
     * @param  {} dataparams Object
     * @return promise           
     */
    Vue.get = function(dataparams) {
        return cf.axios.get(cf.baseroute + nameroute + serializeparams)
            .then(response => {

                return cf.axios.get(response.data,
                    cf.queryString.stringify(dataparams),
                    cf.headers)

            }).catch(response => {
                console.error(response)
            });
    }

    /**
     * put AXIOS DATA
     * @param  {} dataparams Object
     * @return promise           
     */
    Vue.put = function(dataparams) {
        return cf.axios.get(cf.baseroute + nameroute + serializeparams)
            .then(response => {

                return cf.axios.put(response.data,
                    cf.queryString.stringify(dataparams),
                    cf.headers)

            }).catch(response => {
                console.error(response)
            });
    }

    /**
     * post AXIOS DATA
     * @param  {} dataparams Object
     * @return promise           
     */
    Vue.post = function(dataparams) {
        return cf.axios.get(cf.baseroute + nameroute + serializeparams)
            .then(response => {

                return cf.axios.post(response.data,
                    cf.queryString.stringify(dataparams),
                    cf.headers)

            }).catch(response => {
                console.error(response)
            });

    }

    /**
     * patch AXIOS DATA
     * @param  {} dataparams Object
     * @return promise           
     */
    Vue.patch = function(dataparams) {
        return cf.axios.get(cf.baseroute + nameroute + serializeparams)
            .then(response => {

                return cf.axios.patch(response.data,
                    cf.queryString.stringify(dataparams),
                    cf.headers)

            }).catch(response => {
                console.error(response)
            });

    }

    Vue.prototype.$routeLaravel = function(nameRoute = '', routeParams = {}) {
        serializeparams = '?'
        // Validate config initial
        if (!Vue.validateDependences()) {
            return
        }
        nameroute = nameRoute
        //create get params url
        for (var property in routeParams) {
            serializeparams += property + '=' + routeParams[property] + '&';
        }
        return Vue
    };

}

module.exports = VueRouteLaravel;