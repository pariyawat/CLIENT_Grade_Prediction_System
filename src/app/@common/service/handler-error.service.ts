import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerErrorService {

  constructor() { }

  handlerError(error) {
    switch (error.status) {
      case 401:
        // this.sessionService.clearActiveUser();
        // this.route.navigate(['/login']);
        break;
      default: break;
    }
    return error;
  }
}
