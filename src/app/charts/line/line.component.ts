import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-line',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './line.component.html',
  styleUrl: './line.component.css'
})
export class LineComponent {
  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--primary-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Total Rents',
                data: [65, 59, 80, 81, 56, 95, 50],
                fill: true,
                borderColor: documentStyle.getPropertyValue('--red-500'),
                tension: 0.4,
                backgroundColor: 'rgba(219, 68, 68,0.2)'
            },
            {
                label: 'Total Sale',
                data: [12, 31, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                tension: 0.4,
                backgroundColor: 'rgba(0, 255, 102,0.2)'
            }
        ]
    };
    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
}
