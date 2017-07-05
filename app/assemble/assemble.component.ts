import { Component, Injectable, OnInit} from '@angular/core';

import { InputComponent } from './inputComponent';
import { InputComponentService } from './inputComponent.service';
import { JobDataService } from './jobData.service';


@Component({
  selector: 'app-assemble',
  providers:[InputComponentService, JobDataService],
  template:`
  <div>
  <!--
    <div *ngFor="let tag of tags" class="btn-group" data-toggle="buttons">
      <label class="btn btn-primary"  [class.selected]="tag.checked===true">
        <input type="checkbox"
              [checked]="tag.checked"
              (change)="toggleFamily(tag.name)">{{tag.name}}
      </label>
    </div>
    <app-parameters [families]="tags"></app-parameters>-->
  </div>
  `,
  styleUrls: ['./assemble.component.css']
})

export class AssembleComponent implements OnInit {

  supersetComponents:InputComponent []
  tags:{name:string, checked: boolean} []
  mode = 'Observable';
  errorMessage: string;

  constructor(private jobDataService:JobDataService,
    private jobDataService2:InputComponentService) { }

  ngOnInit() {
    this.getJobData()
  }

  getJobData () {
    this.jobDataService.getJobData()
                        .subscribe(
                          supersetComponents => this.supersetComponents = supersetComponents,
                          error => this.errorMessage = <any> error);

    // console.log(this.supersetComponents)

  }


  // constructor(private inputComponentService:InputComponentService) { }
  // constructor(private jobDataService:JobDataService) { }
  //
  // ngOnInit() {
  //   this.supersetComponents = this.inputComponentService.getInputComponents()
  //   this.tags = this.inputComponentService.getFamilyTags()
  // }
  //
  // toggleFamily(tag) {
  //   this.tags = this.inputComponentService.toggleFamilyTag(tag, this.tags)
  // }

}
