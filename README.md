# vue-route-laravel

Plugin Vue2  para hacer peticiones Ajax HTTP client, usando en nombre de las rutas de Laravel. 

### Dependencias
- Axios
- query-string

#### Install:

`$ npm install vue-route-laravel --save`

#### Config Controller and Routing in Laravel.
---
 * Config route laravel.

```
 Routes/web.php
 
/** 
 *  Note: middleware optional 
 */
Route::get('/api/route/{name}', 'RouteController@index')->middleware('auth'); 
```
 * Create Controller laravel
    `$ php artisan make:controller RouteController`

 * add method
```
 App/Http/Controllers/RouteController;

/**
 * index Config 
 * @param  Request   $request   Array data 
 * @param  [String]  $name      name route 
 * @return [String]           url base app
 */
    function index(Request $request, $name)
    {
    	return route($name, $request->all());
    }
```

#### Config Vue.
---

```
resources/Assets/js/app.js

//Import dependences.
import Vue from 'vue'
const queryString = require('query-string')
import axios from 'axios'

//init config
var config = {
    baseroute: '/api/route/',
    axios: axios,
    queryString: queryString,
    csrf_token: document.head.querySelector("[name=csrf-token]").content
}

//create method global
Vue.use(VueRouteLaravel, config)
```

#### Usage.
---
* Redirect 

```
 //redirect url http://basename/foo/bar
 Route::get('foo/bar', 'TestController@get')->name('example.route.get');

 //in vue js.
 this.$routeLaravel('example.route.get').redirect()

```

* Get string url // Note: remember that the query is asynchronous

```
 Controller
 Route::get('foo/bar', 'TestController@get')->name('example.route.get');


 //value urlblog =  http://basename/foo/bar
 const app = new Vue({
    el: '#app',
    data: {
        urlblog: '',
    }, 

    created: function (){
     this.$routeLaravel('testing').url()
         .then(response => this.urlblog = response)
    },

    });

```

* http GET.

```
//route web.php
Route::get('foo/{bar}', 'TestController@get')->name('example.route.get');

//Vue all component.

//Passing params in route.
 this.$routeLaravel('example.route.get', { bar : 'valuebar' })
    .get()
    .then(response => {
        console.log(response.data)
    }).catch(response => {
        console.log(response.data)
    })

```

* http POST.
```
//route web.php
Route::post('foo/bar', 'TestController@post')->name('example.route.post');

//Vue all component.

//Passing params in route.
 this.$routeLaravel('example.route.post')
    .post({ name:'value name', email:'email value' })
    .then(response => {
        console.log(response.data)
    }).catch(response => {
        console.log(response.data)
    })
```
### NOTE
Data is sent as form data `'Content-type': 'application/x-www-form-urlencoded'`.

* receive in Controller
```
public function method(Request $request){
    dd($request->all());
}
```


#### npm

See [npm ](https://www.npmjs.com/package/vue-route-laravel)



### Support

 - GET
 - POST
 - PUT
 - PATCH

License
----

MIT


**Free Software, Hell Yeah!**

