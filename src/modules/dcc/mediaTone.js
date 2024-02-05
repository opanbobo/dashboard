import React from 'react';
import { ApexChart, Row, Col } from 'components';

const MediaTone = ({ className, charts, activeTone, ...props }) => {
  const { data = [], onDonutClick } = charts;

  return (
    <Row>
      {data.map((item, index) => {
        // Calculate total sum of magnitudes
        const total = item.tones.reduce((sum, tone) => {
          const value = Object.values(tone)[0];
          return sum + Math.abs(value); // Use absolute value to handle negative magnitudes
        }, 0);

        // Calculate percentages based on total sum of magnitudes
        let percentages;
        if (activeTone !== undefined) {
          percentages = item.tones.map((tone) => {
            const value = Object.values(tone)[0];
            return (Object.keys(tone)[0] === activeTone) ? (Math.abs(value) / total) * 100 : 0;
          });
        } else {
          percentages = item.tones.map((tone) => (Math.abs(Object.values(tone)[0]) / total) * 100);
        }

        const chartOptions = {
          chart: {
            type: 'donut',
            events: {
              click: function (e, chart, config) {
                onDonutClick(index, config);
                console.log(item.tones);
              },
            },
          },
          title: {
            text: data[index].media_name,
            align: 'center',
            margin: 10,
            offsetY: 0,
            style: {
              fontSize: '16px',
              color: '#fff',
            },
          },
          labels: ['Positive', 'Negative', 'Neutral'], // Adjust label order here
          colors: ['#1b81e2', '#df6264', '#0bbd91'], // Adjust colors order if necessary
          width: 100,
          tooltip: {
            enabled: false
          },
          legend: {
            position: 'top',
          },
          stroke: {
            show: false,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false,
                  total: {
                    showAlways: false,
                    show: false,
                  },
                },
              },
            },
          },
          dataLabels: {
            dropShadow: {
              blur: 3,
              opacity: 0.8,
            },
            style: {
              fontSize: '12px',
              colors: ['#fff'],
            },
            formatter: function (val, opts) {
              return `${val.toFixed(1)}%`;
            },
          },
          annotations: {
            points: percentages.map((percentage, i) => ({
              x: i + 1,
              y: percentage,
              marker: {
                size: 0,
              },
              onClick: function (e, chart, config) {
                onDonutClick(index, config);
              },
            })),
          },
        };

        return (
          <Col xl={12} md={12} key={index}>
            <ApexChart
              id={`mediaTone_${index}`}
              type='donut'
              className={className}
              options={chartOptions}
              series={percentages.slice(0, chartOptions.labels.length)}
              {...props}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default MediaTone;
