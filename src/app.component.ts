import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { AppService } from './app.service';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



export class stick {
  dataid: string;
  dataclass: string;
  svalue: string;
}



@Component({
  selector: 'app-root',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  //debugger
  contentData;
  contentDataLess = [];

  firstletter;
  namekey;
  prackey;
  inkey;
  poskey;
  offkey;
  adkey;
  edukey;
  searchB = "";
  //fd: formdata={namekey:'', prackey:''};
  allTech = ["Java", "cpplus", "csharp"];
  selectedsort = 'AZ';
  filSelVal = false;
  stickSelected: stick[] = [];
  type = []; ind = []; pra = []; top = []; year = [];
  t = '';
  counter = 0;
  count = 0;
  pageEnd = 4;

  filteredList = [];
  query;


  constructor(private _appservic: AppService, private _elementRef: ElementRef) { }
  //@ViewChild('appendSelected') d1:ElementRef;


  ngOnInit() {
    this.getContentData();

  }

  filter() {
    if (this.query !== "") {
      this.filteredList = this.contentData.filter(function (el) {
        return el.h2.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    } else {
      this.filteredList = [];
    }
  }

  select(item) {
    this.query = item.h2;
    this.searchB=this.query;
    this.filteredList = [];
  }

  handleClick(event) {
    
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this._elementRef.nativeElement) {
        inside = true;console.log("inside handel click");
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }

  onChangeCb(element: HTMLInputElement) {
    console.log("value: " + element.value + "checked" + element.checked);
    this.SelectFilterOnClick(element, true);
  }

  showMoreData() {
    this.pageEnd += 4
    /*
     for(let i=this.count+1;i<this.contentData.length;i++)
     {
     this.contentDataLess.concat(this.contentData[i-1]);
     if(i%4==0) break;
     }
     this.count+=4;
    */
  }

  SelectFilterOnClick(element: HTMLInputElement, isfilfornews) {
    //element in the checkboxes
    var filValue = element.value;
    this.t = filValue;
    this.filSelVal = true;
    var filId = element.closest("li").getAttribute("id");
    var filClass = element.closest("li").getAttribute("class");
    //var stickone:stick={dataid:"value" , svalue:"alue"};
    var stickone: stick = { dataid: filId, dataclass: filClass, svalue: filValue };

    //console.log(filId);
    if (isfilfornews == true) {
      if (element.checked) {
        this.stickSelected.push(stickone);
        this.filSelVal = true;
      } else {
        let index = this.stickSelected.findIndex(x => x.dataid == stickone.dataid);
        //console.log(index);
        this.stickSelected.splice(index, 1);
      }
    }
    //console.log(this.stickSelected);
    this.counter++;
    this.pageEnd = 4;

    /*
    var filCategory = filter.closest("li").attr('data-title');
    var filKey = filter.closest("li").attr('data-filterkey');
    //alert("part4")
    var filId = filter.closest("li").attr('data-filterid');
    filter.toggleClass('selected');
    if (isFilterForNews == true) {
        if (filter.attr("checked") == 'checked') {
            //if (filter.hasClass('selected')) {
            $('.filSelectedVal ul').append('<li><span>' + filValue + '</span><a href="javascript:void(0);" class="removeSelFilter" data-title="' + filCategory + '" data-filterkey="' + filKey + '" data-filterid="' + filId + '"><img src="/assets/images/filCross.png" alt="remove"></a></li>');
            $('.filSelectedVal').css("display", "block");
        } else {
            $('.filSelectedVal ul li span:contains(' + filValue + ')').parent('li').remove();
            $('.filSelectedVal').css("display", "none");
        }
    } else {
        if (filter.hasClass('selected')) {
            $('.filSelectedVal ul').append('<li><span>' + filValue + '</span><a href="javascript:void(0);" class="removeSelFilter" data-title="' + filCategory + '" data-filterkey="' + filKey + '" data-filterid="' + filId + '"><img src="/assets/images/filCross.png" alt="remove"></a></li>');
            $('.filSelectedVal').css("display", "block");
        } else {
            $('.filSelectedVal ul li span:contains(' + filValue + ')').parent('li').remove();
            $('.filSelectedVal').css("display", "none");
        }
    }
    selectedFilter();
     
     */

  }



  getContentData() {
    this._appservic.getContentData().subscribe(d => this.contentData = d);
  }

  setFirst(val) {
    this.firstletter = val;
    console.log(this.firstletter);
  }

  print() {
    this.searchB=this.query;
    this.filteredList = [];
  }

  submit(f) {

    console.log(f.value.searchbox);
    this.searchB = f.value.searchbox;
    this.pageEnd = 4;
  }

  log(x) {
    console.log(x);
  }
}
