import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import "./Column.scss";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";
import { mapOrder } from "utilities/sorts";
import { Dropdown, Form, Button } from "react-bootstrap";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "utilities/constants";
import {
  saveContentAfterPressEnter,
  selectAllInlineText,
} from "utilities/ContentEditable";
import {cloneDeep} from 'lodash'

function Column(props) {
  const { column, onCardDrop, onUpdateColumn} = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const newCardTextareaRef = useRef(null);
  const [columnTitle, setColumnTitle] = useState("");

  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const HandleColumnTitleChange = useCallback(
    (e) => setColumnTitle(e.target.value),
    []
  );

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm);
  };

  const [newCardTitle, setNewCardTitle] = useState("");
  const onNewCardTitleChange = useCallback((e) => {
    setNewCardTitle(e.target.value);
  }, []);

  const HandleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle,
    };
    onUpdateColumn(newColumn);
  };

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus();
      newCardTextareaRef.current.select();
    }
  }, [openNewCardForm]);

  const onConfirmModalAction = (type) => {
    toggleShowConfirmModal();
    if (type === MODAL_ACTION_CLOSE) {
      return;
    }
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
  };
  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }
     const newCardToAdd = {
       id: Math.random().toString(36).substr(2, 5),
       boardId: column.boardId,
       columnId: column.id,
       title: newCardTitle.trim(),
       cover:null   
    };
    let newColumn = cloneDeep(column)
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd.id)

    onUpdateColumn(newColumn);
    setNewCardTitle('')
    toggleOpenNewCardForm()

  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            value={columnTitle}
            onChange={HandleColumnTitleChange}
            onClick={selectAllInlineText}
            onBlur={HandleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={(e) => e.preventDefault()} // reslove event bubbling
            spellCheck="false" // google default not visible red line  under text in the input field
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            />
            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove
              </Dropdown.Item>
              <Dropdown.Item> Move all cards in this column ...</Dropdown.Item>
              <Dropdown.Item>
                {" "}
                Archive all cards in this column ...
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(event) => event.key === "Enter" && addNewCard()}
              row="5"
              placeholder="enter card..."
              className="textarea-enter-new-card"
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add Card
            </Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-trash icon" />
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon" />
            add another card
          </div>
        )}
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove Column"
        content={`are you sure want to remove <strong>${column.title}</strong>`}
      />
    </div>
  );
}
export default Column;
