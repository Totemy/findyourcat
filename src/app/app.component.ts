import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { BreedService } from '../services/breed.service';
import { Breed } from '../interfaces/breed.interface'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private breedService: BreedService) {}
	title = 'FindYourCat';
	displayedColumns: string[] = ['image'];
	apidata:any;
	breedList = new Array<Breed>();
	breedId:any;
	limit:number = 10;
	breedForm = new FormControl('');
	updateBreed(breed:any){
		this.breedId = breed.id;
		this.getData();
	}
	updateLimit(limit:number){
		this.limit = limit;
		this.getData();
	}
	getData():void{
		let url = `https://api.thecatapi.com/v1/images/search?limit=${this.limit}`;
		if(this.breedId){
			url+=`&breed_ids=${this.breedId}`
		}
		let headers = new HttpHeaders({
			'x-api-key': 'live_dskOqmKkYIzxTwoazzhldTm7tejKPnrIhkjVfOqrL2DmsKPu1RoikCSZM6SPvBYl'
		});
		this.http
			.get<any>(url, {
				headers: headers
			})
			.subscribe(data => {
				console.log(data);
				this.apidata= data;
				
			});
	  }
	ngOnInit() {
		this.breedService.getBreed().subscribe(res => {
			this.breedList = res;
			console.log(this.breedList)
		  });
		  this.getData();
	}
}
