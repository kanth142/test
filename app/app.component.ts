import { Component, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
 })
 
@Injectable()
export class AppComponent  {
	
	showData:boolean = false;
	modifieddata:string='';
	cartListName:string='Shopping List';
	ImageBasePath:string='https://www.real.de/lebensmittelshop';
	products:Array<any> = [];
	productsOriginal:Array<any> = [];
	cart:Array<any>=[];
	total:number=0;

    constructor(private http: Http)
	{
        this.getJSON().subscribe(data => this.products=data.products, error => console.log(error));
		
	
    }

	
	public getJSON(): Observable<any>
	{		
		return this.http.get("http://api.efood.real.de/api/v2/real/products/search?query=food:relevance:category:1&currentPage=0&pageSize=32").map((res:any) => res.json())
		.catch(error => {return this.handleError(error);});

    }
	
	filterItem(value:string)
	{
		if(this.productsOriginal.length == 0)
			this.productsOriginal = this.products
		   if(!value) this.assignCopy(); //when nothing has typed
		   this.products = Object.assign([], this.productsOriginal).filter(
			  product => product.name.toLowerCase().indexOf(value.toLowerCase()) > -1
		   )
	}
		
	assignCopy()
	{
	   this.products = Object.assign([], this.productsOriginal);
	} 
	
		
	handleError(error: Response)
	{
		if (error.status == 500){}
		else
		{
		  return Observable.throw(error);
		}
	}
	
	update()
    {
		this.showData = true;
	}
	save()
	{
		this.cartListName=this.modifieddata;
		this.showData = false;
	}
	cancel()
	{
		this.showData = false;
	}
		

	addItemToCart(product:any)
	{
		if (this.cart.length === 0)
		{
		 		product.count = 1;
		 		this.cart.push(product);
				this.total += Math.ceil(parseFloat(product.price.value)  * 10) / 10;
		 	} else {
		 		var repeat = false;
		 		for(var i = 0; i< this.cart.length; i++){
		 			if(this.cart[i].name === product.name){
		 				repeat = true;
		 				this.cart[i].count +=1;
						this.total += Math.ceil(parseFloat(product.price.value)  * 10) / 10;
		 			}
		 		}
		 		if (!repeat) {
		 			product.count = 1;
		 		 	this.cart.push(product);
					this.total += Math.ceil(parseFloat(product.price.value)  * 10) / 10;
					
		 		}
		 	}			
	};
	
		 
		 removeItem(product:any){
			  if(product.count > 1){
		     product.count -= 1;
			 this.total -= Math.ceil(parseFloat(product.price.value)  * 10) / 10;
		   }
		 };
		  removeItemCart(product:any){
		  
		   let countDec=Math.ceil(parseFloat(product.price.value)  * 10) / 10;
		   var index = this.cart.indexOf(product);
 			 this.cart.splice(index, 1);
		   this.total =this.total-countDec;
		   if(this.cart.length === 0)
		   {
			   this.total=0;
			   
		   }		   
		 };
}