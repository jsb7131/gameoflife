import { Component, Input } from '@angular/core';

@Component({
	selector: 'cell',
	template: `
		<div [ngClass]="event === true ? 'thumbnail green' : 'thumbnail'">
		</div>
	`,
	styles: [`
		.green { background-color: green; }
	`]
})

export class CellComponent {
	@Input() event:any;
}