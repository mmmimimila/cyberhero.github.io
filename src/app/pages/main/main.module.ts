import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

@NgModule({
  imports: [
    NgCommonModule,
  ],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}
