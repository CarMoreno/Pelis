import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {
		url : string = 'http://api.themoviedb.org/3/';

    constructor(private http:Http) {

    }

    /**
     * [gestionRest Arma la url en cuestion según la pagina activa y retirna la funcion
     * de busqueda.
     *
     * Cuando el usuario esté en la pagina de Home entonces la url debe de armarse
     * de tal forma que busque peliculas por nombre.
     *
     * Cuando el usuario esté en la pagina de About entonces la url debe de armarse
     * de tal forma que busque peliculas por personalidad.
     *
     * * Cuando el usuario esté en la pagina de Conact entonces la url debe de armarse
     * de tal forma que busque peliculas por Series de TV.
     * ]
     * @param {[type]} criterioBusqueda [String que el usuario escribe en el input del buscador]
     * @param {[type]} pagActiva        [Pagina actual donde se encuentra ubicado el usuario en la app]
     */
    gestionRest(criterioBusqueda, pagActiva) {
    	if(pagActiva == 'HomePage') {// En Home se hace la gestion de busqueda de pelis
    		var url = this.url+'search/movie?query=&query=' + encodeURI(criterioBusqueda) + '&api_key=2a238b0057e4080715ab70d3f30ec815';
    	}
    	else if(pagActiva == 'AboutPage') {// En el About se hace la gestion de busqueda de personalidades
    		var url = this.url+'search/person?query=&query=' + encodeURI(criterioBusqueda) + '&api_key=2a238b0057e4080715ab70d3f30ec815';
    	}
    	else if(pagActiva == 'ContactPage') {//En el Contact se hace la busqueda de Series de TV
    		var url = this.url+'search/tv?query=&query=' + encodeURI(criterioBusqueda) + '&api_key=2a238b0057e4080715ab70d3f30ec815';	
    	}
    	return this.gestionBusqueda(url);
    }
    /**
     * [gestionBusqueda Este método busca una pelicula, serie o personalidad de acuerdo a la
     * url dada, usando para ello la api themoviedb]
     * @param {[type]} url [url para realizar el rest]
     */
    gestionBusqueda(url) {
        var response = this.http.get(url);// Halamos los datos
        var json = response.map(res => res.json()); // Parseamos el resultado a notacion json
        return json;
    }    
}