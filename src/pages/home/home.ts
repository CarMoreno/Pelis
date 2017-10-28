import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestService } from '../../service/rest/RestService';
import { DetallePage } from '../detalle/detalle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	misPelis: any;

	/**
	 * [constructor Inyectamos las dependencias necesarias para el funcionamiento]
	 * @param {NavController} public navCtrl      [navCtrl by Angular]
	 * @param {RestService}  public RestService [Servicio rest para las Peliculas]
	 */
  constructor(public navCtrl: NavController, public restService: RestService) {

  }

  /**
   * [ejecutarBusquedaPeli Asigna a la variable scope misPelis la data traida desde PeliService
   * O bien retorna un error si hubo un fallo.]
   * @param {[type]} event [variable especial que me permite obtener la cadena desde el input del buscador]
   * @param {[type]} key   [description]
   */
	ejecutarBusquedaPeli(event, key) {
		// Acá validamos que la longitud de la cadena que escriba en el input del buscador sea 
		// superior a 2 para proceder a realizar la busqueda en la api.	
		if(event.target.value.length > 2) {
			//console.log(this.restService.gestionRest(event.target.value, this.navCtrl.getActive().name));
			this.restService.gestionRest(event.target.value, this.navCtrl.getActive().name).subscribe(
				data => {
					this.misPelis = data.results; 
					//console.log(data);
				},
				err => {
					console.log('Vaya, un error ha ocurrido! '+err);
				}
			);
		}
	}

	mostrarDetalle(event, peli) {
		console.log(peli);  
		this.navCtrl.push(DetallePage, {
			detalle: peli
		});
	}

}
