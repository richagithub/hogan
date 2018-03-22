import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'searchtext'
})
export class FirstPipe implements PipeTransform {
    transform(value: any, text: any): any {
       // debugger
        console.log(": " + text);
        if (value != undefined) {//args1=='productType'  args2==this.productType args3==this.searchParam
            if (text != undefined) {
                return value.filter(item => item.h2.toLowerCase().match(text.toLowerCase()) );//whats item??
            }
            else
                return value;
        }

    }
}