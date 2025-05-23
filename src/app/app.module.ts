import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // required for Angular Material
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    declarations: [
    ],
    imports:[
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule, 
        RouterModule,
        MatToolbarModule,
        HeaderComponent
    ],
    providers: []
})
export class AppModule { }