export const mockOffers = [
  {
    id: 1,
    rooms: '2-комн.',
    area: 54,
    floor: '12/17',
    address: 'Москва, ул. Ленина, д. 10',
    priceBuy: 12500000,
    priceRent: 45000,
    dayPriceRent: 5000,
    forAction: ['buy', 'rent'], // подходит и туда, и туда
    deposit: 'Залог 100%',
    commission: 'без комиссии',
    author: 'Собственник',
    status: 'Документы проверены',
  },
  {
    id: 2,
    rooms: '3-комн.',
    area: 78,
    floor: '5/9',
    address: 'Москва, пр-т Мира, д. 22',
    priceBuy: 18900000,       // только покупка
    forAction: ['buy'],
    author: 'Агентство',
    status: 'Супер-хозяин'
  },
  {
    id: 3,
    rooms: '1-комн.',
    area: 35,
    floor: '3/5',
    address: 'Москва, ул. Пушкина, д. 5',
    priceRent: 35000,
    dayPriceRent: 12000,
    forAction: ['rent'],
    deposit: 'Залог 100%',
    commission: 'без комиссии',
    author: 'Собственник',
    status: 'Документы проверены'
  }
];