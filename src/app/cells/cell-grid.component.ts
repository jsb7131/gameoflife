import { Component } from '@angular/core';

@Component({
	selector: 'cell-grid',
	template: `
		<div>
			<button class="btn btn-primary" (click)="updateGeneration()">See Next Generation</button>
			<hr/>
			<div class="row" *ngFor="let gridElemState of gridElemsState; let ind = index">
				<div class="col-xs-2" *ngFor="let gridElemState of gridElemsState[ind]">
					<cell [event]="gridElemState"></cell>
				</div>
			</div>
		</div>
	`
})

export class CellGridComponent {

	gridElemsState = [
		[false, false, false, false, true, false],
		[false, false, false, true, false, false],
		[true, false, false, false, true, true],
		[false, true, true, true, true, false],
		[false, false, false, false, false, false],
		[false, false, false, true, true, true]
	];

	updateGeneration() {

		let data = this.gridElemsState;
		let newStates = [];

		let i = 0;
		while (i < data[0].length) {

			let newStatesRow = [];

			let j = 0;
			while (j < data[0].length) {

				if (data[i][j] === false) {

					let neighborsArrayDead = this.parseToroidalNeighbors(data, i, j);
					let repeatCountsDead = this.repeatsCounter(neighborsArrayDead);

					if (repeatCountsDead["true"] === 3) {
						newStatesRow.push(true);
					} else {
						newStatesRow.push(data[i][j]);
					};

				} else {

					let neighborsArrayAlive = this.parseToroidalNeighbors(data, i, j);
					let repeatCountsAlive = this.repeatsCounter(neighborsArrayAlive);

					if (repeatCountsAlive["true"] === 1 || repeatCountsAlive["true"] === 0) {
						newStatesRow.push(false);
					} else if (repeatCountsAlive["true"] > 3) {
						newStatesRow.push(false);
					} else {
						newStatesRow.push(data[i][j]);
					};
				};
				j++;

			};
			newStates.push(newStatesRow);
			i++;
		};

		let x = 0;
		while (x < newStates.length) {
			let y = 0;
			while (y < newStates.length) {
				data[x][y] = newStates[x][y];
				y++;
			};
			x++;
		};
	};

	repeatsCounter(array) {
	
		let counts = {};

		array.forEach((x) => {
		    counts[x] = (counts[x] || 0) + 1;
		});

		if (!counts.hasOwnProperty("true")) {
			counts["true"] = 0;
		};

		return counts;
	};

