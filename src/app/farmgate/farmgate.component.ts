import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
    selector: 'app-farmgate',
    templateUrl: './farmgate.component.html',
    styleUrls: ['./farmgate.component.scss']
})

export class FarmgateComponent implements OnInit {
    gateStatus: string;
    showGateStatus: string;
    fbControllerOnline: boolean = false;
    showControllerOnline: boolean = false;
    gateOpen: boolean;
    gateObserver: FirebaseObjectObservable<any>;
    controllerObserver: FirebaseObjectObservable<any>;
    clearGateStatusCheck: any;
    currentGateVoltage: number = 0.0;
    showVoltage: number;

    constructor(af: AngularFire) {
        this.gateOpen = false;
        this.showGateStatus = 'retrieving';
        this.controllerObserver = af.database.object('/devices/controller');
        this.gateObserver = af.database.object('/devices/farmgate');

        this.gateObserver.subscribe(farmgate => {
            console.log('Farmgate: ', farmgate);
            if (farmgate.online === 'online') {
                this.gateStatus = farmgate.status;
            } else {
                this.gateStatus = 'offline';
            }

            // Set Gate to Online if checking and is online
            if (farmgate.checkingOnline === true) {
                if (farmgate.online === 'offline') {
                    this.showGateStatus = farmgate.online;
                } else {
                    this.showGateStatus = this.gateStatus;
                }

                this.gateObserver.update({checkingOnline: false});
                // We should always be periodically checking if the farmgate
                // is online.
                // clearTimeout(this.clearGateStatusCheck);
            } else {
                this.showGateStatus = this.gateStatus;
            }

            // Update the current Gate Voltage
            if (this.currentGateVoltage !== farmgate.currentVoltage) {
                this.showVoltage = farmgate.currentVoltage;
            }
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
            this.checkGateIsOnline(true);

            // check is gate is online in 5 minute intevals as well
            setInterval(this.checkGateIsOnline.bind(this), 5 * 60 * 1000, false);

        } else {
            this.showControllerOnline = false;
            this.controllerObserver.update({checkingOnline: false});
            this.showGateStatus = 'offline';
        }
        console.log('Is Controller online: ', this.showControllerOnline);


    }

    /* param {Boolean} changeStatus update what the status views on the dashboard */
    private checkGateIsOnline(changeStatus) {
        let that = this;
        let _gateStatus: string = this.gateStatus;
        let _showGateStatus: string = this.showGateStatus;
        // Stubbed Gate Online Check
        if (changeStatus) {
            this.showGateStatus = 'retrieving';
        }
        this.gateObserver.update({checkingOnline: true});
        console.log('CHECKING GATE STATUS.....');
        // this.gateStatus = 'offline';
        this.clearGateStatusCheck = setTimeout(function() {
            if (_gateStatus === 'offline') {
                _showGateStatus = 'offline';
                that.setGateStatus(_gateStatus, _showGateStatus);
            }
            console.log('GATE IS OFFLINE');
        }, 7000);

    }

    private setGateStatus(status, showStatus) {
        this.gateStatus = status;
        this.showGateStatus = showStatus;
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
