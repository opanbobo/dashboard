<Row>
<Col span={24}>
  <Row>
    <Col xs={24} md={24} lg={16} xl={16}>
      <Row>
        <Col span={24}>
          <ImageList
            spokepersonStatistic={spokepersonStatistic}
            getSpokepersonStatisticClick={getSpokepersonStatisticClick}
            setDataList={setDataList}
            setChartList={setChartList}
            filter={filter}
            dataList={dataList}
          />
        </Col>
        <Col span={24}>
          <Row>
            <Col xs={24} md={3} lg={3} xl={2} xxl={2}>
              <MediaList
                className={styles['dcc-card']}
                bodyStyle={{ height: '100%' }}
                data={
                  mediaListCount.result.data
                    ? mediaListCount.result.data.map((item) => {
                        return item;
                      })
                    : []
                }
              />
            </Col>
            <Col xs={24} md={21} lg={21} xl={22}>
              <Card onLoading={geo.loading} bodyStyle={{ height: '100%' }} className={styles['dcc-card']}>
                <Geo
                  className={styles['chart-geo']}
                  options={geo.result.data ? geo.result.data : []}
                  clickEvent={(e) => {
                    handleAnalyticDetail({
                      type: 'geo',
                      page: 0,
                      maxSize: 10,
                      order_by: 'datee',
                      order: 'desc',
                      type_location: 'article',
                      geo_loc: e,
                    });
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
    <Col xs={24} md={24} lg={8} xl={8}>
      <Row>
        <Col span={24}>
          <Sparkline
            onLoading={coverageTonality.loading}
            bodyStyle={{ padding: 6 }}
            title='media sentiment breakdown'
            type='up'
            total={
              coverageTonality.result.data
                ? coverageTonality.result.data.chart_bar.reduce((a, b) => {
                    return { doc_count: a.doc_count + b.doc_count };
                  }).doc_count
                : 0
            }
            percentage={8}
            height={73}
            charts={{
              type: 'line',
              events: {
                markerClick(e, chart, config) {
                  handleAnalyticDetail({
                    type: 'tone',
                    page: 0,
                    maxSize: 10,
                    order_by: 'datee',
                    order: 'desc',
                    data: {
                      x: config.w.config.series[config.seriesIndex].name,
                      y: ews.result.date[config.dataPointIndex],
                    },
                  });
                },
              },
              series: coverageTonality.result.data
                ? coverageTonality.result.data.chart_bar.map((item) => {
                    return {
                      name: item.key == 1 ? 'Positive' : item.key == -1 ? 'Negative' : 'Neutral',
                      data: item.tone_per_day.buckets.map((bucket) => bucket.doc_count),
                      color: item.key == 1 ? '#06d6a0' : item.key == -1 ? '#ff6b6b' : '#1990ff',
                    };
                  })
                : [],
              options: {
                stroke: {
                  width: 2,
                  lineCap: 'butt',
                },
                // colors: ['#06d6a0', '#1990ff', '#ff6b6b'],
                grid: SparklineOptions.options.grid,
                yaxis: {
                  show: false,
                },
                legend: SparklineOptions.options.legend,
                xaxis: {
                  type: 'date',
                  categories: ews.result.date || [],
                },
              },
              chartOptions: SparklineOptions.chart,
            }}
          />
        </Col>
        <Col span={24}>
          <Card title='top issue' className={styles['dcc-card-list']} onLoading={issueTop.loading}>
            <IssueList />
          </Card>
        </Col>
        <Col span={24}>
          <Card onLoading={wordCloud.loading} className={styles['dcc-card']}>
            {wordCloud.result.total_word ? (
              <WordCloud
                className={styles['chart-word']}
                options={{
                  series: [
                    {
                      type: 'wordcloud',
                      // data: wordCloud.result.data ? wordCloud.result.data : [],
                      data: wordCloud.result.data
                        ? wordCloud.result.data.map((word) => ({
                            name: word.name,
                            weight: word.weight,
                            color: `rgba(25, 144, 255,${
                              word.weight > 20 ? 1 : 0.3 && word.weight <= 15 ? 0.3 : 1
                            })`,
                          }))
                        : [],
                      style: {
                        fontFamily: `Noto Sans, sans-serif`,
                        textTransform: 'capitalize',
                      },
                      minFontSize: 10,
                    },
                  ],
                }}
              />
            ) : (
              <Row>
                <Col>Please select date for backtrack:</Col>
                <Col>
                  <DatePicker onChange={(e) => setBtWcDate(e.format('YYYY-MM-DD'))} />
                  <Button
                    onClick={() => {
                      postBacktrackWordcloud({
                        backtrack_date: btWcDate,
                      })
                        .then((data) => data.json())
                        .then((data) => {
                          if (data.message == 'vdadi successfully registered...') {
                            notification.success({
                              message: 'Success backtrack',
                            });

                            dispatch(
                              getWordcloud({
                                start_date: filter.result.start_date,
                                end_date: filter.result.end_date,
                                total_word: 40,
                              }),
                            );
                          } else {
                            notification.error({
                              message: 'Error when add backtrack date',
                            });
                          }
                        })
                        .catch((err) =>
                          notification.error({
                            message: 'Error when add backtrack date',
                          }),
                        );
                    }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </Col>
  </Row>
</Col>
<Col span={24}>
  <Row>
    <Col xs={24} md={24} lg={12} xl={12}>
      <Card onLoading={toneMedia.loading} className={styles['dcc-card']}>
        <MediaTone
          charts={{
            series: toneMedia.result.data ? getMediaSelection(toneMedia.result.data) : [],
            chartOptions: {
              stacked: true,
              events: {
                dataPointSelection(e, chart, config) {
                  handleAnalyticDetail({
                    type: 'media',
                    page: 0,
                    maxSize: 10,
                    order_by: 'datee',
                    order: 'desc',
                    data: {
                      x: config.dataPointIndex,
                      y: config.seriesIndex,
                    },
                  });
                },
              },
            },
            options: {
              title: {
                text: 'Top 10 Media',
                floating: true,
                offsetY: 5,
                align: 'left',
                style: BarHorizontal.title.style,
              },
              colors: [...BarHorizontal.colors, '#A020F0'],
              plotOptions: BarHorizontal.plotOptions,
              xaxis: {
                categories: toneMedia.result.data ? toneMedia.result.data.map((item) => item.media_name) : [],
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                markers: {
                  height: 10,
                  width: 10,
                  offsetY: 0,
                },
              },
            },
          }}
        />
      </Card>
    </Col>
    <Col xs={24} md={24} lg={12} xl={12}>
      <Card onLoading={ews.loading} className={styles['dcc-card']}>
        <EarlyWarning
          charts={{
            series: ews.result.series || [],
            events: {
              markerClick(e, chart, config) {
                handleAnalyticDetail({
                  type: 'ews',
                  page: 0,
                  maxSize: 10,
                  order_by: 'datee',
                  order: 'desc',
                  data: {
                    x: config.dataPointIndex,
                    y: config.seriesIndex,
                  },
                });
              },
            },
            options: {
              title: {
                text: 'Early Warning System',
                floating: false,
                offsetY: 5,
                align: 'left',
                style: LineOptions.title.style,
              },
              tooltip: {
                shared: true,
                enabled: true,
              },
              markers: LineOptions.markers,
              stroke: LineOptions.stroke,
              colors: LineOptions.colors,
              xaxis: {
                categories: ews.result.date || [],
              },
              legend: {
                show: false,
              },
              yaxis: {
                show: true,
                tickAmount: 3,
                min: 0,
                max: 20,
                labels: {
                  formatter: function (value, index) {
                    if (value == 0 && value < 5) {
                      return 'Potential';
                    } else if (value > 5 && value < 9) {
                      return 'Emerging';
                    } else if (value > 10 && value < 20) {
                      return 'Current';
                    } else {
                      return 'Crisis';
                    }
                  },
                },
              },
            },
          }}
        />
      </Card>
    </Col>
  </Row>
</Col>
</Row>

<ModalAnalytic />
<ModalDetailArticle />
<ModalChartList
chartList={chartList}
setChartList={setChartList}
spokepersonStatisticClick={spokepersonStatisticClick}
dataList={dataList}
paginationHandler={paginationHandler}
setDataList={setDataList}
handleClickChart={handleClickChart}
/>