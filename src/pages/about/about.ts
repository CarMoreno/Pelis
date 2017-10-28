import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestService } from '../../service/rest/RestService';
import { DetallePage } from '../detalle/detalle';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	misPersonalidades: any;
  constructor(public navCtrl: NavController, public restService: RestService) {

  }

  ejecutarBusquedaPersonalidad(event, key) {
		// Acá validamos que la longitud de la cadena que escriba en el input del buscador sea 
		// superior a 2 para proceder a realizar la busqueda en la api.	
		if(event.target.value.length > 2) {
			console.log(this.restService.gestionRest(event.target.value, this.navCtrl.getActive().name));
			this.restService.gestionRest(event.target.value, this.navCtrl.getActive().name).subscribe(
				data => {
					this.misPersonalidades = data.results;
					console.log(data); 
				},
				err => {
					console.log('Vaya, un error ha ocurrido! '+err);
				}
			);
		}
	}

	mostrarDetalle(event, person) {
		console.log(person);  
		this.navCtrl.push(DetallePage, {
			detalle: person
		});
	}

}
