import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent {
  data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--primary-color');

        this.data = {
            labels: ['Customers', 'Agents'],
            datasets: [
                {
                    data: [540, 325],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
}
