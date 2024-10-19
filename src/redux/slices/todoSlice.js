import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    data: {
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
    },
    filters: [],
    status: null,
  },
  reducers: {
    todoRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    todoSuccess(state, action) {
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        filters: action.payload.filters,
        status: "success",
      };
    },
    todoFail(state, action) {
      return {
        ...state,
        loading: false,
        status: "fail",
      };
    },
    cleartodo(state) {
      return {
        ...state,
        loading: false,
        data: {},
        status: null,
      };
    },
  },
});

const { actions, reducer } = todoSlice;

export const { todoRequest, todoFail, todoSuccess, cleartodo } = actions;

export default reducer;
