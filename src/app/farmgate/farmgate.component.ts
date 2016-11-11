import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
    selector: 'app-farmgate',
    templateUrl: './farmgate.component.html',
    styleUrls: ['./farmgate.component.scss']
})
export class FarmgateComponent implements OnInit {
    gateStatus: string;
    gateOpen: boolean;
    gateObserver: FirebaseObjectObservable<any>;

    constructor(af: AngularFire) {
        this.gateOpen = false;
        this.gateObserver = af.database.object('/devices/farmgate');

        this.gateObserver.subscribe(farmgate => {
            console.log('Farmgate: ', farmgate);
            this.gateStatus = farmgate.status;
        });
    }

    ngOnInit() {
    }

    // private setOpenBool(status) {
    //     if (status === 'open') {
    //         this.gateOpen = true;
    //         console.log('Gate Open');
    //     } else {
    //         this.gateOpen = false;
    //         console.log('Gate Closed');
    //     }
    // }

    public toggleGate() {

        if (this.gateStatus === 'open') {
            this.gateObserver.update({status: 'closing'});
        } else if (this.gateStatus === 'closed') {
            this.gateObserver.update({status: 'opening'});
        } else {
            console.log('Unactionable Gate Status: ', this.gateStatus);
        }
    }

}
