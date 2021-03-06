import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { isEmpty } from "lodash";

import "./BoardContent.scss";
import Column from "components/Column/Column";
import { mapOrder } from "utilities/sorts";
import { applyDrag } from "utilities/dragDrop";

import { initialData } from "actions/initialData";

function BoardContent(props) {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const newColumnInputRef = useRef(null)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const onNewColumnTitleChange = useCallback((e) => {
    setNewColumnTitle(e.target.value);
  }, []);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm]);

  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        Board Not Found
      </div>
    );
  }
  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((c) => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  };
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumns = newColumns.find((c) => c.id === columnId)

      currentColumns.cards = applyDrag(currentColumns.cards, dropResult)

      currentColumns.cardOrder = currentColumns.cards.map((i) => i.id)

      setColumns(newColumns)
    }
  };

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  };
  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return;
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards:[]
    }
    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

    setNewColumnTitle('')
    toggleOpenNewColumnForm()
  };

  const onUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate.id
    const newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate);
    
    if (newColumnToUpdate._destroy) {
        // remove column
        newColumns.splice(columnIndexToUpdate, 1)
    } else {
      // update column infor
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
    }
     let newBoard = { ...board };
     newBoard.columnOrder = newColumns.map((c) => c.id);
     newBoard.columns = newColumns;

     setColumns(newColumns);
     setBoard(newBoard);
  }

 

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="trello-container">
        {!openNewColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" />
              add another column
            </Col>
          </Row>
        )}
        {openNewColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="enter colum title..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(event) => event.key === "Enter" && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add column
              </Button>
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                <i className="fa fa-trash icon" />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}
export default BoardContent;
