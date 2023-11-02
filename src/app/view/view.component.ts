import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  id : string = "";
  data : any;
  constructor(private Httpservice : HttpserviceService,private activatedRoute : ActivatedRoute){

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.Httpservice.getartData(this.id).subscribe((data)=>{
      this.data = data.data;
      document.getElementById("desc")!.innerHTML = this.data.description || 'No description avilable';
      document.getElementById("exhi")!.innerHTML = this.data.exhibition_history || 'No exhibition history avilable';
      document.getElementById("Pub")!.innerHTML = this.data.publication_history || 'No publication historyavilable';
    })
  }


}
