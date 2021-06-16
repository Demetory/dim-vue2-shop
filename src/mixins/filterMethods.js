export const filterMethods = {
  methods: {
    sortBy(prop, order) {
      /*
        Sorts Object by Property.
        Returns: Object.
        Sets: nothing.
      */

      return function (a, b) {
        if (!order || order === "asc") {
          if (a[prop] > b[prop]) {
            return 1;
          } else if (a[prop] < b[prop]) {
            return -1;
          }
        } else if (order && order === "desc") {
          if (a[prop] < b[prop]) {
            return 1;
          } else if (a[prop] > b[prop]) {
            return -1;
          }
        }
        return 0;
      };
    },
  },
};
