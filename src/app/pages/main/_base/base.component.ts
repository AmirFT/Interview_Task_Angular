import { Component, OnInit, OnDestroy } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';

// import { PerfectScrollbarDirective } from '@lib/directives/perfect-scrollbar/perfect-scrollbar.directive';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-base',
  template: ``
})
export class BaseComponent implements OnInit, OnDestroy {

  direction: Direction;


  // Private
  protected unsubscribeAll: Subject<any>;

  constructor(
    // protected configService: ConfigService
  ) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the config changes
    // this.configService.config
    //   .pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe((settings) => {
    //     this.direction = settings.direction;
    //   });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * get Sum
   *
   * @param dataSource dataSource
   * @param column columnName
   */
  // getSum(dataSource: MatTableDataSource<any>, column: string, toFixed: number = 0): number {
  //     return (dataSource.filteredData.map(t => t[column]).reduce((acc, value) => acc + value, 0)).toFixed(toFixed);
  // }

  // /**
  //  * Scroll to the top
  //  *
  //  * @param directiveScroll directiveScroll
  //  * @param speed speed
  //  */
  // scrollToTop(directiveScroll: PerfectScrollbarDirective, speed?: number): void {
  //     speed = speed || 400;
  //     if (directiveScroll) {

  //         directiveScroll.update();

  //         setTimeout(() => {
  //             directiveScroll.scrollToTop(0, speed);
  //         });
  //     }
  // }

}
