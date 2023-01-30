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
  resultId?: number | null;

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
    const budget = this.calcForm.value.budget;
    this.resultId = this.knapsack(budget);
    if(this.resultId === null || this.resultId === undefined) return window.alert("Insufficient budget!");
    const el = document.getElementById(this.resultId.toString()) as HTMLElement;
    el.style.backgroundColor = 'var(--secondary)';
  }

  private knapsack(budget: number): number | null {
    let dp = Array(budget + 1).fill(0);
    let chosen = Array(this.games.length).fill(null).map(() => Array(budget + 1).fill(null));
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      for (let j = 0; j <= budget; j++) {
        if (parseFloat(game.price) > j) {
          chosen[i][j] = i > 0 ? chosen[i - 1][j] : i;
          continue;
        }
        let candidate = dp[j - parseFloat(game.price)] + game.hours;
        if (candidate > dp[j]) {
          dp[j] = candidate;
          chosen[i][j] = i;
        } else {
          chosen[i][j] = i > 0 ? chosen[i - 1][j] : i;
        }
      }
    }
    return chosen[this.games.length - 1][budget];
  }


  private resetResult(): void {
    if (this.resultId === null || this.resultId === undefined) return;

    const el = document.getElementById(this.resultId.toString()) as HTMLElement;
    el.style.backgroundColor = 'unset';
    this.resultId = undefined;
  }
}
