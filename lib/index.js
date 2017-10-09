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

    // 1. add global method or property
    Vue.myGlobalMethod = function() {
        // something logic ...
        console.log('esto es un metodo global')
        console.log(axios)
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
    Vue.path = function(dataparams) {
        return cf.axios.get(cf.baseroute + nameroute + serializeparams)
            .then(response => {

                return cf.axios.path(response.data,
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