import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {
  wishListedData : any[] = [];
  wishlist  = false;

  constructor(private _snackBar : MatSnackBar){}
  ngOnInit(){
    this.wishListedData = JSON.parse(localStorage.getItem('wishlist')!);
    if(this.wishListedData.length>0){
      this.wishlist = true;
    }
  } 
  removeFromFavourite(item : any){
    const itemsOnFavourite = JSON.parse(localStorage.getItem('wishlist')!);
    this.wishListedData = itemsOnFavourite.filter((data : any) => data.id != item.id);
    if(this.wishListedData.length>0){
      this.wishlist = true;
    }
    else{
      this.wishlist = false;
    }
    localStorage.setItem('wishlist',JSON.stringify(this.wishListedData));
    this.openSnackBar()
  }

  openSnackBar(){
    this._snackBar.open('Art removed from wishlist..!!', 'X', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 2000,
    });
  }
}
