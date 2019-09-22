import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExpendScreenService {
 isOpenLeft = new Subject<boolean>();

}
