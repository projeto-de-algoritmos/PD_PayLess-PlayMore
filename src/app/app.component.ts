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
    if (this.registerForm.valid) {
      this.games.push(this.registerForm.value);
      this.registerForm.reset()
    } else {
      window.alert("Fill all the required fields!")
    }
  }

  remove(index: number) {
    this.games.splice(index, 1);
  }

  calculate(): void {
    if (this.calcForm.valid) {
      // TODO calculo e mostrar o resultado na lista
      console.log(this.calcForm.value)
    } else {
      window.alert("Fill all the required fields!")
    }
  }
}
