import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceModel } from 'src/app/_appModel/genservices/service.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { formatDate } from '@angular/common';
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
    private _categoryService: CategoryService,
    private fb: FormBuilder) { }

  categoryData: []

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
    ServiceVideoUrl: {
      file: null,
      thumb: null,
    },
    BigImageUrl: {
      file: null,
      thumb: null,
    }
  }
  bannerImg: string = '';
  addService: ServiceModel

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Service Management", "Service Management");
    let serviceId: any = this._activatedRoute.snapshot.params.Ref_Service_ID
    this.getCategory()
    if (serviceId != '0') {
      this.getService(serviceId)
    }
    else {
      this.initialize()
      // this.getService(0)

    }


  }

  getCategory() {
    this._categoryService.categorylist('ALL', 0).subscribe((resData: any) => {
      this.categoryData = resData

    });
  }

  getService(serviceId) {
    this._service.getService(serviceId).subscribe((res: any) => {
      this.addService = Array.isArray(res) ? res[0] : null
      if (this.addService) {
        this.addServiceForm.controls.ServiceTitle.setValue(this.addService.ServiceTitle)
        this.addServiceForm.controls.Category.setValue(this.addService.Ref_Category_ID)
        this.addServiceForm.controls.Description.setValue(this.addService.Description)
        this.addServiceForm.controls.Price.setValue(this.addService.Price)
        this.addServiceForm.controls.PriceWithProjectFiles.setValue(this.addService.PriceWithProjectFiles)
        this.addServiceForm.controls.Revision.setValue(this.addService.Revision)
        this.addServiceForm.controls.DeliveryDate.setValue(formatDate(this.addService.DeliveryDate, 'yyyy-MM-dd', 'en'))
        // this.addServiceForm.controls.DeliveryDate.setValue(new Date(this.addService.DeliveryDate))
        // this.addServiceForm.controls.DeliveryDate.setValue(new Dyate())
        // this.addServiceForm.controls.ServiceVideoUrl.setValue(this.addService.ServiceVideoUrl)
        // this.addServiceForm.controls.BigImageUrl.setValue(this.addService.BigImageUrl)


        // this.addServiceForm.controls.FAQDetails.setValue(this.addService.FAQDetails)
        // this.addServiceForm.controls.clientName.setValue(this.addService.ClientName);
        // this.addServiceForm.controls.shortDesc.setValue(this.addService.Descripation);
        // this.addServiceForm.controls.IsActive.setValue(this.addService.IsActive);
        if (Array.isArray(this.addService.FAQDetails)) {
          if (this.addService.FAQDetails.length > 0)
            this.addService.FAQDetails.filter((item, index) => { this.addFaq(index, true, item.Questions, item.Answer) })
          else
            this.addFaq(0, true)
        }


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
      this.addFaq(0, true)
    });
  }

  saveService() {
    this._base._commonService.markFormGroupTouched(this.addServiceForm)
    console.log("saveService", this.addServiceForm, this.addService)

    if (this.addServiceForm.valid) {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        this._base._commonService.filesUpload(this.fileChoosenData.BigImageUrl.file, 'Service').then((ImageUrls: string) => {
          this._base._commonService.filesUpload(this.fileChoosenData.ServiceVideoUrl.file, 'Service').then((serviceUrl: string) => {
            // this.addService.ImageUrl = url ? url : null

            // this.addService.Ref_Service_ID = this.addServiceForm.value.Ref_Service_ID
            this.addService.Ref_Category_ID = this.addServiceForm.value.Category
            this.addService.ServiceTitle = this.addServiceForm.value.ServiceTitle
            this.addService.Description = this.addServiceForm.value.Description
            this.addService.Price = this.addServiceForm.value.Price
            this.addService.PriceWithProjectFiles = this.addServiceForm.value.PriceWithProjectFiles
            this.addService.BigImageUrl = ImageUrls
            this.addService.ThumbnailImageUrl = ImageUrls
            this.addService.ServiceVideoUrl = serviceUrl
            this.addService.Revision = this.addServiceForm.value.Revision
            this.addService.DeliveryDate = this.addServiceForm.value.DeliveryDate
            this.addService.CreatedBy = FullName
            this.addService.FAQDetails = this.addServiceForm.value.FAQDetails

            console.log("saveService", this.addServiceForm, this.addService)

            // this.addServices()
          })
        })
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
      setTimeout(() => { $('#acknowledge_popup').modal('hide'); this._base._router.navigate(['admin', 'services']) }, 3000);
    })
  }

  fileChoosen($event, fieldName) {
    console.log("fileChoosen", $event)
    this.fileChoosenData[fieldName].file = $event.target.files;
    this._base._commonService.readImage($event.target).subscribe(res => {
      this.fileChoosenData[fieldName].thumb = res;
    })
  }

  get FaqListArray(): FormArray {
    return this.addServiceForm.get("FAQDetails") as FormArray
  }

  addFaq(index: number, isAdd: boolean, Questions: string = '', Answer: string = '') {
    if (isAdd) {
      let control: FormGroup
      control = this.fb.group({
        Questions: [Questions, [Validators.required]],
        Answer: [Answer, [Validators.required]]
      })
      this.FaqListArray.insert(index, control)
    } else {
      this.FaqListArray.removeAt(index)
    }
  }




}
