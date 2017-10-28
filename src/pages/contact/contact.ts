import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestService } from '../../service/rest/RestService';
import { DetallePage } from '../detalle/detalle';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	misSeries : any;
  constructor(public navCtrl: NavController, public restService: RestService) {

  }

  /**
   * [searchForMovie Asigna a la variable scope misPelis la data traida desde PeliService
   * O bien retorna un error si hubo un fallo.]
   * @param {[type]} event [variable especial que me permite obtener la cadena desde el input del buscador]
   * @param {[type]} key   [description]
   */
	ejecutarBusquedaSerieTV(event, key) {
		// Acá validamos que la longitud de la cadena que escriba en el input del buscador sea 
		// superior a 2 para proceder a realizar la busqueda en la api.	
		if(event.target.value.length > 2) {
			//console.log(this.restService.gestionRest(event.target.value, this.navCtrl.getActive().name));
			this.restService.gestionRest(event.target.value, this.navCtrl.getActive().name).subscribe(
				data => {
					this.misSeries = data.results; 
					console.log(data);
				},
				err => {
					console.log('Vaya, un error ha ocurrido! '+err);
				}
			);
		}
	}

	mostrarDetalle(event, serie) {
		console.log(serie);  
		this.navCtrl.push(DetallePage, {
			detalle: serie
		});
	}
}
