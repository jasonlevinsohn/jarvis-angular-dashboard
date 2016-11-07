import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-farmgate',
    templateUrl: './farmgate.component.html',
    styleUrls: ['./farmgate.component.scss']
})
export class FarmgateComponent implements OnInit {
    gateStatus: string;
    gateOpen: boolean;

    constructor() {
        this.gateStatus = 'Closed';
        this.gateOpen = false;
    }

    ngOnInit() {
    }

    public toggleGate() {
        this.gateOpen = !this.gateOpen;

        if (this.gateOpen) {
            this.gateStatus = 'Open';
        } else {
            this.gateStatus = 'Closed';
        }

    }

}
