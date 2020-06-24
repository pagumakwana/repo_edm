import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './texteditor.component';
@NgModule({
    declarations: [
        TextEditorComponent
    ],
    imports: [
        CommonModule,
        CKEditorModule
    ],
    exports: [TextEditorComponent],
    providers: []
})
export class TextEditorModule { }
