import { Pipe, PipeTransform } from '@angular/core'
import { stick } from './app/app.component';

@Pipe({
    name: 'searchpipe'
})
export class SearchPipe implements PipeTransform {
    transform(value: any, arg: stick[], counter): any {
        //debugger
        //value is data from data.json
        //console.log(value.length);
        console.log("length : " + arg.length);
        console.log("t : " + arg[0]);

        let type = [], ind = [];

        if (arg.length > 0) {
            for (let i = 0; i < arg.length; i++) {
                let cl: string = arg[i].dataclass;
                if (cl === "type") {
                    //fill in type array
                    type.push(arg[i].svalue.toLowerCase());

                }
                else if (cl === "industry") {
                    //fill in industry array
                    ind.push(arg[i].svalue.toLowerCase());
                }
            }

        }
        let typelen = type.length;
        let indlen = ind.length;

        let valtotal = value;
        let valT = [];
        if (valtotal != undefined) {
            if (type.length > 0) {
                
                valtotal =valtotal.filter(this.searchofarray((type), "type"));
            }
            if (ind.length > 0) {

                valtotal =valtotal.filter(this.searchofarray((ind), "industry"));
            }
            return valtotal;
        }
        else
        {
            return value;
        }
        

        /*
         
        let valtotal = value;
        let valT=[];
        if (valtotal != undefined) { 
           
           if (arg.length>0 ) {
               for(let i=0;i<arg.length;i++)
               {
                   let cl=arg[i].dataclass;
                   let id=arg[i].dataid;
                   let v:string=arg[i].svalue;
                   console.log("cl: "+ cl+ " id: "+id+ " v:"+v);
                   valT=valT.concat(valtotal.filter(this.searching(v.toLowerCase(),cl))); 
               }
               valtotal=valT;
           }

           var ll =valtotal.length;
           console.log("return LENGTH:"+valtotal.length);
           console.log("value"+valtotal);
           return valtotal;
       }
       else{
           return value;
       }
       */

        /*  
         let valtotal = value; 
          if (valtotal != undefined) {
              if (argn!= undefined) {
                  valtotal = valtotal.filter(this.searching(argn.toLowerCase(), 'name'));
                 // console.log(argn);
              }
              if (argpr != undefined) {
                  valtotal = valtotal.filter(this.searchingarr(argpr.toLowerCase(), 'practices'))
              }
              if (argi != undefined) {//i
                 valtotal = valtotal.filter(this.searching(argi.toLowerCase(), 'industry'))
             }
             if (argpo != undefined) {//po
                 valtotal = valtotal.filter(this.searching(argpo.toLowerCase(), 'role'))
             }
              if (argo != undefined) {
                  valtotal = valtotal.filter(this.searching(argo.toLowerCase(), 'office'));
              }
              if (argad != undefined) {//ad
                 valtotal = valtotal.filter(this.searchingarr(argad.toLowerCase(), 'admissions'))
             }
             if (arge != undefined) {//edu
                 valtotal = valtotal.filter(this.searchingarr(arge.toLowerCase(), 'edu'))
             }
              console.log("valu" + valtotal);
              return valtotal;
          }
          else
        
              return value;
                */
    }//transform array


    searchofarray(arg, key) {
        return function (item) {
            console.log("item" + item[key].toLowerCase() + " arg: " + arg);
            for (let i = 0; i < arg.length; i++) {
                if (((item[key]).toLowerCase().match(arg[i])))
                    return true;

            }
            return false
        }
    }

    searching(arg, key) {
        return function (item) {
            console.log("item" + item[key].toLowerCase() + " arg: " + arg);
            return ((item[key]).toLowerCase().match(arg))
        }
    }

    searchingarr(arg, key) {
        return function (item) {
            var i;
            for (i in item[key])
                if ((item[key][i]).toLowerCase().match(arg))
                    return ((item[key][i]).toLowerCase().match(arg))
        }
    }



    /*  transform(value: any, argn?: any, argp?: any): any {
          // console.log(value[0]);
  
          console.log("name:" + argn + " prac: " + argp);
          return value;
  
      }
      */
}
