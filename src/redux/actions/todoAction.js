import {
  filterDataByBadge,
  filterDataByDueDate,
} from "../../helpers/filterFeatures";
import { hashData } from "../../helpers/hashData";
import { todoFail, todoRequest, todoSuccess } from "../slices/todoSlice";

// Updating the todo list with new data and applying filters
export const updateTodo = (payloadData, filterQuery, isNew) => (dispatch) => {
  try {
    let payload = {
      // Initializing payload structure
      todo: {
        title: "To-Do",
        color: "#5030E5",
        items: [],
      },
      onprogress: {
        title: "On Progress",
        color: "#FFA500",
        items: [],
      },
      done: {
        title: "Done",
        color: "#8BC48A",
        items: [],
      },
    };
    dispatch(todoRequest()); // Dispatching request action
    let prevDecodedData = hashData().get("todo_data").decryptedData;
    if (prevDecodedData?.length === 0) {
      prevDecodedData = payload;
    }
    if (isNew) {
      hashData().set("todo_data", {
        ...prevDecodedData,
        todo: {
          ...prevDecodedData.todo,
          items: [payloadData, ...prevDecodedData.todo.items],
        },
      });
    } else {
      hashData().set("todo_data", payloadData); // Storing updated and hashed todo data to localstorage
    }

    const decodedData = hashData().get("todo_data").decryptedData; // Retrieving and decrypting todo data from localstorage

    // Checking if decoded data exists and updating payload
    if (decodedData?.length > 0 || Object.keys(decodedData)?.length > 0) {
      payload = decodedData; // Updating payload with existing data
    }

    // Filtering payload by due date if specified
    if (filterQuery?.duedate) {
      payload = filterDataByDueDate(decodedData, filterQuery?.duedate);
    }

    // Filtering payload by badge if specified and not "all"
    if (filterQuery?.badge && filterQuery?.badge !== "all") {
      payload = filterDataByBadge(payload, filterQuery?.badge);
    }

    dispatch(todoSuccess({ data: payload, filters: [filterQuery] })); // Dispatching success action with filtered data
  } catch (error) {
    dispatch(todoFail()); // Dispatching failure action in case of error
  }
};

// Fetching the todo list and applying filters
export const getTodo = (filterQuery) => (dispatch) => {
  try {
    dispatch(todoRequest()); // Dispatching request action

    let payload = {
      // Initializing payload structure
      todo: {
        title: "To-Do",
        color: "#5030E5",
        items: [],
      },
      onprogress: {
        title: "On Progress",
        color: "#FFA500",
        items: [],
      },
      done: {
        title: "Done",
        color: "#8BC48A",
        items: [],
      },
    };

    const decodedData = hashData().get("todo_data").decryptedData; // Retrieving and decrypting todo data from localstorage

    // Checking if decoded data exists and updating payload
    if (decodedData?.length > 0 || Object.keys(decodedData)?.length > 0) {
      payload = decodedData; // Updating payload with existing data
    }

    // Filtering payload by due date if specified
    if (Object.keys(decodedData)?.length > 0 && filterQuery?.duedate) {
      payload = filterDataByDueDate(decodedData, filterQuery?.duedate);
    }

    // Filtering payload by badge if specified and not "all"
    if (
      Object.keys(decodedData)?.length > 0 &&
      filterQuery?.badge &&
      filterQuery?.badge !== "all" &&
      filterQuery?.badge !== "null"
    ) {
      payload = filterDataByBadge(payload, filterQuery?.badge);
    }

    dispatch(todoSuccess({ data: payload, filters: [filterQuery] })); // Dispatching success action with filtered data
  } catch (error) {
    dispatch(todoFail()); // Dispatching failure action in case of error
  }
};
