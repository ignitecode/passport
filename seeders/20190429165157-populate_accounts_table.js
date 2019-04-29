'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const accounts = [{
      name: 'RobinHood',
      logo: 'https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F482718%2Frobinhood-logo.png&w=700&op=resize',
      balance: '$12,384.89',
      description: 'Mobile App stock brokerage which helps to invest your money comission free!',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Capital One',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Capital_One_logo.svg/220px-Capital_One_logo.svg.png',
      balance: '$1,321.26',
      description: 'Capital One Financial Corporation is a bank holding company specializing in credit cards, auto loans, banking and savings accounts headquartered in McLean, Virginia. Capital One is ranked 10th on the list of largest banks in the United States by assets',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Mint',
      logo: 'https://www.mint.com/sites/default/files/styles/mint_third_width/public/mintlogo_link_presspg.png?itok=Vaz4ENu4&timestamp=1418704612',
      balance: '$13,571.41',
      description: 'Mint.com is a free, web-based personal financial management service for the US and Canada, created by Aaron Patzer. Mint originally provided account aggregation through a deal with Yodlee, but has since moved to using Intuit for connecting to accounts.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'TDBank',
      logo: 'https://pbs.twimg.com/profile_images/1011255715686563841/mE0i0Wyj_400x400.jpg',
      balance: '$133.17',
      description: 'TD Bank, N.A., is a U.S. national bank and subsidiary of the Canadian multinational Toronto-Dominion Bank',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
    return queryInterface.bulkInsert('accounts', accounts);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {})
  }
};
