import {ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthDataProvider} from "../../core/service/auth.data-provider";

@Directive({
  selector: '[appPermission]',
})
export class PermissionDirective implements OnInit {

  private hasView = false;

  @Input() set appPermission(value: string[]) {
    if (!this.hasView && value.includes(this.authDataProvider.getRole())) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.hasView && !value.includes(this.authDataProvider.getRole())) {
      this.viewContainerRef.clear();
      this.hasView = false;
    }
  }

  constructor(
    private authDataProvider: AuthDataProvider,
    private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
    private templateRef: TemplateRef<any>
  ) {
  }

  ngOnInit(): void {
  }

}
