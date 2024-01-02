import React from 'react';
import { ApexChart, Row, Col } from 'components';

const MediaTone = ({ className, charts, ...props }) => {
  const { data = [], onDonutClick } = charts;

  return (
    <Row>
      {data.map((item, index) => {
        const total = item.tones.reduce((sum, tone) => sum + Object.values(tone)[0], 0);
        const percentages = item.tones.map((tone) => (Object.values(tone)[0] / total) * 100);

        const chartOptions = {
          chart: {
            type: 'donut',
            events: {
              click: function (e, chart,config) {
                onDonutClick(index, config);
                console.log(config, 'tae')
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
          // labels: ['Positive', 'Negative', 'Neutral'],
          // colors: ['#1b81e2', '#df6264', '#0bbd91'],
          labels: ['Neutral', 'Negative', 'Positive'], // Ubah urutan label sesuai keinginan Anda
          colors: ['#0bbd91', '#df6264', '#1b81e2'], // Ubah urutan warna sesuai keinginan Anda
          width: 100,
          tooltip: {
            theme: 'light',
            fillSeriesColor: true,
          },
          legend: {
            position: 'top',
          },
          stroke: {
            show: false, // Menyembunyikan border (garis tepi) pada grafik
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
              return `${val.toFixed(1)}%`; // Display percentage on the data label
            },
          },
          annotations: {
            points: percentages.map((percentage, i) => ({
              x: i + 1,
              y: percentage,
              marker: {
                size: 0,
              },
              onClick: function (e, chart,config) {
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
