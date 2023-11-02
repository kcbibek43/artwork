import { Component, OnInit } from '@angular/core';
import { Data } from '../model/interface';
import { HttpserviceService } from '../httpservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})
export class ArtworkComponent implements OnInit {
  alldata : Data = {
    pagination: {},
    data: [],
    info: {},
    config: {}
  };
  dataInfo : any[] | undefined ;
  searchedData : any[] | undefined ;
  textChanged: string = "";
  selection : string = "";
  isLoading = false;
  isTouched = false;

  constructor(private httpservice : HttpserviceService,private _snackBar: MatSnackBar){}
  ngOnInit(){
    if(JSON.parse(localStorage.getItem('wishlist')!)==null){
      localStorage.setItem('wishlist',JSON.stringify([]));
    }
    this.httpservice.getAllData().subscribe((data) => {
      this.alldata = data;
      this.dataInfo = this.alldata.data;
      this.isLoading = true;
    });
  }
  selectUpdate(selected : any){
    this.selection = selected.target.value;
    console.log(this.selection);
  }
  updateTextSearch(textSearched : any){
    this.textChanged = textSearched.target.value;
    console.log(this.textChanged)
    if(this.textChanged === ""){
      this.dataInfo = this.alldata.data;
      this.searchedData = [];
    }
    else{
      if(this.selection === "1"){
        this.searchedData = this.alldata.data?.filter(data => data.artist_display.toLowerCase().includes(this.textChanged.toLowerCase()));
        this.dataInfo = this.alldata.data?.filter(data => data.artist_display.toLowerCase().includes(this.textChanged.toLowerCase()));
      }
      else if(this.selection === "2"){
        this.searchedData = this.alldata.data?.filter(data => data.title.toLowerCase().includes(this.textChanged.toLowerCase()));
        this.dataInfo = this.alldata.data?.filter(data => data.title.toLowerCase().includes(this.textChanged.toLowerCase()));
      }
      else{
      this.searchedData = this.alldata.data?.filter(data => data.title.toLowerCase().includes(this.textChanged.toLowerCase()));
      this.dataInfo = this.alldata.data?.filter(data => data.title.toLowerCase().includes(this.textChanged.toLowerCase()));
      const filterSearch = this.alldata.data?.filter(data => data.title.toLowerCase().includes(this.textChanged.toLowerCase()));
      filterSearch.forEach(element => {
        this.searchedData?.push(element);
        this.dataInfo?.push(element);
      });
      }
    }
  }

  wishlisted(item : any){
    const userData = JSON.parse(localStorage.getItem('wishlist')!);
    const idx = userData.findIndex((data : any ) => data.id===item.id);
    if(idx===-1){
      userData.push(item);
      localStorage.setItem('wishlist',JSON.stringify(userData));
      this.openSnackBar();

    }
    else{
      this.openSnackBar1();
    }
  }
  openSnackBar(){
    this._snackBar.open('Added to the favourite!!', 'X', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 2000,
    });
  }
  openSnackBar1(){
    this._snackBar.open('Already on favourite!!', 'X', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 2000,
    });
  }
}
