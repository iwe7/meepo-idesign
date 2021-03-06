import {
  Component, ViewContainerRef,
  OnInit, Injector, ComponentFactoryResolver, ElementRef
} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgModuleRef } from '@angular/core';
import { DesignPropsService } from 'meepo-idesign-share';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    public props: DesignPropsService,
    public ele: ElementRef
  ) { }
  ngOnInit() {
    // console.log(this.ele.nativeElement.style);
  }
}
