/*
  Example Data: Global Site settings
  Use your own real API instead
*/

export const global = {
  name: "Demetory Shop",
  logo: "Demetory",
  contacts: {
    site: {
      label: "Demetrey.ru",
      href: "https://demetrey.ru/",
      target: "_blank",
    },
    email: {
      label: "hello@demetrey.ru",
      href: "mailto:hello@demetrey.ru",
      target: "_blank",
    },
    telegram: {
      label: "@Demetory",
      href: "https://t.me/Demetory",
      target: "_blank",
    },
    hh: {
      label: "HeadHunter",
      href: "https://novosibirsk.hh.ru/resume/cd0e40b4ff077248d40039ed1f50616b515933",
      target: "_blank",
    },
    behance: {
      label: "Behance",
      href: "https://www.behance.net/demetory",
      target: "_blank",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/demetory/",
      target: "_blank",
    },
  },
  currencies: {
    type: [
      {
        id: 0,
        label: "Euro",
        prop: "eur",
        sign: "€",
      },
      {
        id: 1,
        label: "Rouble",
        prop: "rub",
        sign: "₽",
      },
    ],
    defaultTypeId: 0,
    exchangeRate: {
      eur_rub: "90.499891",
    },
  },
  productsPerPage: 16,
  maxAllowedProduct: 10,
  productsSort: {
    selector: [
      {
        id: 0,
        label: "Alphabetically",
        prop: "title",
      },
      {
        id: 1,
        label: "Price",
        prop: "price",
      },
      {
        id: 2,
        label: "Novelty",
        prop: "date",
      },
    ],
    defaultSelectorId: 0,
    defaultSelectorDirection: "asc",
  },
  footer:
    "<p>Greetings, bitches.</p><p>No, you can't buy anything here, even if you really liked something. Despite the fact that it is very pleasant for me.</p><p>Perhaps someday a full-fledged store will really appear here, but in general this project was made just as an example of my development skills. Just for self-promoting, just for lulz.</p><p>«Отака хуйня, малята» © Thank you.</p>",
};
