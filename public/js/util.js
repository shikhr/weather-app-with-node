import weatherIcon from './icons.js';

const getIcon = function (code) {
  const prefix = 'wi wi-';
  let icon = weatherIcon[code].icon;

  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  icon = prefix + icon;
  return icon;
};

export { getIcon };
