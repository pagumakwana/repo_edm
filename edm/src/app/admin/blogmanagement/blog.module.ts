import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DatatablesModule } from "src/app/commonmodule/datatables/datatables.module";
import { ErrorModule } from "src/app/commonmodule/errorComponent/error.module";
import { BlogService } from "src/app/_appService/blog/blog.service";
import { AddModifyBlogComponent } from "./addmodifyblog/addmodifyblog.component";
import { BlogComponent } from "./bloglist/bloglist.component";

@NgModule({
    declarations: [BlogComponent, AddModifyBlogComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: BlogComponent
            },
            {
                path: ':slug',
                component: AddModifyBlogComponent
            }
        ]),
        ErrorModule,
        FormsModule,
        ReactiveFormsModule,
        DatatablesModule,
    ],
    exports: [],
    providers: [BlogService]
})
export class BlogManagement {

}