	parseToroidalNeighbors(array2D, rowIndex, columnIndex) {

		let neighbors;
		let maxIndex = array2D[0].length - 1;

		if (rowIndex === 0 && columnIndex === 0) {
			neighbors = [
				array2D[rowIndex+maxIndex][columnIndex+maxIndex],
				array2D[rowIndex+maxIndex][columnIndex],
				array2D[rowIndex+maxIndex][columnIndex+1],
				array2D[rowIndex][columnIndex+maxIndex],
				array2D[rowIndex][columnIndex+1],
				array2D[rowIndex+1][columnIndex+maxIndex],
				array2D[rowIndex+1][columnIndex],
				array2D[rowIndex+1][columnIndex+1]
			];
		} else if (rowIndex === 0 && 0 < columnIndex && columnIndex < maxIndex) {
			neighbors = [
				array2D[rowIndex+maxIndex][columnIndex-1],
				array2D[rowIndex+maxIndex][columnIndex],
				array2D[rowIndex+maxIndex][columnIndex+1],
				array2D[rowIndex][columnIndex-1],
				array2D[rowIndex][columnIndex+1],
				array2D[rowIndex+1][columnIndex-1],
				array2D[rowIndex+1][columnIndex],
				array2D[rowIndex+1][columnIndex+1]
			];
		} else if (rowIndex === 0 && columnIndex === maxIndex) {
			neighbors = [
				array2D[rowIndex+maxIndex][columnIndex-1],
				array2D[rowIndex+maxIndex][columnIndex],
				array2D[rowIndex+maxIndex][columnIndex-maxIndex],
				array2D[rowIndex][columnIndex-1],
				array2D[rowIndex][columnIndex-maxIndex],
				array2D[rowIndex+1][columnIndex-1],
				array2D[rowIndex+1][columnIndex],
				array2D[rowIndex+1][columnIndex-maxIndex]
			];
		} else if (0 < rowIndex && rowIndex < maxIndex && columnIndex === maxIndex) {
			neighbors = [
				array2D[rowIndex-1][columnIndex-1],
				array2D[rowIndex-1][columnIndex],
				array2D[rowIndex-1][columnIndex-maxIndex],
				array2D[rowIndex][columnIndex-1],
				array2D[rowIndex][columnIndex-maxIndex],
				array2D[rowIndex+1][columnIndex-1],
				array2D[rowIndex+1][columnIndex],
				array2D[rowIndex+1][columnIndex-maxIndex]
			];
		} else if (rowIndex === maxIndex && columnIndex === maxIndex) {
			neighbors = [
				array2D[rowIndex-1][columnIndex-1],
				array2D[rowIndex-1][columnIndex],
				array2D[rowIndex-1][columnIndex-maxIndex],
				array2D[rowIndex][columnIndex-1],
				array2D[rowIndex][columnIndex-maxIndex],
				array2D[rowIndex-maxIndex][columnIndex-1],
				array2D[rowIndex-maxIndex][columnIndex],
				array2D[rowIndex-maxIndex][columnIndex-maxIndex]
			];
		} else if (rowIndex === maxIndex && 0 < columnIndex && columnIndex < maxIndex) {
			neighbors = [
				array2D[rowIndex-1][columnIndex-1],
				array2D[rowIndex-1][columnIndex],
				array2D[rowIndex-1][columnIndex+1],
				array2D[rowIndex][columnIndex-1],
				array2D[rowIndex][columnIndex+1],
				array2D[rowIndex-maxIndex][columnIndex-1],
				array2D[rowIndex-maxIndex][columnIndex],
				array2D[rowIndex-maxIndex][columnIndex+1]
			];
		} else if (rowIndex === maxIndex && columnIndex === 0) {
			neighbors = [
				array2D[rowIndex-1][columnIndex+maxIndex],
				array2D[rowIndex-1][columnIndex],
				array2D[rowIndex-1][columnIndex+1],
				array2D[rowIndex][columnIndex+maxIndex],
				array2D[rowIndex][columnIndex+1],
				array2D[rowIndex-maxIndex][columnIndex+maxIndex],
				array2D[rowIndex-maxIndex][columnIndex],
				array2D[rowIndex-maxIndex][columnIndex+1]
			];
		} else if (0 < rowIndex && rowIndex < maxIndex && columnIndex === 0) {
			neighbors = [
				array2D[rowIndex-1][columnIndex+maxIndex],
				array2D[rowIndex-1][columnIndex],
				array2D[rowIndex-1][columnIndex+1],
				array2D[rowIndex][columnIndex+maxIndex],
				array2D[rowIndex][columnIndex+1],
				array2D[rowIndex+1][columnIndex+maxIndex],
				array2D[rowIndex+1][columnIndex],
				array2D[rowIndex+1][columnIndex+1]
			];
		} else {
			neighbors = [
				array2D[rowIndex-1][columnIndex-1],
				array2D[rowIndex-1][columnIndex],
				array2D[rowIndex-1][columnIndex+1],
				array2D[rowIndex][columnIndex-1],
				array2D[rowIndex][columnIndex+1],
				array2D[rowIndex+1][columnIndex-1],
				array2D[rowIndex+1][columnIndex],
				array2D[rowIndex+1][columnIndex+1]
			];
		};

		return neighbors;
	};

}