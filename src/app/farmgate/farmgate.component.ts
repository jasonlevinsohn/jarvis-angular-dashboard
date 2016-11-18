import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
    selector: 'app-farmgate',
    templateUrl: './farmgate.component.html',
    styleUrls: ['./farmgate.component.scss']
})
export class FarmgateComponent implements OnInit {
    showGateStatus: string;
    fbControllerOnline: boolean = true;
    showControllerOnline: boolean = true;
    gateOpen: boolean;
    gateObserver: FirebaseObjectObservable<any>;
    controllerObserver: FirebaseObjectObservable<any>;

    constructor(af: AngularFire) {
        this.gateOpen = false;
        this.showGateStatus = 'retrieving';
        this.controllerObserver = af.database.object('/devices/controller');
        this.gateObserver = af.database.object('/devices/farmgate');

        this.gateObserver.subscribe(farmgate => {
            console.log('Farmgate: ', farmgate);
            this.gateStatus = farmgate.status;
        });

        this.controllerObserver.subscribe(controller => {
            console.log('Controller State Change: ', controller);
            this.fbControllerOnline = controller.online;

            this.checkControllerIsOnline();
        });
    }

    ngOnInit() {
    }

    private checkControllerIsOnline() {

        if (this.fbControllerOnline) {
            this.showControllerOnline = true;
            this.showGateStatus = 'retrieving';
        } else {
            this.showControllerOnline = false;
            this.controllerObserver.update({checkingOnline: false});
            this.showGateStatus = 'offline';
        }
        console.log('Is Controller online: ', this.showControllerOnline);


    }

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
