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
        this.gateStatus = 'Closed';
        this.gateOpen = false;
        this.gateObserver = af.database.object('/devices/farmgate');

        this.gateObserver.subscribe(farmgate => {
            console.log('Farmgate: ', farmgate);
            this.setOpenBool(farmgate.status);
        });
    }

    ngOnInit() {
    }

    private setOpenBool(status) {
        if (status === 'open') {
            this.gateOpen = true;
            console.log('Gate Open');
        } else {
            this.gateOpen = false;
            console.log('Gate Closed');
        }
    }

    public toggleGate() {
        this.gateOpen = !this.gateOpen;

        if (this.gateOpen) {
            this.gateObserver.update({status: 'closed'});
        } else {
            this.gateObserver.update({status: 'open'});
        }
    }

}
