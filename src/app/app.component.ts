import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface IGame {
  name: string;
  hours: string;
  price: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pay Less Play More';
  registerForm!: FormGroup;
  calcForm!: FormGroup;
  games: IGame[] = [];
  resultId?: string;

  constructor(private readonly _fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      hours: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.calcForm = this._fb.group({
      budget: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.invalid) return window.alert("Fill all the required fields!");

    this.resetResult();
    this.games.push(this.registerForm.value);
    this.registerForm.reset()
  }

  remove(index: number) {
    this.resetResult();
    this.games.splice(index, 1);
  }

  calculate(): void {
    if (this.calcForm.invalid) return window.alert("Fill all the required fields!");

    this.resetResult();
    // TODO calculo e setar o resultid
    this.resultId = '0'
    const el = document.getElementById(this.resultId) as HTMLElement;
    el.style.backgroundColor = 'var(--secondary)';
  }

  private resetResult(): void {
    if (!this.resultId) return;

    const el = document.getElementById(this.resultId) as HTMLElement;
    el.style.backgroundColor = 'unset';
  }
}
