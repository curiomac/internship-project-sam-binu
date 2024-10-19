import moment from "moment";

const filterDataByBadge = (data, badgeFilter) => {
  const result = {};

  Object.keys(data).forEach((key) => {
    const column = data[key];
    const filteredItems = column.items.filter(
      (item) => item.badge.toLowerCase() === badgeFilter.toLowerCase()
    );

    result[key] = {
      ...column,
      items: filteredItems,
    };
  });

  return result;
};

const filterDataByDueDate = (data, duedate) => {
  const result = {};

  Object.keys(data).forEach((key) => {
    const column = data[key];    
    const filteredItems = column.items.filter(
      (item) => moment(item.duedate).format("DD-MM-YYYY") === moment(duedate).format("DD-MM-YYYY")
    );

    result[key] = {
      ...column,
      items: filteredItems,
    };
  });

  return result;
};

export { filterDataByBadge, filterDataByDueDate };
