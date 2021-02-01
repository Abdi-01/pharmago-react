import React, { useEffect, useState } from 'react';
import { NavbarAdmin } from '../../components';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransaction, getCustomProducts } from '../../redux/actions';
import { Card, Table } from 'reactstrap';

const DashboardAdmin = () => {
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();

  const { reportTransaction, customProducts, reportChart } = useSelector(
    ({ transactionsReducer, ProductsReducer }) => {
      return {
        allTransaction: transactionsReducer.allTransaction,
        reportTransaction: transactionsReducer.reportTransaction,
        reportChart: transactionsReducer.reportChart,
        customProducts: ProductsReducer.customProducts,
      };
    }
  );

  let chartMonthLabel = reportChart.map((item) => item.bulan);
  let chartMonthlySummary = reportChart.map((item) =>
    parseInt(item.total_penjualan_per_bulan)
  );

  // chart function
  const chart = () => {
    setChartData({
      labels: chartMonthLabel,
      datasets: [
        {
          label: 'Penjualan',
          data: chartMonthlySummary,
          backgroundColor: ['rgba(75,192,192,0.9'],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
    dispatch(getAllTransaction());
    dispatch(getCustomProducts());
  }, []);

  const renderReport = () => {
    return customProducts.map((product, idx) => {
      let itemTerjual = reportTransaction.filter(
        (item) => product.idproduct == item.idproduct
      );
      return (
        <tr>
          <td>{product.name}</td>
          <td className='text-center'>
            {Math.floor(
              (parseInt(itemTerjual[0].qty_terjual) +
                parseInt(product.total_stock_satuan)) /
                parseInt(product.qty_per_pcs)
            )}
          </td>
          <td className='text-center'>
            {(
              parseInt(itemTerjual[0].qty_terjual) +
              parseInt(product.total_stock_satuan)
            ).toLocaleString()}
          </td>
          <td className='text-center'>
            {Math.floor(
              parseInt(product.total_stock_satuan) /
                parseInt(product.qty_per_pcs)
            )}
          </td>
          <td className='text-center'>
            {parseInt(product.total_stock_satuan).toLocaleString()}
          </td>
          <td className='text-center'>
            {Math.ceil(
              parseInt(itemTerjual[0].qty_terjual) /
                parseInt(product.qty_per_pcs)
            )}
          </td>
          <td className='text-center'>
            {parseInt(itemTerjual[0].qty_terjual).toLocaleString()}
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <NavbarAdmin />
      <div className='row d-flex justify-content-center align-items-center mt-5'>
        <div className='col-8'>
          <h3 className='text-center mb-5'>
            Selamat Datang di Dashboard Admin
          </h3>
          <hr className='mb-3' />
          <div className='row'>
            <div className='col-9'>
              <Card className='p-5'>
                <h4 className='border-bottom pb-2 mb-3'>Grafik Penjualan</h4>
                <Line
                  className='border'
                  data={chartData}
                  options={{
                    responsive: true,
                    title: {
                      text: 'Grafik Penjualan',
                      display: false,
                      fontSize: 16,
                      fontColor: 'black',
                    },
                    scales: {
                      yAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: 'Penjualan / Rupiah',
                            fontSize: 14,
                            fontColor: 'black',
                          },
                          ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20,
                            min: 0,
                            beginAtZero: false,
                            stepSize: 1,
                          },
                          gridLines: {
                            display: true,
                          },
                        },
                      ],
                      xAxes: [
                        {
                          scaleLabel: {
                            display: true,
                            labelString: 'Periode / Bulan',
                            fontSize: 14,
                            fontColor: 'black',
                          },
                          gridLines: {
                            display: false,
                          },
                        },
                      ],
                    },
                  }}
                />
              </Card>
            </div>
            <div className='col-3'>
              <Card className='d-flex w-100 h-100 p-3'>
                <h5 className='text-center border-bottom p-3 mb-3'>
                  Report Penjualan
                </h5>
                <Table bordered>
                  <thead className='table-secondary'>
                    <tr className='text-center'>
                      <th>Bulan</th>
                      <th>Penjualan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportChart.map((item, idx) => {
                      return (
                        <tr className='text-center'>
                          {' '}
                          <td>{item.bulan}</td>
                          <td>
                            Rp
                            {parseInt(
                              item.total_penjualan_per_bulan
                            ).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-12'>
              <Card className='p-5'>
                <h4 className='border-bottom pb-2 mb-3'>
                  Table Pergerakan Stock - Bahan Racik{' '}
                </h4>
                <Table bordered className='table-striped'>
                  <thead>
                    <tr className='text-center table-secondary'>
                      <th rowSpan={2} className='text-center'>
                        Nama Produk
                      </th>
                      <th colSpan={2}>Stock Awal</th>
                      <th colSpan={2}>Stock Saat Ini</th>
                      <th colSpan={2}>Stock Terjual</th>
                    </tr>
                    <tr className='text-center table-secondary'>
                      <th>Stock (Pcs)</th>
                      <th>Stock (Total)</th>
                      <th>Stock (Pcs)</th>
                      <th>Stock (Total)</th>
                      <th>Stock (Pcs)</th>
                      <th>Stock (Total)</th>
                    </tr>
                  </thead>
                  <tbody>{renderReport()}</tbody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
