import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({})
export class AbstractComponent {
  constructor(protected translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
  }
}
