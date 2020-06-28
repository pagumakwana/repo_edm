import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceModel } from 'src/app/_appModel/genservices/service.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
declare var $: any;

@Component({
  selector: 'appAdmin-addmodifyservices',
  templateUrl: './addmodifyservices.component.html',
  styleUrls: ['./addmodifyservices.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class AddModifyServicesComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    private _activatedRoute: ActivatedRoute,
    private _service: GenService,
    private fb: FormBuilder) { }

  addService1 = {
    Ref_Service_ID: null,
    Ref_Category_ID: null,
    ServiceTitle: null,
    Description: null,
    Price: null,
    PriceWithProjectFiles: null, //missing
    BigImageUrl: null,
    ThumbnailImageUrl: null,
    ServiceVideoUrl: null, //yes
    ProjectFilesUrl: null,
    Revision: null,
    DeliveryDate: null,
    IsActive: null,
    // CreatedBy: FullName,
    FAQDetails: []
  }

  addServiceForm: FormGroup = this.fb.group({
    ServiceTitle: ['', [Validators.required]],
    Category: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    Price: ['', [Validators.required]],
    PriceWithProjectFiles: ['', [Validators.required]],
    Revision: ['', [Validators.required]],
    DeliveryDate: ['', [Validators.required]],
    // ProjectFilesUrl: ['', [Validators.required]],
    ServiceVideoUrl: ['', [Validators.required]],
    BigImageUrl: ['', [Validators.required]],
    // ThumbnailImageUrl: ['', [Validators.required]],
    // IsActive: ['', [Validators.required]],
    FAQDetails: this.fb.array([])
  })

  fileChoosenData = {
    choosenFile: null
  }

  addService: ServiceModel

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Service Management", "Service Management");
    let serviceId: any = this._activatedRoute.snapshot.params.serviceId
    if (serviceId > 0) {
      this.getClients(serviceId)
    }
    else {
      this.initialize()
    }


  }

  getClients(serviceId) {
    this._service.getService(serviceId).subscribe((res: any) => {
      this.addService = Array.isArray(res) ? res[0] : null
      if (this.addService) {
        // this.addServiceForm.controls.clientName.setValue(this.addService.ClientName);
        // this.addServiceForm.controls.shortDesc.setValue(this.addService.Descripation);
        // this.addServiceForm.controls.IsActive.setValue(this.addService.IsActive);
      }
    })
  }

  initialize() {
    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      this.addService = {
        Ref_Service_ID: 0,
        Ref_Category_ID: null,
        ServiceTitle: null,
        Description: null,
        Price: null,
        PriceWithProjectFiles: null,
        BigImageUrl: null,
        ThumbnailImageUrl: null,
        ServiceVideoUrl: null,
        ProjectFilesUrl: null,
        Revision: null,
        DeliveryDate: null,
        IsActive: true,
        CreatedBy: FullName,
        FAQDetails: []
      }
      this.addFaq('', '')
    });
  }

  saveService() {
    this._base._commonService.markFormGroupTouched(this.addServiceForm)
    if (this.addServiceForm.valid) {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        // this._base._commonService.uploadFile(this.fileChoosenData.choosenFile, 'Client').then((url: string) => {
        // this.addService.ImageUrl = url ? url : null

        // this.addService.Ref_Service_ID = this.addServiceForm.value.Ref_Service_ID
        // this.addService.Ref_Category_ID = this.addServiceForm.value.Ref_Category_ID
        this.addService.ServiceTitle = this.addServiceForm.value.ServiceTitle
        this.addService.Description = this.addServiceForm.value.Description
        this.addService.Price = this.addServiceForm.value.Price
        this.addService.PriceWithProjectFiles = this.addServiceForm.value.PriceWithProjectFiles
        // this.addService.BigImageUrl = this.addServiceForm.value.BigImageUrl
        // this.addService.ThumbnailImageUrl = this.addServiceForm.value.ThumbnailImageUrl
        // this.addService.ServiceVideoUrl = this.addServiceForm.value.ServiceVideoUrl
        // this.addService.ProjectFilesUrl = this.addServiceForm.value.ProjectFilesUrl
        this.addService.Revision = this.addServiceForm.value.Revision
        this.addService.DeliveryDate = this.addServiceForm.value.DeliveryDate
        // this.addService.IsActive = this.addServiceForm.value.IsActive
        this.addService.CreatedBy = FullName
        this.addService.FAQDetails = this.addServiceForm.value.FAQDetails

        console.log("saveService", this.addServiceForm, this.addService)
        this.addServices()
        // })
      })
    }
  }

  addServices() {
    this._service.addmodifyService(this.addService).subscribe((res: any) => {
      let msg = {
        SERVICEADDED: "Service added successfully!",
        SERVICEUPDATED: "Service updated successfully!",
        SERVICENAMEEXISTS: "Service already exists!"
      }
      this._base._alertMessageService.success(msg[res]);
      $('#acknowledge_popup').modal('show')
      setTimeout(() => { this._base._router.navigate(['admin', 'services']) }, 3000);
    })
  }

  fileChoosen($event, fieldName) {
    console.log("fileChoosen", $event)
    this.fileChoosenData[fieldName] = $event.target.files
  }

  get FaqListArray(): FormArray {
    return this.addServiceForm.get("FAQDetails") as FormArray
  }

  addFaq(Questions: string, Answer: string) {
    let control: FormGroup
    control = this.fb.group({
      Questions: [Questions, [Validators.required]],
      Answer: [Answer, [Validators.required]]
    })
    this.FaqListArray.push(control)
  }




}
