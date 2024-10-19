import React, { useEffect, useState } from "react";
import MetaData from "../../../../plugins/MetaData";
import { TbPencil } from "react-icons/tb";
import { IoMdLink } from "react-icons/io";
import { HiOutlinePlusSm } from "react-icons/hi";
import { SlPeople } from "react-icons/sl";
import { FaPause } from "react-icons/fa";
import dash_ic_2 from "../../../../../assets/icons/dash_2_ic.png";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CardModule from "../utils/CardModule";
import { useDispatch } from "react-redux";
import { getTodo, updateTodo } from "../../../../../redux/actions/todoAction";
import { useSelector } from "react-redux";
import TodoForm from "../utils/TodoForm";
import FilterModule from "../utils/FilterModule";
import DateModule from "../utils/DateModule";
import { useNavigate } from "react-router-dom";
import { MANAGEMENT_PAGES } from "../../../../../helpers/paths";

const MobileApp = () => {
  const navigate = useNavigate(); // Navigating hook
  const [formOpen, setFormOpen] = useState(false); // Managing form visibility state
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false); // Managing filter popover state
  const [isDateFilterPopoverOpen, setIsDateFilterPopoverOpen] = useState(false); // Managing date filter popover state
  const dispatch = useDispatch(); // Dispatching hook
  const { data: todoData } = useSelector((state) => state.todoState); // Selecting todo data from Redux store

  // Handling drag-and-drop functionality for todo items
  const onDragEnd = (result, columns) => {
    if (!result.destination) return; // Exiting if there's no destination
    const { source, destination } = result; // Destructuring data of source and destination

    // Moving items to different columns
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]; // Getting source column
      const destColumn = columns[destination.droppableId]; // Getting destination column
      const sourceItems = [...sourceColumn.items]; // Copying source items
      const destItems = [...destColumn.items]; // Copying destination items
      const [removed] = sourceItems.splice(source.index, 1); // Removing dragged item
      destItems.splice(destination.index, 0, removed); // Adding item to destination
      const payload = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems, // Updating source column with new items
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems, // Updating destination column with new items
        },
      };
      dispatch(updateTodo(payload, null, false)); // Dispatching updated todo payload
    } else {
      // Moving items within the same column
      const column = columns[source.droppableId]; // Getting the current column
      const copiedItems = [...column.items]; // Copying items in the column
      const [removed] = copiedItems.splice(source.index, 1); // Removing dragged item
      copiedItems.splice(destination.index, 0, removed); // Adding item to new position
      const payload = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems, // Updating column with new items
        },
      };
      dispatch(updateTodo(payload, null, false)); // Dispatching updated todo payload
    }
  };

  // Fetching todos and setting up initial navigation parameters
  useEffect(() => {
    dispatch(getTodo({ duedate: new Date() })); // Dispatching action to fetch todos
    navigate(
      // Navigating with initial parameters
      `${MANAGEMENT_PAGES.MOBILE_APP_PAGE}?priority=null&duedate=${new Date().toString()}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mobile_app_container">
      <MetaData title={"Mobile App"} />
      <div className="header">
        <div className="flex items-center gap-3">
          <div className="font-bold text-4xl">Mobile App</div>
          <div className="flex items-center rounded-lg p-1 text-[var(--cmac-management-bg-4)] bg-[var(--cmac-management-bg-3)]">
            <TbPencil />
          </div>
          <div className="flex items-center rounded-lg p-1 text-[var(--cmac-management-bg-4)] bg-[var(--cmac-management-bg-3)]">
            <IoMdLink />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center rounded-sm p-[1px] text-[var(--cmac-management-bg-4)] bg-[var(--cmac-management-bg-3)]">
            <HiOutlinePlusSm size={14} />
          </div>
          <div className="text-[var(--cmac-management-bg-4)] font-bold text-sm">
            Invite
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FilterModule
            isPopoverOpen={isFilterPopoverOpen}
            onClick={() => setIsFilterPopoverOpen(!isFilterPopoverOpen)}
            onClose={() => setIsFilterPopoverOpen(false)}
          />
          <DateModule
            isPopoverOpen={isDateFilterPopoverOpen}
            onClick={() => setIsDateFilterPopoverOpen(!isFilterPopoverOpen)}
            onClose={() => setIsDateFilterPopoverOpen(false)}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[var(--cmac-management-font-color-1)] border-solid border-[1px] border-[var(--cmac-management-font-color-1)] w-fit p-2 ps-3 pe-3 rounded-md cursor-pointer">
            <SlPeople />
            <div>Share</div>
          </div>
          <div className="custom-vr"></div>
          <div className="flex items-center bg-[var(--cmac-management-bg-4)] gap-2 text-[var(--cmac-management-bg-1)] w-fit p-3 rounded-md">
            <FaPause className=" -rotate-90" size={16} />
          </div>
          <div className="flex items-center">
            <img src={dash_ic_2} alt="dash_ic_2" />
          </div>
        </div>
      </div>
      <div className=" flex items-center gap-10 mt-12">
        <DragDropContext onDragEnd={(result) => onDragEnd(result, todoData)}>
          {Object.entries(todoData).map(([columnId, column], index) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="base_module rounded-2xl"
                >
                  <div
                    className="base_module_header"
                    style={{ borderColor: column.color }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="span"
                        style={{ background: column.color }}
                      ></div>
                      <div>{column.title}</div>
                      <div className="text-xs bg-gray-200 rounded-full h-5 w-5 flex items-center justify-center">
                        {column.items?.length}
                      </div>
                    </div>
                    {column.title === "To-Do" && (
                      <div
                        className="flex items-center bg-[var(--cmac-management-bg-3)] gap-2 text-[var(--cmac-management-bg-4)] w-fit p-[1px] rounded-md cursor-pointer"
                        onClick={() => setFormOpen(true)}
                      >
                        <HiOutlinePlusSm />
                      </div>
                    )}
                  </div>
                  <div
                    className={`card_container w-full mt-6 ${
                      column.items?.length === 0
                        ? "overflow-hidden"
                        : "overflow-auto"
                    }`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mt-4 w-full"
                          >
                            <CardModule
                              key={item.id}
                              title={item.title}
                              badge={item.badge}
                              description={item.description}
                              duedate={item.duedate}
                              createdAt={item.createdAt}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {column.items?.length === 0 && (
                      <div className="flex items-center justify-center h-full font-bold text-[var(--cmac-management-font-color-1)] opacity-50">
                        {column.title} list is empty
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <TodoForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
};

export default MobileApp;
