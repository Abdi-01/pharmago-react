import React, { useEffect, useState } from 'react';
import { NavbarAdmin } from '../../components';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllTransaction } from '../../redux/actions';
import { Card } from 'reactstrap';

const DashboardAdmin = () => {
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();

  const { allTransaction } = useSelector(({ transactionsReducer }) => {
    return {
      allTransaction: transactionsReducer.allTransaction,
    };
  });

  // data chart penjualan
  const dataPenjualan = () => {
    let payJanuary = 0;
    let payFebruary = 0;
    let totalPayment = [];
    allTransaction.map((item) => {
      if (moment(item.created_at).format('MMMM') == 'January') {
        payJanuary += parseInt(Math.floor(item.total_payment));
      } else if (moment(item.created_at).format('MMMM') == 'February') {
        payFebruary += parseInt(Math.floor(item.total_payment));
      }
      console.log(moment(item.created_at).format('MMMM'), item.idtransaction);
    });
    totalPayment.push(payJanuary);
    totalPayment.push(0);
    return totalPayment;
  };

  // chart function
  const chart = () => {
    setChartData({
      labels: ['Jan', 'Feb', 'Mar', 'April', 'Mei'],
      datasets: [
        {
          label: 'Penjualan',
          data: dataPenjualan(),
          backgroundColor: ['rgba(75,192,192,0.9'],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
    dispatch(getAllTransaction());
    dataPenjualan();
  }, []);

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
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    title: { text: 'Penjualan Tahun 2021', display: true },
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            autoSkip: true,
                            maxTicksLimit: 5,
                            beginAtZero: false,
                          },
                          gridLines: {
                            display: true,
                          },
                        },
                      ],
                      xAxes: [
                        {
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
              <Card className='d-flex w-100 h-100'></Card>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
