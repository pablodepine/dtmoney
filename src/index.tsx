import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  // seeds(server) {
  //   server.db.loadData({
  //     transactions: [
  //       {
  //         id: 1,
  //         title: 'Freelancer de website',
  //         type: 'deposit',
  //         category: 'Dev',
  //         amount: 6000,
  //         createdAt: new Date('2021-02-12 09:00'),
  //       },
  //       {
  //         id: 2,
  //         title: 'Aluguel',
  //         type: 'withdraw',
  //         category: 'Casa',
  //         amount: 1100,
  //         createdAt: new Date('2021-02-14 11:00'),
  //       },
  //     ],
  //   })
  // },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => ({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00'),
        },
      ],
    }));

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });

    this.delete('/transactions/delete/:id', (schema, request): any => {
      const id = request.params.id; 

      return schema.db.transactions.find(id)?.destroy;
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
