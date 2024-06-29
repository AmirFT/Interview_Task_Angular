import { CommonModule } from '@angular/common';
import { Injectable, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
        <ng-container *ngIf="visible">
            <mat-progress-bar color="accent" [bufferValue]="bufferValue" [mode]="mode" [value]="value"></mat-progress-bar>
        </ng-container>
    `,
  styleUrls: ['./progress-bar.scss'],
  imports: [CommonModule, RouterModule, MatProgressBarModule ],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  bufferValue: number;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value: number;
  visible: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param ProgressBarService _progressBarService
   */
  constructor(
    private _progressBarService: ProgressBarService
  ) {
    // Set the defaults

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the progress bar service properties

    // Buffer value
    this._progressBarService.bufferValue
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((bufferValue) => {
        this.bufferValue = bufferValue;
      });

    // Mode
    this._progressBarService.mode
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((mode) => {
        this.mode = mode;
      });

    // Value
    this._progressBarService.value
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.value = value;
      });

    // Visible
    this._progressBarService.visible
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((visible) => {
        this.visible = visible;
      });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  // Private
  private _bufferValue: BehaviorSubject<number>;
  private _mode: BehaviorSubject<string>;
  private _value: BehaviorSubject<number>;
  private _visible: BehaviorSubject<boolean>;

  /**
   * Constructor
   *
   * @param Router _router
   */
  constructor(
    private _router: Router
  ) {
    // Initialize the service
    this._init();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Buffer value
   */
  get bufferValue(): Observable<any> {
    return this._bufferValue.asObservable();
  }

  setBufferValue(value: number): void {
    this._bufferValue.next(value);
  }

  /**
   * Mode
   */
  get mode(): Observable<any> {
    return this._mode.asObservable();
  }

  setMode(value: 'determinate' | 'indeterminate' | 'buffer' | 'query'): void {
    this._mode.next(value);
  }

  /**
   * Value
   */
  get value(): Observable<any> {
    return this._value.asObservable();
  }

  setValue(value: number): void {
    this._value.next(value);
  }

  /**
   * Visible
   */
  get visible(): Observable<any> {
    return this._visible.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Initialize
   *
   * @private
   */
  private _init(): void {
    // Initialize the behavior subjects
    this._bufferValue = new BehaviorSubject(0);
    this._mode = new BehaviorSubject('indeterminate');
    this._value = new BehaviorSubject(0);
    this._visible = new BehaviorSubject(false);

    // Subscribe to the router events to show/hide the loading bar
    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.show();
      });

    this._router.events
      // tslint:disable-next-line:max-line-length
      .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel))
      .subscribe(() => {
        this.hide();
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show the progress bar
   */
  show(): void {
    this._visible.next(true);
  }

  /**
   * Hide the progress bar
   */
  hide(): void {
    this._visible.next(false);
  }
}

