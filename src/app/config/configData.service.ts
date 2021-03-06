import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {InputComponent} from './inputComponent';
import {INPUT_COMPONENTS} from './inputComponents';


@Injectable()
export class ConfigDataService {
  private getTemplateUrl = require('../../assets/job_template.json');
  private response = {}
  constructor (private http: Http) {}

  template = this.getTemplateData()
  
  getTemplateData(): Observable<InputComponent[]> {
    // console.log("reading")
    return this.http.get(this.getTemplateUrl)
                    .map(this.extractTemplateData)
                    .catch(this.handleError);
  }

  private arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
  }

  updateJobData(supersetComponents, componentKey, newValue) : InputComponent[]{
    var index = this.arrayObjectIndexOf(supersetComponents, componentKey, 'name'); // 1
    var componentWithNewValue = supersetComponents[index]
    componentWithNewValue.value = newValue
    return [
    ...supersetComponents.slice(0, index), 
    Object.assign({}, componentWithNewValue),
    ...supersetComponents.slice(index + 1)
    ];
  }

  private extractTemplateData(res: Response) {
    let body = res.json();
    this.response = body
    // console.log("making a call")
    // console.log(body.parameters)
    return body || { };
  }

  private extractDescription():string {
    return this.response['case'].description;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    // console.log(error)
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  
}
