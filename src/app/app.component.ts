import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  	<h1 style="margin-bottom:20px;">Game of Life</h1>
  	<cell-grid></cell-grid>
	<div>Check out <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" rel="external" onclick="window.open(this.href); return false;">Conway's Game of Life</a> on Wikipedia.</div>
	<div>This app was built in Angular 2 (CLI) using TypeScript.</div>
	<div style="margin-bottom:25px;">Here is the <a href="https://github.com/jsb7131/gameoflife" rel="external" onclick="window.open(this.href); return false;">GitHub repository</a> for the app as well as a <a href="https://gist.github.com/jsb7131/772a648954aa91ae2465d63114dcdf93" rel="external" onclick="window.open(this.href); return false;">GitHubGist of the CellGridComponent</a> containing the algorithm.</div>
  `
})

export class AppComponent {
}
