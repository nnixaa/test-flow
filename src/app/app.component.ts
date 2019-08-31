import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { projectInitAction } from 'src/app/state/project/project.reducer';
import { AppState } from 'src/app/state/root-reducer';
import { specInitAction } from 'src/app/state/project/spec.reducer';

const LOCAL_STORAGE_PROJECT_KEY = 'tf-project';
const LOCAL_STORAGE_SPECS_KEY = 'tf-project';

@Component({
  selector: 'tf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const projectName = localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY) || document.title;
    const specs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SPECS_KEY)) || [];

    if (!projectName) {
      localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, projectName);
    }

    this.store.dispatch(projectInitAction({ name: projectName }));
    this.store.dispatch(specInitAction({ specList: specs }));
  }
}
