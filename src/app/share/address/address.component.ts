import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {HttpEvent, HttpEventType, HttpRequest, HttpXhrBackend} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http/src/response';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


export interface Address {
    province?: string;
    city?: string;
    county?: string;
    address_detail?: string;
}

@Component({
    selector: 'su-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AddressComponent),
        multi: true
    }]
})
export class AddressComponent implements OnInit, ControlValueAccessor, AfterViewInit {


    private static ALL_ADDRESS: {[props: string]: any};

    addressObj: {[props: string]: any};

    provinces: string[];
    province: string;

    cities: string[];
    city: string;

    counties: string[];
    county: string;

    detail: string;

    @Input()
    isNeedDetail = false;

    @Input()
    inputClass: string = '';

    onChange: (value: Address) => void = (((value: Address) => {
    }));
    onTouch: () => void = (() => {
    });
    _disable: boolean = false;

    @Input()
    get disable(): boolean {
        return this._disable;
    }

    set disable(value: boolean) {
        this._disable = value;
    }


    constructor(private httpBackend: HttpXhrBackend) {
    }

    ngOnInit() {
        const req: HttpRequest<null> = new HttpRequest('GET',
            'assets/china_address.json',
            {
                reportProgress: false,
                responseType: 'json'
            });

        if (!AddressComponent.ALL_ADDRESS) {
            this.httpBackend
                .handle(req)
                .filter((e: HttpEvent<any>) => e.type === HttpEventType.Response)
                .map((e: HttpResponse<{[props: string]: any}>) => e.body)
                .subscribe(r => {
                    AddressComponent.ALL_ADDRESS = r;
                    this.setAddress(r);
                });
        } else {
            this.setAddress(AddressComponent.ALL_ADDRESS);
        }

    }

    ngAfterViewInit(): void {
    }

    writeValue(obj: Address): void {
        if (obj) {
            this.province = obj.province;
            this.provinceChange(this.province, false);
            this.city = obj.city;
            this.cityChange(this.city, false);
            this.county = obj.county;
            this.countyChange(this.county, false);
            this.detail = obj.address_detail;
            this.detailChange(this.detail, false);
        }
        if (!this.checkValid()) {
            this.province = this.city = this.county = null;
            this.detail = [obj.province || '', obj.city || '', obj.county || '', obj.address_detail || ''].join('-');
        }
    }

    /**
     * 检查是否每个地址合法
     * @return {boolean}
     */
    checkValid(): boolean {
        if (!this.addressObj) {
            return true;
        }
        if (this.province && !this.cities) {
            return false;
        }
        if (this.city && !this.counties) {
            return false;
        }

        return !(this.counties && this.county && this.counties.indexOf(this.county) === -1);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._disable = isDisabled;
    }


    setAddress(r: any) {
        this.addressObj = r;
        this.provinces = Object.keys(r);
    }

    provinceChange(e: string, notify: boolean = true): void {
        if (e && this.addressObj) {
            this.cities = this.addressObj[this.province] && Object.keys(this.addressObj[this.province]);
            this.counties = null;
            this.city = null;
            this.county = null;
        }
        if (notify) {
            this.notifyChange();
        }
    }

    cityChange(e: string, notify: boolean = true): void {
        if (e && this.addressObj && this.addressObj[this.province]) {
            this.counties = this.addressObj[this.province][this.city];
            this.county = null;
        }
        if (notify) {
            this.notifyChange();
        }
    }

    detailChange($event, notify: boolean = true): void {
        if (notify) {
            this.notifyChange();
        }
    }

    countyChange($event, notify: boolean = true): void {
        if (notify) {
            this.notifyChange();
        }
    }

    notifyChange(): void {
        if (!this.province && !this.city && !!this.county && !this.detail) {
            this.onChange(null);
        } else {
            this.onChange({province: this.province, city: this.city, county: this.county, address_detail: this.detail});
        }
    }

}
