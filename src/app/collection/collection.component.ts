import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { Data } from '../model/interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit{
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
  pageNo : number = 0;
  isLoading = false;

  constructor(private httpservice : HttpserviceService,private _snackBar : MatSnackBar){}
  ngOnInit(){
    if(JSON.parse(localStorage.getItem('wishlist')!)==null){
      localStorage.setItem('wishlist',JSON.stringify([]));
    }
    this.pageNo = 2;
    this.httpservice.getPaginatedData(this.pageNo.toString()).subscribe((data) =>{
      this.alldata = data;
      this.dataInfo = this.alldata.data;
      this.isLoading = true;
    })

  }
  selectUpdate(selected : any){
    this.selection = selected.target.value;
  }
  updateTextSearch(textSearched : any){
    this.textChanged = textSearched.target.value;
    if(this.textChanged === ""){
      this.dataInfo = this.alldata.data;
      this.searchedData = [];
    }
    else{
      this.httpservice.getDataBySearch(this.textChanged).subscribe((data) => {
        this.alldata = data;
        this.dataInfo = this.alldata.data;
        var query = ""; 
        this.dataInfo?.forEach(element => {
          query = query + "," + element.id;
        });

        this.httpservice.getAllDatasOfSearch(query.substring(1,query.length)).subscribe((data) => {
          this.alldata = data;
          this.dataInfo = this.alldata.data;
          console.log(this.dataInfo);
          
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
        });
  
      });

   
      
    }
  }

  updatePageData(){
    this.httpservice.getPaginatedData(this.pageNo.toString()).subscribe((data) =>{
      this.alldata = data;
      this.dataInfo = this.alldata.data;
    })
  }

  prevPage(){
    if(this.pageNo==1){
      const prev = document.getElementsByClassName("prev")[0];
      prev.setAttribute("class","page-link prev");
    }
    else{
      this.pageNo -= 1;
      this.updatePageData();
    }
  }

  nextPage(){
    this.pageNo += 1;
    this.updatePageData();
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
    console.log(JSON.parse(localStorage.getItem('wishlist')!))
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
